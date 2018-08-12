import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet, View, TextInput, Button,
} from 'react-native';
import * as actions from '../../actions/relativesActions';

class CreatePage extends React.Component {
  static navigationOptions = {
    title: 'Create a relative',
  };

  static propTypes = {
    createTodoItem: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
    };
  }

  handleSave = () => {
    const { createTodoItem } = this.props;
    const { fullName } = this.state;
    createTodoItem({
      fullName,
    });
    // .then(() => {
    //  this.props.navigation.goBack();
    //  Alert.alert(
    //    'Success',
    //    'Success saving data'
    //  );
    // })
    // .catch(() => {
    //  Alert.alert(
    //    'Error',
    //    'Error saving data'
    //  );
    // });
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
  ...actions,
};

export default connect(null, mapDispatchToProps)(CreatePage);
