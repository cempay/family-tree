import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  StackNavigator,
} from 'react-navigation';
import createReduxStore from './store/createReduxStore'
import MainPage from './Modules/Main/MainPage';
import CreatePage from './Modules/Create/CreatePage';
import RelativesTreePage from './Modules/RelativesTree/RelativesTreePage';

const store = createReduxStore();

const Stack = StackNavigator({
  Main: { screen: MainPage },
  Create: { screen: CreatePage },
  RelativesTree: { screen: RelativesTreePage },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Stack />
        </View>
      </Provider>
    );
  }
}
