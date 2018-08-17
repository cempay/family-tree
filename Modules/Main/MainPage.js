import React from 'react';
import PropTypes from 'prop-types';
import { Button, View, StyleSheet } from 'react-native';
import { deleteAllRelatives, getRelativeListRequest } from '../../actions/relativesActions';

export default class MainPage extends React.Component {
  static navigationOptions = {
    title: 'Menu',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  componentWillMount() {
    getRelativeListRequest();
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return (
      <View style={styles.actionPanel}>
        <Button
          style={styles.action}
          title="Create a relative..."
          onPress={() => navigate('Create')
          }
        />
        <Button
          style={styles.action}
          title="Show relatives..."
          onPress={() => navigate('RelativesTree')
          }
        />
        <Button
          style={styles.action}
          title="Delete all relatives..."
          onPress={() => deleteAllRelatives()
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionPanel: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  action: {
    // width: '100%',
    // marginBottom: 10,
  },
});
