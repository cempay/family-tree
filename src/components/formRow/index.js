import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

class FormRow extends React.Component {
  static propTypes = {
    meta: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    label: PropTypes.string,
  };

  static defaultProps = {
    label: null,
  };

  renderLabel = () => {
    const { label } = this.props;
    if (!label) return null;
    return (
      <Text styles={styles.label}>
        {label}
      </Text>
    );
  };

  renderChildren = () => {
    const { children } = this.props;

    return children;
  };

  render() {
    const { meta = {} } = this.props;

    const validationError = meta.touched && meta.error ? (
      <Text styles={styles.error}>
        {meta.error}
      </Text>
    ) : null;

    return (
      <View styles={styles.formRow}>
        {this.renderLabel()}
        {this.renderChildren()}
        {validationError}
      </View>
    );
  }
}

export default FormRow;
