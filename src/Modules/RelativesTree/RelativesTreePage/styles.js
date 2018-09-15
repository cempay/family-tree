import { StyleSheet } from 'react-native';

export const RELATIVE_BLOCK_WIDTH = 150;

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
