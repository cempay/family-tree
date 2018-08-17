import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, TextInput, Switch, Picker, Button, Alert,
} from 'react-native';
import { createRelative } from '../../actions/relativesActions';
import { ERelativeRelationType, RelativeRelationTypeOptions } from '../../constants/relativesConstants';
import { isNil, isEmpty } from '../../Services/util';

class CreatePage extends React.Component {
  static navigationOptions = {
    title: 'Create a relative',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    createRelative: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      form: {
        fullName: '',
        sex: null,
        relativeType: null,
        relativeId: null,
      },
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
    const { form } = this.state;
    this.props.createRelative(
      {
        ...form,
      },
      this.handleSuccess,
      this.handleFailure
    );
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
    const {relatives} = this.props;
    const { form: { sex, relationType, relativeId } } = this.state;
    const emptyRelatives = isEmpty(relatives);
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Lastname Firstname Middlename"
          onChangeText={this.handleFullNameChange}
        />
        <Switch
          value={sex}
          onValueChange={this.handleSexChange}
        />
        {!emptyRelatives && (
          <Picker
            selectedValue={relationType}
            style={{ height: 50, width: 100 }}
            onValueChange={this.handleRelationTypeChange}
          >
            {RelativeRelationTypeOptions
              .filter(option => isNil(sex) || option.sex === sex)
              .map(({ code, label }) => (
                <Picker.Item key={code} label={label} value={code} />
              ))
            }
          </Picker>
        )}
        {!emptyRelatives && (
          <Picker
            selectedValue={relativeId}
            style={{ height: 50, width: 100 }}
            onValueChange={this.handleRelativeIdChange}
            enabled={relationType && !isNil(relationType)}
          >
            {relatives
              .filter(({doc: {_id}}) => {
                return true;
              })
              .map(({doc: { _id, fullName }}) => (
                <Picker.Item key={_id} label={fullName} value={_id} />
              ))
            }
          </Picker>
        )}
        <Button
          title="Save"
          onPress={this.handleSave}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
// });

const mapStateToProps = state => ({
  relatives: state.relatives,
});

const mapDispatchToProps = {
  createRelative,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
