import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './card_hand.png';
import './index.css';
import HeartsApp from './heartsApp';
import heartsCreateStore from './heartsCreateStore';
import * as heartsActions from './actions';

const heartsStore = heartsCreateStore();
const render = () => ReactDOM.render(<HeartsApp store={heartsStore} />, document.getElementById('root'));
heartsStore.subscribe(render);
render();
registerServiceWorker();
