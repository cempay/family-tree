const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type } = {}) => {
  switch (type) {
    case 'TODO_ITEM_ADDED':
    case 'TODO_ITEM_DELETED':
      return { ...state, lastModified: Date.now() };
    default:
      return state;
  }
};
