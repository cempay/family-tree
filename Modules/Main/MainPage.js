import React from 'react';
import { Button } from 'react-native';

export default class MainPage extends React.Component {
  static navigationOptions = {
    title: 'Menu',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Create a relative..."
        onPress={() =>
          navigate('Create')
        }
      />
    );
  }
}
