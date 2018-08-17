import PouchDBStore from '../store/pouchdb';
import reduxStore from '../store/createReduxStore';

export const getRelativeListSuccess = data => (
  reduxStore.dispatch({
    type: 'RELATIVE_LIST_SUCCESS',
    payload: data,
  })
);

const store = new PouchDBStore({ onRefresh: getRelativeListSuccess });

export const createRelative = (data, onSuccess, onFailure) => {
  store.createRelative(data, onSuccess, onFailure);
  return {
    type: 'CREATE_RELATIVE',
  };
};

export const deleteRelative = (data) => {
  store.deleteRelative(data);
  return {
    type: 'DELETE_RELATIVE',
  };
};

export const deleteAllRelatives = () => {
  store.deleteAllRelatives();
  return {
    type: 'DELETE_ALL_RELATIVES',
  };
};

export const getRelativeListRequest = () => {
  store.getRelativeList();
  return {
    type: 'RELATIVE_LIST_REQUEST',
  };
};
