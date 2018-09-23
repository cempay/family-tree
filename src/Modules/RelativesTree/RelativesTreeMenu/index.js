import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from '../../../Services/util';
import TopMenu from '../../../components/topMenu';
import { deleteAllRelatives } from '../../../actions/relativesActions';

class RelativesTreeMenu extends React.Component {
    static propTypes = {
      selectedId: PropTypes.string,
      relatives: PropTypes.array.isRequired,
      navigation: PropTypes.object.isRequired,
    };

    static defaultProps = {
      selectedId: null,
    };

    getMenuConfig = () => {
      const { selectedId, navigation: { navigate }, relatives } = this.props;
      const additionalButtons = [];
      if (!isEmpty(relatives)) {
        additionalButtons.push({
          title: 'Clear',
          onClick: deleteAllRelatives,
        });
      }
      if (selectedId) {
        additionalButtons.push({
          title: 'Edit',
          onClick: () => {},
        });
        const selectedRelative = isEmpty(relatives)
          ? null
          : relatives.find(({ _id }) => _id === selectedId);
        if (selectedRelative && isEmpty(selectedRelative.children)) {
          additionalButtons.push({
            title: 'Del',
            onClick: () => {},
          });
        }
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
  selectedId: state.relatives.selectedId,
  relatives: state.relatives.list,
});

export default connect(mapStateToProps)(RelativesTreeMenu);
