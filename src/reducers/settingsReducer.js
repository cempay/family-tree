const DEFAULT_STATE = {
  language: 'en',
};

export default (state = DEFAULT_STATE, { type, payload } = {}) => {
  switch (type) {
    case 'SET_LANGUAGE':
      return { ...state, language: payload };
    default:
      return state;
  }
};
