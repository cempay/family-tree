import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, TextInput, Button, Alert
} from 'react-native';
import {createRelative} from '../../actions/relativesActions';

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
      fullName: '',
    };
  }

  handleSuccess = () => {
    this.props.navigation.goBack();
    Alert.alert(
      'Success',
      'Success saving data'
    );
  };

  handleFailure = (err) => {
    Alert.alert(
      'Error',
      'Error saving data'
    );
  };

  handleSave = () => {
    const { createRelative } = this.props;
    const { fullName } = this.state;
    createRelative({
      fullName,
    }, this.handleSuccess, this.handleFailure)
  };

  render() {
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Lastname Firstname Middlename"
          onChangeText={fullName => this.setState({ fullName })}
        />
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
