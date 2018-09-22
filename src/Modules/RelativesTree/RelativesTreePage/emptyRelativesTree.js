import React from 'react';
import { View, Text } from 'react-native';

export default class EmptyRelativesTree extends React.Component {
  render() {
    return (
      <View>
        <Text>
          {'Your relatives tree is empty. Try to Add at least one relative'}
        </Text>
      </View>
    );
  }
}
