import React from 'react';
import { render as ReactDOMRender } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './css/heartsBootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/heartsApp.css';
import './card_hand.svg';
import HeartsApp from './heartsApp';
import heartsCreateStore from './heartsCreateStore';
import * as heartsActions from './actions';

const heartsStore = heartsCreateStore();
const render = () => ReactDOMRender(<HeartsApp store={heartsStore} />, document.getElementById('root'));
heartsStore.subscribe(render);
heartsStore.dispatch(heartsActions.addPlayer("Bob", "Human"));
heartsStore.dispatch(heartsActions.addPlayer("Doug", "AI"));
heartsStore.dispatch(heartsActions.addPlayer("Bill", "AI"));
heartsStore.dispatch(heartsActions.addPlayer("Ted", "AI"));
heartsStore.dispatch(heartsActions.deal());
//let firstPlayerID = heartsStore.getState().players[0].id;
//heartsStore.dispatch(heartsActions.playCard(firstPlayerID, {suit: "C", value: "2"}));
render();
registerServiceWorker();
