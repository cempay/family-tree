import PouchDBStore from '../store/pouchdb';

export const getRelativeListSuccess = data => ({
  type: 'RELATIVE_LIST_SUCCESS',
  payload: data,
});

const store = new PouchDBStore({ onRefresh: getRelativeListSuccess });

export const createTodoItem = (data) => {
  store.createTodoItem(data);
  return {
    type: 'TODO_ITEM_ADDED',
  };
};

export const deleteTodoItem = (data) => {
  store.deleteTodoItem(data);
  return {
    type: 'TODO_ITEM_DELETED',
  };
};

export const getRelativeListRequest = () => {
  store.getRelativeList(getRelativeListSuccess);
  return {
    type: 'RELATIVE_LIST_REQUEST',
  };
};

export default {
  createTodoItem,
  deleteTodoItem,
  getRelativeListRequest,
  getRelativeListSuccess,
};
