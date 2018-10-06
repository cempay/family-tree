import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import relatives from './relativesReducer';

export default combineReducers({
  relatives,
  form: formReducer,
});
