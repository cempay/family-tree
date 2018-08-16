const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, { type, payload } = {}) => {
  switch (type) {
    case 'CREATE_RELATIVE':
    case 'DELETE_RELATIVE':
    case 'RELATIVE_LIST_REQUEST':
      return state;
    case 'RELATIVE_LIST_SUCCESS':
      return payload;
    default:
      return state;
  }
};
