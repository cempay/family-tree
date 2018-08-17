import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { getRelativeListRequest } from '../../actions/relativesActions';

class RelativesTreePage extends React.Component {
  static navigationOptions = {
    title: 'Relatives tree',
  };

  static propTypes = {
    relatives: PropTypes.array.isRequired,
  };

  componentWillMount() {
    getRelativeListRequest();
  }

  render() {
    const { relatives } = this.props;
    return (
      <View style={{ padding: 10 }}>
        {(relatives || []).map(item => (
          <Text key={item._id}>
            {Object.keys(item).map(key => `${item[key]} `)}
          </Text>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  relatives: state.relatives,
});

export default connect(mapStateToProps)(RelativesTreePage);
