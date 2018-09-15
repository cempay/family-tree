import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, ScrollView,
} from 'react-native';
import { getRelativeListRequest } from '../../../actions/relativesActions';
import { isEmpty } from '../../../Services/util';
import styles, {RELATIVE_BLOCK_WIDTH} from './styles';

const FAKE_RELATIVE = {
  fake: true,
};

const RELATIVE_BLOCK_LAG = 20;

class RelativesTreePage extends React.Component {
  static navigationOptions = {
    title: 'Relatives tree',
  };

  static propTypes = {
    relatives: PropTypes.array.isRequired,
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
    console.debug(currentGeneration, '----------------');
    let existRealRelatives = false;
    currentGeneration.forEach((relative) => {
      const { father, mother, fake } = relative;
      console.debug(relative);
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
    console.debug(result, '==========');
    return result;
  };

  getWidth = (generationList) => {
    const generationsCount = generationList.length;
    const k = 2 ** (generationsCount - 1);
    const width = k * (RELATIVE_BLOCK_WIDTH) + (k - 1) * (RELATIVE_BLOCK_LAG);
    console.debug('width=', width);
    return width;
  };

  render() {
    // const { relatives } = this.props;
    const generationList = this.getGenerationList();
    return (
      <View style={{ padding: 10 }}>
        <ScrollView horizontal style={{ width: this.getWidth(generationList) }}>
          <View style={{ flexDirection: 'column', width: this.getWidth(generationList) }}>
            {generationList.map((generation, index) => (
              <View style={styles.generation} key={index}>
                {generation.map(({ fullName }, index2) => (
                  <Text style={styles.relative} key={index2} numberOfLines={1} ellipsizeMode="tail">
                    {fullName || ''}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  relatives: state.relatives,
});

export default connect(mapStateToProps)(RelativesTreePage);
