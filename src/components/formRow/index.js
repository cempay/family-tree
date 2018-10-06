import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import i18n from 'i18next';
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
      <Text style={styles.label}>
        {label}
      </Text>
    );
  };

  renderChildren = () => {
    const { children } = this.props;

    return children;
  };

  renderError = () => {
    const { meta = {} } = this.props;
    return meta.touched && meta.error ? (
      <Text style={styles.error}>
        {i18n.t(meta.error)}
      </Text>
    ) : (
      <Text style={styles.error} />
    );
  };

  render() {
    return (
      <View style={styles.formRow}>
        {this.renderLabel()}
        {this.renderChildren()}
        {this.renderError()}
      </View>
    );
  }
}

export default FormRow;
