import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import heartsReducer from './reducers';

const heartsCreateStore = () => {
  const middlewares = [thunk];
  let store = null;
  if (process.env.NODE_ENV === 'production') {
    store = createStore(heartsReducer, applyMiddleware(thunk));
  } else {
    const HeartsDevTools = require('./components/heartsAppDevTools');
    store = createStore(heartsReducer, compose(applyMiddleware(...middlewares), HeartsDevTools.default.instrument()));
  }
  return store;
}

export default heartsCreateStore;
