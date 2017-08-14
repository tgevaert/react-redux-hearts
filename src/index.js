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
const render = () =>
  ReactDOMRender(
    <HeartsApp store={heartsStore} />,
    document.getElementById('root')
  );
heartsStore.subscribe(render);
heartsStore.dispatch(heartsActions.gameTick());
registerServiceWorker();
