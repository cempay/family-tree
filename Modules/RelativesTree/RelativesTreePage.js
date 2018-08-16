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
    getRelativeListRequest: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getRelativeListRequest();
  }

  render() {
    const { relatives } = this.props;
    return (
      <View style={{ padding: 10 }}>
        {(relatives || []).map(({ doc: { _id, fullName } }) => (
          <Text key={_id}>
            {fullName}
          </Text>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  relatives: state.relatives,
});

const mapDispatchToProps = {
  getRelativeListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelativesTreePage);
