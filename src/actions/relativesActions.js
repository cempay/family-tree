import PouchDBStore from '../store/pouchdb';
import reduxStore from '../store/createReduxStore';
import { ERelativeRelationType } from '../constants/relativesConstants';
import { isEmpty } from '../Services/util';

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
      const state = getState();
      const { relatives: { list } } = state;
      const connectedRelative = list.find(({ _id }) => _id === data.relativeId);

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
  dispatch({
    type: 'DELETE_RELATIVE',
  });
  return dispatch((_, getState) => store.deleteRelative(data)
    .then((response) => {
      if (isEmpty(data.children)) {
        return response;
      }
      const state = getState();
      const { relatives: { list } } = state;
      const child = list.find(({ _id }) => _id === data.children[0]);

      switch (data.relationType) {
        case ERelativeRelationType.father:
          delete child.father;
          break;
        case ERelativeRelationType.mother:
          delete child.mother;
          break;
        default:
          throw new Error('Invalid relative relation type!');
      }

      return updateRelative(child);
    }));
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
