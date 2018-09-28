import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, TextInput, Switch, Picker, Button, Alert,
} from 'react-native';
import i18n from 'i18next';
import { createRelative, updateRelative } from '../../../actions/relativesActions';
import { ERelativeRelationType, RelativeRelationTypeOptions } from '../../../constants/relativesConstants';
import { isNil, isEmpty } from '../../../Services/util';
import styles from './styles';

const filteredRelationTypeOptions = sex => RelativeRelationTypeOptions
  .filter(option => isNil(sex) || option.sex === sex)
  .map(option => ({ ...option, label: i18n.t(option.label) }));

const filteredConnectedRelatives = (relatives, relationType) => (relatives || [])
  .filter(({ father, mother }) => {
    switch (relationType) {
      case ERelativeRelationType.father:
        return !father;
      case ERelativeRelationType.mother:
        return !mother;
      default:
        return null;
    }
  });

class CreatePage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const editedRelative = navigation.getParam('editedRelative');
    return {
      title: i18n.t(editedRelative ? 'form/title/edit' : 'form/title/create'),
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
      '',
      i18n.t('form/message/successSave'),
    );
  };

  handleFailure = (error) => {
    Alert.alert(
      '',
      i18n.t('form/message/failureSave', { error }),
    );
  };

  // TODO Add fields validation
  checkForm = () => {
    const { form } = this.state;
    if (isEmpty(form.fullName)) return false;
    return true;
  };

  handleSave = () => {
    if (!this.checkForm()) {
      Alert.alert(
        '',
        i18n.t('form/message/invalidForm'),
      );
      return;
    }
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
          placeholder={i18n.t('form/fullName/placeholder')}
          onChangeText={this.handleFullNameChange}
          defaultValue={editedRelative && editedRelative.fullName}
        />
        {!editMode && (
          <View style={styles.sex}>
            <Text>
              {i18n.t('form/sex')}
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
          title={i18n.t(editedRelative ? 'actions/edit' : 'actions/save')}
          style={styles.submit}
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
