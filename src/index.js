import React from 'react';
import { render as ReactDOMRender } from 'react-dom/lib/ReactDOM';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './card_hand.png';
import './index.css';
import HeartsApp from './heartsApp';
import heartsCreateStore from './heartsCreateStore';

const heartsStore = heartsCreateStore();
const render = () => ReactDOMRender(<HeartsApp store={heartsStore} />, document.getElementById('root'));
heartsStore.subscribe(render);
render();
registerServiceWorker();
