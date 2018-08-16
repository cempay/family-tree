import React from 'react';
import { Provider } from 'react-redux';
import {
  createStackNavigator,
} from 'react-navigation';
import { View } from 'react-native';
import store from './store/createReduxStore';
import MainPage from './Modules/Main/MainPage';
import CreatePage from './Modules/Create/CreatePage';
import RelativesTreePage from './Modules/RelativesTree/RelativesTreePage';

const Stack = createStackNavigator({
  Main: { screen: MainPage },
  Create: { screen: CreatePage },
  RelativesTree: { screen: RelativesTreePage },
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
