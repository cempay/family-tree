import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {createRelative} from './CreateActions';

export default class CreatePage extends React.Component {
  static navigationOptions = {
    title: 'Create a relative',
  };
  constructor(props) {
    super(props);
    this.state = {
      fullName: ''
    };
  }

  handleSave = () => {
    const {fullName} = this.state;
    createRelative({
      fullName
    })
      .then(() => {
        this.props.navigation.goBack();
        Alert.alert(
          'Success',
          'Success saving data'
        );
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Error saving data'
        );
      });
  };

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Lastname Firstname Middlename"
          onChangeText={(fullName) => this.setState({fullName})}
        />
        <Button
          title="Save"
          onPress={this.handleSave}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
