import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from '../../../Services/util';
import TopMenu from '../../../components/topMenu';
import { setLanguage } from '../../../actions/settingsActions';
import { deleteRelative, deleteAllRelatives } from '../../../actions/relativesActions';

class RelativesTreeMenu extends React.Component {
    static propTypes = {
      language: PropTypes.string.isRequired,
      selectedId: PropTypes.string,
      relatives: PropTypes.array.isRequired,
      navigation: PropTypes.object.isRequired,
    };

    static defaultProps = {
      selectedId: null,
    };

    getMenuConfig = () => {
      const {
        language, selectedId, navigation: { navigate }, relatives,
      } = this.props;
      const additionalButtons = [{
        title: language,
        onClick: setLanguage.bind(this, language === 'en' ? 'ru' : 'en'),
      }];
      if (!isEmpty(relatives)) {
        additionalButtons.push({
          title: 'Clear',
          onClick: deleteAllRelatives,
        });
      }
      if (selectedId) {
        const selectedRelative = isEmpty(relatives)
          ? null
          : relatives.find(({ _id }) => _id === selectedId);
        additionalButtons.push({
          title: 'Edit',
          onClick: () => navigate('Create', { editedRelative: selectedRelative }),
        });
        if (selectedRelative && !selectedRelative.father && !selectedRelative.mother) {
          additionalButtons.push({
            title: 'Del',
            onClick: () => { deleteRelative(selectedRelative); },
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
  language: state.settings.language,
  selectedId: state.relatives.selectedId,
  relatives: state.relatives.list,
});

export default connect(mapStateToProps)(RelativesTreeMenu);
