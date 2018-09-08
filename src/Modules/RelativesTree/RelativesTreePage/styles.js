import { StyleSheet } from 'react-native';
import { RELATIVE_BLOCK_WIDTH } from '../relativesTreeConstants';

export default StyleSheet.create({
  generationList: {
    flexDirection: 'column',
  },
  generation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  relative: {
    width: RELATIVE_BLOCK_WIDTH,
    backgroundColor: 'yellow',
  },
});
