import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class RelativeItem extends React.Component {
    static propTypes = {
      relative: PropTypes.shape({
        fullName: PropTypes.string,
        sex: PropTypes.bool,
      }).isRequired,
      active: PropTypes.bool.isRequired,
    };

    handleRelativeToggleSelect = () => {
      const { relative, selectedId, active } = this.props;
      console.log('handleRelativeToggleSelect', relative, selectedId);
      const active = selectedId === relative._id;
      if (active) {
        clearRelativeSelection();
      } else {
        selectRelative(relative._id);
      }
    };

    render() {
      const { relative: { fullName, sex, active } } = this.props;
      return (
        <TouchableOpacity onPress={this.handleRelativeToggleSelect}
          style={active ? styles.relativeActive : styles.relative}>
          <View>
            <View style={sex ? styles.relativeLeftConnection : styles.relativeRightConnection} />
            <Text style={styles.relativeText} numberOfLines={1} ellipsizeMode="tail">
              {fullName || ''}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
}
