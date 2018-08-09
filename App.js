import {
  createStackNavigator,
  } from 'react-navigation';
import MainPage from './Modules/Main/MainPage';
import CreatePage from './Modules/Create/CreatePage';

const App = createStackNavigator({
  Main: { screen: MainPage },
  Create: { screen: CreatePage },
});

export default App;