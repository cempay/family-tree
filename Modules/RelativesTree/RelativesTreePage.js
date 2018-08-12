import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { ListView } from 'realm/react-native';
import store from '../../store';
import * as actions from '../../actions/relativesActions';
import { getTodoItems } from '../../reducers';

class RelativesTreePage extends React.Component {
  static navigationOptions = {
    title: 'Relatives tree',
  };

  static propTypes = {
    dataSource: PropTypes.object.isRequired,
  };

  render() {
    const { dataSource } = this.props;
    return (
      <View style={{ padding: 10 }}>
        <ListView
          dataSource={dataSource}
          renderRow={todoItem => (
            <Text>
              {todoItem.fullName}
            </Text>
          )}
        />
      </View>
    );
  }
}

// Realm.Results is auto-updating, therefore no need to re-fetch the data
const todoItemsResults = store.getTodoItems();

const mapStateToProps = state => ({
  ...getTodoItems(state),
  dataSource: store.todoItemDS.cloneWithRows(todoItemsResults),
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelativesTreePage);
