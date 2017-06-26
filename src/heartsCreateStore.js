import { createStore } from 'redux';
import heartsReducer from './reducers';

const heartsCreateStore = () => createStore(heartsReducer);

export default heartsCreateStore;
