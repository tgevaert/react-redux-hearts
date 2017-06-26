import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import HeartsApp from './heartsApp';
import heartsCreateStore from './heartsCreateStore';
import * as heartsActions from './actions';

const heartsStore = heartsCreateStore();
const render = () => ReactDOM.render(<HeartsApp store={heartsStore} />, document.getElementById('root'));
heartsStore.subscribe(render);
heartsStore.dispatch(heartsActions.addPlayer({name: "Tim", playerType: "Human"}));
heartsStore.dispatch(heartsActions.addPlayer({name: "Left", playerType: "Human"}));
heartsStore.dispatch(heartsActions.addPlayer({name: "Top", playerType: "Human"}));
heartsStore.dispatch(heartsActions.addPlayer({name: "Right", playerType: "Human"}));
heartsStore.dispatch(heartsActions.deal());
registerServiceWorker();
