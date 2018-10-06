import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Switch } from 'react-native';
import FormRow from '../formRow';
import styles from './styles';

export default class CheckboxField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
  };

  render() {
    const { input, meta, label } = this.props;
    return (
      <FormRow
        meta={meta}
      >
        <View style={styles.checkbox}>
          <Text>
            {label}
          </Text>
          <Switch
            {...input}
            onValueChange={input.onChange}
          />
        </View>
      </FormRow>
    );
  }
}
