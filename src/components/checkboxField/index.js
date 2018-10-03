import React from 'react';
import PropTypes from 'prop-types';
import {Text, Switch} from 'react-native';
import styles from './styles';

export default class CheckboxField extends React.Component {
  static propTypes = {
    inputProps: PropTypes.object.isRequired,
    label: PropTypes.string,
  };

  render() {
    const { inputProps, label } = this.props;
    return (
      <View style={styles.checkbox}>
        <Text>
          {label}
        </Text>
        <Switch
          {...inputProps}
          onValueChange={inputProps.onChange}
        />
      </View>
    );
  }
}
