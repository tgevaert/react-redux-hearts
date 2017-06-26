import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import HeartsApp from './heartsApp';
import heartsCreateStore from './heartsCreateStore';

const heartsStore = heartsCreateStore();
const render = () => ReactDOM.render(<HeartsApp store={heartsStore} />, document.getElementById('root'));
heartsStore.subscribe(render);
render();

registerServiceWorker();
