import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';

export default class TextField extends React.Component {
  static propTypes = {
    inputProps: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
  };

  render() {
    const { inputProps, placeholder } = this.props;
    return (
      <TextInput
        {...inputProps}
        style={{ height: 40 }}
        placeholder={placeholder}
        onChangeText={inputProps.onChange}
      />
    );
  }
}
