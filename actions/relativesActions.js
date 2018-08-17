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
  return dispatch((dispatch, getState) => {
    return store.createRelative(data)
      .then((response) => {
        if (!data.relativeId) {
          return response;
        }
        const { relatives } = getState();
        const connectedRelative = relatives.find(({ relativeId }) => relativeId === data._id);
        switch (data.relationType) {
          case ERelativeRelationType.father:
            connectedRelative.father = data._id;
            break;
          case ERelativeRelationType.mother:
            connectedRelative.mother = data._id;
            break;
          default:
            throw new Error('Invalid relative relation type!');
        }

        return updateRelative(connectedRelative);
      });
  });
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
