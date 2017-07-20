import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import heartsReducer from './reducers';

const heartsCreateStore = () => {
  const middlewares = [thunk];
  let store = null;
  if (process.env.NODE_ENV === 'development') {
    const HeartsDevTools = require('./heartsAppDevTools');
    store = createStore(heartsReducer, compose(applyMiddleware(...middlewares), HeartsDevTools.default.instrument()));
  } else {
    store = createStore(heartsReducer, applyMiddleware(thunk));
  }
  return store;
}

export default heartsCreateStore;
