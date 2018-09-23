import PouchDBStore from '../store/pouchdb';
import reduxStore from '../store/createReduxStore';
import { ERelativeRelationType } from '../constants/relativesConstants';

const dispatch = reduxStore.dispatch;

export const getRelativeListSuccess = data => (
  dispatch({
    type: 'RELATIVE_LIST_SUCCESS',
    payload: data,
  })
);

const store = new PouchDBStore({ onRefresh: getRelativeListSuccess });

export const createRelative = (data) => {
  dispatch({
    type: 'CREATE_RELATIVE',
  });
  return dispatch((_, getState) => store.createRelative(data)
    .then((response) => {
      if (!data.relativeId) {
        return response;
      }
      const { relatives } = getState();
      const connectedRelative = relatives.find(({ _id }) => _id === data.relativeId);

      switch (data.relationType) {
        case ERelativeRelationType.father:
          connectedRelative.father = response.id;
          break;
        case ERelativeRelationType.mother:
          connectedRelative.mother = response.id;
          break;
        default:
          throw new Error('Invalid relative relation type!');
      }

      return updateRelative(connectedRelative);
    }));
};

export const updateRelative = (data) => {
  dispatch({
    type: 'UPDATE_RELATIVE',
  });
  return store.updateRelative(data);
};

export const deleteRelative = (data) => {
  store.deleteRelative(data);
  dispatch({
    type: 'DELETE_RELATIVE',
  });
};

export const deleteAllRelatives = () => {
  store.deleteAllRelatives();
  dispatch({
    type: 'DELETE_ALL_RELATIVES',
  });
};

export const getRelativeListRequest = () => {
  store.getRelativeList();
  dispatch({
    type: 'RELATIVE_LIST_REQUEST',
  });
};

export const selectRelative = (id) => {
  dispatch({
    type: 'SELECT_RELATIVE',
    payload: id,
  });
};

export const clearRelativeSelection = () => {
  dispatch({
    type: 'CLEAR_RELATIVE_SELECTION',
  });
};
