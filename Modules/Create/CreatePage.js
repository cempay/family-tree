import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, TextInput, Switch, Picker, Button, Alert,
} from 'react-native';
import { createRelative } from '../../actions/relativesActions';
import { RelativeRelationOptions } from '../../constants/relativesConstants';
import { isNil } from '../../Services/util';

class CreatePage extends React.Component {
  static navigationOptions = {
    title: 'Create a relative',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    createRelative: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      form: {
        fullName: '',
        sex: null,
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
    this.props.createRelative(form, this.handleSuccess, this.handleFailure);
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

  handleRelationChange = (relation) => {
    this.handleFieldChange('relation', relation);
  };

  render() {
    const { form: {sex, relation} } = this.state;
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
        <Picker
          selectedValue={relation}
          style={{ height: 50, width: 100 }}
          onValueChange={this.handleRelationChange}
        >
          {RelativeRelationOptions
            .filter(option => isNil(sex) || option.sex === sex)
            .map(({ code, label }) => (
              <Picker.Item key={code} label={label} value={code} />
            ))
          }
        </Picker>
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

const mapDispatchToProps = {
  createRelative,
};

export default connect(null, mapDispatchToProps)(CreatePage);
