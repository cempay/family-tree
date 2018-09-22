import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import styles from './styles';

export default class TopMenu extends React.Component {
    static propTypes = {
      buttons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        onClick: PropTypes.func,
      })).isRequired,
    };

    renderMenuItem = ({ title, onClick }) => (
      <View onClick={onClick} style={styles.button} key={title}>
        <Button
          title={title}
          onPress={onClick}
        />
      </View>
    );

    render() {
      const { buttons } = this.props;
      return (
        <View style={styles.panel}>
          {
            buttons.map(this.renderMenuItem)
          }
        </View>
      );
    }
}
