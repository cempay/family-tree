import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import relatives from './relativesReducer';
import settings from './settingsReducer';

export default combineReducers({
  form: formReducer,
  settings,
  relatives,
});
