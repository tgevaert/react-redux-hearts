import React from 'react';
import { render as ReactDOMRender } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './css/heartsApp.css';
import './card_hand.svg';
import HeartsApp from './heartsApp';
import heartsCreateStore from './heartsCreateStore';
import * as heartsActions from './actions';
// Polyfills for Old browsers
import 'core-js/fn/array/fill';
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';

const heartsStore = heartsCreateStore();
const render = () => ReactDOMRender(<HeartsApp store={heartsStore} />, document.getElementById('root'));
heartsStore.dispatch(heartsActions.addPlayer("Bob", "AI"));
heartsStore.dispatch(heartsActions.addPlayer("Doug", "AI"));
heartsStore.dispatch(heartsActions.addPlayer("Bill", "AI"));
heartsStore.dispatch(heartsActions.addPlayer("Tim", "Human"));
heartsStore.dispatch(heartsActions.newGame());
const state = heartsStore.getState();
heartsStore.dispatch({type: "PASS_CARDS", fromPlayerID: state.players[0].id, toPlayerID: state.players[1].id, cards: state.players[0].playerHand.slice(0, 3)});
heartsStore.subscribe(render);
render();
registerServiceWorker();
