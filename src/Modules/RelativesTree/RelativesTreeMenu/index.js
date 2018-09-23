import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopMenu from '../../../components/topMenu';
import { deleteAllRelatives } from '../../../actions/relativesActions';

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
        {
          title: 'Clear',
          onClick: deleteAllRelatives,
        },
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
  selectedRelative: state.relatives.selectedId,
});

export default connect(mapStateToProps)(RelativesTreeMenu);
