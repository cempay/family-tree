const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type, payload } = {}) => {
  switch (type) {
    case 'TODO_ITEM_ADDED':
    case 'TODO_ITEM_DELETED':
    case 'RELATIVE_LIST_REQUEST':
      return state;
    case 'RELATIVE_LIST_SUCCESS':
      return payload;
    default:
      return state;
  }
};
