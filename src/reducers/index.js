import { combineReducers } from 'redux';
import relatives from './relativesReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  relatives,
  form: formReducer,
});
