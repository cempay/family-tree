import React from 'react';
import { View, Text } from 'react-native';
import i18n from 'i18next';

export default class EmptyRelativesTree extends React.Component {
  render() {
    return (
      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>
          {i18n.t('tree/emptyHint')}
        </Text>
      </View>
    );
  }
}
