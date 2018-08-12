import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
//import {retrieveAllRelatives} from '../Create/CreateActions'

export default class MainPage extends React.Component {
  static navigationOptions = {
    title: 'Menu',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.actionPanel}>
        <Button
          style={styles.action}
          title="Create a relative..."
          onPress={() =>
            navigate('Create')
          }
        />
        <Button
          style={styles.action}
          title="Show relatives..."
          onPress={() =>
            navigate('RelativesTree')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    width: '100%',
    marginBottom: 10,
  },
});

