import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middleware = [
  thunk,
];

function createReduxStore(initialState) {
  const enhancer = compose(
    applyMiddleware(...middleware),
  );
  return createStore(rootReducer, initialState, enhancer);
}

const store = createReduxStore();

export default store;
