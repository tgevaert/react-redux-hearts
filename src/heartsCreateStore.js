import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import heartsReducer from './reducers';

const heartsCreateStore = () => createStore(heartsReducer, applyMiddleware(thunk));

export default heartsCreateStore;
