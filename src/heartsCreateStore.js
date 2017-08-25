import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import heartsReducer from './reducers';
import browserCache, { loadState } from './middleware/browserCache';

const heartsCreateStore = () => {
  const middlewares = [thunk, browserCache];
  const cachedState = loadState();
  let store = null;
  if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_WITHOUT_DEVTOOLS) {
    store = createStore(heartsReducer, cachedState, applyMiddleware(...middlewares));
  } else {
    const HeartsDevTools = require('./components/heartsAppDevTools');
    store = createStore(
      heartsReducer,
      cachedState,
      compose(
        applyMiddleware(...middlewares),
        HeartsDevTools.default.instrument()
      )
    );
  }
  return store;
};

export default heartsCreateStore;
