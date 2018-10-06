import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import FormRow from '../formRow';

export default class TextField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: null,
  };

  render() {
    const { input, placeholder } = this.props;
    return (
      <FormRow
        meta={input.meta}
      >
        <TextInput
          {...input}
          style={{ height: 40 }}
          placeholder={placeholder}
          onChangeText={input.onChange}
        />
      </FormRow>
    );
  }
}
