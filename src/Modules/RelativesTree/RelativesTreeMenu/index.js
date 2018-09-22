import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopMenu from '../../../components/topMenu';

class RelativesTreeMenu extends React.Component {
    static propTypes = {
      selectedRelative: PropTypes.string,
      navigation: PropTypes.object.isRequired,
    };

    static defaultProps = {
      selectedRelative: null,
    };

    getMenuConfig = () => {
      const { selectedRelative, navigation: { navigate } } = this.props;
      const additionalButtons = [];
      if (selectedRelative) {
        additionalButtons.push({
          title: 'Edit',
          onClick: () => {},
        });
      }
      return [
        ...additionalButtons,
        {
          title: 'Add',
          onClick: () => navigate('Create'),
        },
      ];
    };

    render() {
      return (
        <TopMenu buttons={this.getMenuConfig()} />
      );
    }
}

const mapStateToProps = state => ({
  // TODO Save selected relative to redux-store
  selectedRelative: 'todo' || state.selectedRelative,
});

export default connect(mapStateToProps)(RelativesTreeMenu);
