import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import {
  createStackNavigator,
} from 'react-navigation';
import { View } from 'react-native';
import store from './src/store/createReduxStore';
import CreatePage from './src/Modules/Create/CreatePage';
import RelativesTreePage from './src/Modules/RelativesTree/RelativesTreePage';
import en from './lang/en';
import ru from './lang/ru';

const Stack = createStackNavigator({
  RelativesTree: { screen: RelativesTreePage },
  Create: { screen: CreatePage },
});

export default class App extends React.Component {
  componentWillMount() {
    this.setLanguage('en');
  }

  setLanguage(language) {
    i18n.init({
      lng: language,
      resources: {
        en,
        ru,
      }
    });

    // TODO Предусмотреть смену локализации
    // this.props.actions.changeLanguage(i18n);
  }

  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}
