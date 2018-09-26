import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, TextInput, Switch, Picker, Button, Alert,
} from 'react-native';
import { createRelative, updateRelative } from '../../../actions/relativesActions';
import { ERelativeRelationType, RelativeRelationTypeOptions } from '../../../constants/relativesConstants';
import { isNil, isEmpty } from '../../../Services/util';
/* eslint-disable no-unused-vars */
import styles from './styles';
/* eslint-enable no-unused-vars */

const filteredRelationTypeOptions = sex => RelativeRelationTypeOptions
  .filter(option => isNil(sex) || option.sex === sex);

const filteredConnectedRelatives = (relatives, relationType) => (relatives || [])
  .filter(({ father, mother }) => {
    switch (relationType) {
      case ERelativeRelationType.father:
        return !father;
      case ERelativeRelationType.mother:
        return !mother;
      default:
        return null;
      //  throw new Error('Invalid relative relation type!');
    }
  });

class CreatePage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const editedRelative = navigation.getParam('editedRelative');
    return {
      title: editedRelative ? 'Edit relative' : 'Create relative',
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    relatives: PropTypes.array.isRequired,
    editedRelative: PropTypes.object,
  };

  static defaultProps = {
    editedRelative: null,
  };

  constructor(props) {
    super(props);
    const { relatives, editedRelative } = this.props;
    let form;
    if (editedRelative) {
      form = editedRelative;
    } else {
      form = {
        fullName: '',
        sex: true,
        relationType: null,
        relativeId: null,
      };

      if (!isEmpty(relatives)) {
        form.relationType = filteredRelationTypeOptions(form.sex)[0].code;
        const connectedRelative = filteredConnectedRelatives(relatives, form.relationType);
        form.relativeId = connectedRelative && connectedRelative[0] && connectedRelative[0]._id;
      }
    }

    this.state = {
      form,
    };
  }

  handleSuccess = () => {
    this.props.navigation.goBack();
    Alert.alert(
      'Success',
      'Success saving data',
    );
  };

  handleFailure = (err) => {
    Alert.alert(
      'Error',
      `Error saving data. ${err}`,
    );
  };

  handleSave = () => {
    const { editedRelative } = this.props;
    const { form } = this.state;
    let data;
    let action;
    if (editedRelative) {
      action = updateRelative;
      data = form;
    } else {
      action = createRelative;
      data = {
        ...form,
        sex: !!form.sex,
      };
      const children = form.relativeId && [form.relativeId];
      if (children) data.children = children;
    }
    action(data)
      .then(this.handleSuccess)
      .catch(this.handleFailure);
  };

  handleFieldChange = (field, value) => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [field]: value,
      },
    }));
  };

  handleFullNameChange = (fullName) => {
    this.handleFieldChange('fullName', fullName);
  };

  handleSexChange = (sex) => {
    this.handleFieldChange('sex', sex);
  };

  handleRelationTypeChange = (relationType) => {
    this.handleFieldChange('relationType', relationType);
  };

  handleRelativeIdChange = (relativeId) => {
    this.handleFieldChange('relativeId', relativeId);
  };

  render() {
    const { relatives, editedRelative } = this.props;
    const { form: { sex, relationType, relativeId } } = this.state;
    const editMode = !!editedRelative;
    const emptyRelatives = isEmpty(relatives);
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Lastname Firstname Middlename"
          onChangeText={this.handleFullNameChange}
          defaultValue={editedRelative && editedRelative.fullName}
        />
        {!editMode && (
          <View>
            <Text>
              is Male
            </Text>
            <Switch
              value={sex}
              onValueChange={this.handleSexChange}
            />
          </View>
        )}
        {!editMode && !emptyRelatives && (
          <Picker
            selectedValue={relationType}
            style={{ height: 50, width: '100%' }}
            onValueChange={this.handleRelationTypeChange}
            enable={!editMode}
          >
            {filteredRelationTypeOptions(sex)
              .map(({ code, label }) => (
                <Picker.Item key={code} label={label} value={code} />
              ))
            }
          </Picker>
        )}
        {!editMode && !emptyRelatives && (
          <Picker
            selectedValue={relativeId}
            style={{ height: 50, width: '100%' }}
            onValueChange={this.handleRelativeIdChange}
            enabled={relationType && !isNil(relationType)}
            enable={!editMode}
          >
            {filteredConnectedRelatives(relatives, relationType)
              .map(({ _id, fullName }) => (
                <Picker.Item key={_id} label={fullName} value={_id} />
              ))
            }
          </Picker>
        )}
        <Button
          title={editedRelative ? 'Update' : 'Save'}
          onPress={this.handleSave}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { navigation: { state: { params: { editedRelative } = {} } } } = ownProps;
  return {
    relatives: state.relatives.list,
    editedRelative,
  };
};

export default connect(mapStateToProps)(CreatePage);
