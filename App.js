import {
  createStackNavigator,
  } from 'react-navigation';
import MainPage from './Modules/Main/MainPage';
import CreatePage from './Modules/Create/CreatePage';
import RelativesTreePage from './Modules/RelativesTree/RelativesTreePage';

const App = createStackNavigator({
  Main: { screen: MainPage },
  Create: { screen: CreatePage },
  RelativesTree: { screen: RelativesTreePage },
});

export default App;