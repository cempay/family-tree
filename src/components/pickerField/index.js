import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'react-native';
import FormRow from '../formRow';
import styles from './styles';

export default class PickerField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    optionsMap: PropTypes.shape({
      code: PropTypes.string,
      label: PropTypes.string,
    }),
    enabled: PropTypes.bool,
  };

  static defaultProps = {
    enabled: true,
  };

  static defaultProps = {
    optionsMap: {
      code: 'code',
      label: 'label',
    },
  };

  handleValueChange = (value) => {
    console.log('picker', value);
    this.props.input.onChange(value);
  };

  render() {
    const {
      meta, options, enabled, optionsMap: { code, label },
    } = this.props;
    return (
      <FormRow
        meta={meta}
      >
        <Picker
          style={styles.picker}
          enabled={enabled}
          onValueChange={this.handleValueChange}
        >
          {options
            .map(option => (
              <Picker.Item key={option[code]} label={option[label]} value={option[code]} />
            ))
          }
        </Picker>
      </FormRow>
    );
  }
}
