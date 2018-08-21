import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { getRelativeListRequest } from '../../actions/relativesActions';
import { isEmpty } from '../../Services/util';

const FAKE_RELATIVE = {
  fake: true,
};

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
    const {relatives} = this.props;
    const result = [];
    console.debug(currentGeneration, '----------------');
    let existRealRelatives = false;
    currentGeneration.forEach((relative) => {
      const { father, mother, fake } = relative;
      console.debug(relative);
      if (fake || isEmpty(father)) {
        result.push(FAKE_RELATIVE);
      } else {
        result.push(relatives.find(({_id}) => _id === father);
        existRealRelatives = true;
      }
      if (fake || isEmpty(mother)) {
        result.push(FAKE_RELATIVE);
      } else {
        result.push(relatives.find(({_id}) => _id === mother);
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

  render() {
    const { relatives } = this.props;
    const generationList = this.getGenerationList();
    // const generationsCount = generationList.length;
    return (
      <View style={{ padding: 10 }}>
        {(relatives || []).map(item => (
          <Text key={item._id}>
            {Object.keys(item).map(key => `${item[key]} `)}
          </Text>
        ))}
        <View style={styles.generationList}>
          {generationList.map((generation, index) => (
            <View style={styles.generation} key={index}>
              {generation.map(({ fullName }, index2) => (
                <Text style={styles.relative} key={index2}>
                  {fullName || ''}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  relatives: state.relatives,
});

export default connect(mapStateToProps)(RelativesTreePage);

const styles = StyleSheet.create({
  generationList: {
    // flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  generation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginBottom: 10,
  },
  relative: {
    // width: '100%',
    // marginBottom: 10,
  },
});
