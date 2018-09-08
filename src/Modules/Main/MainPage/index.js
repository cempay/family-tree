import React from 'react';
import PropTypes from 'prop-types';
import { Button, View } from 'react-native';
import { deleteAllRelatives, getRelativeListRequest } from '../../../actions/relativesActions';
import styles from './styles';

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
