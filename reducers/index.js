import { combineReducers } from 'redux';
import todoItems from './todoItems';

export default combineReducers({
  todoItems,
});

export const getTodoItems = state => state.todoItems;
