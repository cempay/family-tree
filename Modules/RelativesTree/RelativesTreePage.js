import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import * as actions from '../../actions/relativesActions';
import { getTodoItems } from '../../reducers';

class RelativesTreePage extends React.Component {
  static navigationOptions = {
    title: 'Relatives tree',
  };

  static propTypes = {
    relatives: PropTypes.array.isRequired,
  };

  render() {
    const { relatives } = this.props;
    return (
      <View style={{ padding: 10 }}>
        {(relatives || []).map(item => (
          <Text>
            {item.fullName}
          </Text>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  relatives: getTodoItems(state),
  // dataSource: store.todoItemDS.cloneWithRows(todoItemsResults),
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelativesTreePage);
