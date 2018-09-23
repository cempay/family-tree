const DEFAULT_STATE = {
  list: [],
  selectedId: null,
};

export default (state = DEFAULT_STATE, { type, payload } = {}) => {
  switch (type) {
    case 'CREATE_RELATIVE':
    case 'UPDATE_RELATIVE':
    case 'DELETE_RELATIVE':
    case 'DELETE_ALL_RELATIVES':
    case 'RELATIVE_LIST_REQUEST':

      return state;
    case 'RELATIVE_LIST_SUCCESS':

      return { ...state, list: payload };
    case 'SELECT_RELATIVE':
      return { ...state, selectedId: payload };
    case 'CLEAR_RELATIVE_SELECTION':
      return { ...state, selectedId: null };
    default:
      return state;
  }
};
