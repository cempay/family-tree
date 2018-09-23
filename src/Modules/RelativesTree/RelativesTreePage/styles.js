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
    marginTop: 30,
  },
  relative: {
    width: RELATIVE_BLOCK_WIDTH,
    backgroundColor: 'yellow',
  },
  relativeText: {
  },
});
