import React from 'react';
import { Provider } from 'react-redux';
import {
  createStackNavigator,
} from 'react-navigation';
import { View } from 'react-native';
import store from './src/store/createReduxStore';
import CreatePage from './src/Modules/Create/CreatePage';
import RelativesTreePage from './src/Modules/RelativesTree/RelativesTreePage';

const Stack = createStackNavigator({
  RelativesTree: { screen: RelativesTreePage },
  Create: { screen: CreatePage },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}
