import { StyleSheet } from 'react-native';

export const RELATIVE_BLOCK_WIDTH = 150;
export const RELATIVE_BLOCK_LAG = 20;

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
    marginTop: 30,
    backgroundColor: 'yellow',
  },
  relativeText: {
  },
});
