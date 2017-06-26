import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import HeartsApp from './heartsApp';
import heartsCreateStore from './heartsCreateStore';

const heartsStore = heartsCreateStore();
const render = () => ReactDOM.render(<HeartsApp store={heartsStore} />, document.getElementById('root'));
heartsStore.subscribe(render);
heartsStore.dispatch({type: "ADD_PLAYER", name: "West", playerType: "Ai"});
heartsStore.dispatch({type: "ADD_PLAYER", name: "North", playerType: "Ai"});
heartsStore.dispatch({type: "ADD_PLAYER", name: "East", playerType: "Ai"});
heartsStore.dispatch({type: "ADD_PLAYER", name: "Tim", playerType: "Human"});
heartsStore.dispatch({type: "PLAY_CARD", player: "Tim", card: "4H"});
heartsStore.dispatch({type: "PLAY_CARD", player: "West", card: "5H"});
render();

registerServiceWorker();
