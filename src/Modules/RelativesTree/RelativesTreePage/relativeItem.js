import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import styles from './styles';

export default class RelativeItem extends React.Component {
    static propTypes = {
      relative: PropTypes.shape({
        fullName: PropTypes.string,
        sex: PropTypes.bool,
      }).isRequired,
    };

    render() {
      const { relative: { fullName, sex } } = this.props;
      return (
        <View style={styles.relative}>
          <View style={sex ? styles.relativeLeftConnection : styles.relativeRightConnection} />
          <Text style={styles.relativeText} numberOfLines={1} ellipsizeMode="tail">
            {fullName || ''}
          </Text>
        </View>
      );
    }
}
