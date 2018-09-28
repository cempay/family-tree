import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, ScrollView, Text,
} from 'react-native';
import i18n from 'i18next';
import { getRelativeListRequest } from '../../../actions/relativesActions';
import { isEmpty } from '../../../Services/util';
import styles, { RELATIVE_BLOCK_WIDTH, RELATIVE_BLOCK_LAG } from './styles';
import RelativeItem from './relativeItem';
import RelativesTreeMenu from '../RelativesTreeMenu';
import EmptyRelativesTree from './emptyRelativesTree';

const FAKE_RELATIVE = {
  fake: true,
};

const ENABLE_HEART_SYMBOL = false;

class RelativesTreePage extends React.Component {
  static navigationOptions = () => ({
    title: i18n.t('tree/title'),
  });

  static propTypes = {
    relatives: PropTypes.array.isRequired,
    selectedId: PropTypes.string,
    navigation: PropTypes.object.isRequired,
  };

  static defaultProps = {
    selectedId: null,
  };

  componentWillMount() {
    getRelativeListRequest();
  }

  getFamilyTreeHead = () => {
    const { relatives } = this.props;
    const result = (relatives || []).find(({ children }) => isEmpty(children));

    return result;
  };

  getOlderGeneration = (currentGeneration = []) => {
    const { relatives } = this.props;
    const result = [];
    let existRealRelatives = false;
    currentGeneration.forEach((relative) => {
      if (!relative) return;
      const { father, mother, fake } = relative;
      if (fake || isEmpty(father)) {
        result.push(FAKE_RELATIVE);
      } else {
        result.push(relatives.find(({ _id }) => _id === father));
        existRealRelatives = true;
      }
      if (fake || isEmpty(mother)) {
        result.push(FAKE_RELATIVE);
      } else {
        result.push(relatives.find(({ _id }) => _id === mother));
        existRealRelatives = true;
      }
    });

    return existRealRelatives ? result : null;
  };

  getGenerationList = () => {
    const result = [];
    const head = this.getFamilyTreeHead();
    if (!isEmpty(head)) {
      let currentGeneration = [head];
      while (!isEmpty(currentGeneration)) {
        result.push(currentGeneration);
        currentGeneration = this.getOlderGeneration(currentGeneration);
      }
    }
    return result;
  };

  getWidth = (generationList) => {
    const generationsCount = generationList.length;
    const k = 2 ** (generationsCount - 1);
    const width = k * (RELATIVE_BLOCK_WIDTH) + (k - 1) * (RELATIVE_BLOCK_LAG);
    return width;
  };

  addHeartSymbol = (items, prevRelative, relative) => {
    if (ENABLE_HEART_SYMBOL && prevRelative && !isEmpty(prevRelative.children)
      && !isEmpty(relative.children) && prevRelative.children[0] === relative.children[0]) {
      items.push(
        <Text key={`heart${relative._id}`}>
        ♥
        </Text>,
      );
    }
  };

  renderGeneration = (generation) => {
    const { selectedId } = this.props;
    const items = [];
    let prevRelative;
    generation.forEach((relative, index) => {
      if (!relative) return;
      this.addHeartSymbol(items, prevRelative, relative);
      items.push(
        <RelativeItem
          key={index}
          relative={relative}
          active={selectedId === relative._id}
        />,
      );
      prevRelative = relative;
    });
    return items;
  };

  render() {
    const { navigation } = this.props;
    const generationList = this.getGenerationList();
    return (
      <View style={{ padding: 10 }}>
        <RelativesTreeMenu navigation={navigation} />
        {isEmpty(generationList)
          ? <EmptyRelativesTree /> : (
            <ScrollView horizontal>
              <View style={{ flexDirection: 'column', width: this.getWidth(generationList) }}>
                {generationList.map((generation, index) => (
                  <View style={styles.generation} key={index}>
                    {this.renderGeneration(generation)}
                  </View>
                ))}
              </View>
            </ScrollView>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  relatives: state.relatives.list,
  selectedId: state.relatives.selectedId,
});

export default connect(mapStateToProps)(RelativesTreePage);
