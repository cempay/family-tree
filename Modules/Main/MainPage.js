import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, View, StyleSheet } from 'react-native';
import { deleteAllRelatives } from '../../actions/relativesActions';

class MainPage extends React.Component {
  static navigationOptions = {
    title: 'Menu',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deleteAllRelatives: PropTypes.func.isRequired,
  };

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
          onPress={() => this.props.deleteAllRelatives()
          }
        />
      </View>
    );
  }
}

const mapDispatchToProps = {
  deleteAllRelatives,
};

export default connect(null, mapDispatchToProps)(MainPage);

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
