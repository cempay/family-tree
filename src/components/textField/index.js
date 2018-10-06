import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import FormRow from '../formRow';
import styles from './styles';

export default class TextField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: null,
  };

  render() {
    const { input, meta, placeholder } = this.props;
    return (
      <FormRow
        meta={meta}
      >
        <TextInput
          {...input}
          style={styles.textField}
          placeholder={placeholder}
          onChangeText={input.onChange}
        />
      </FormRow>
    );
  }
}
