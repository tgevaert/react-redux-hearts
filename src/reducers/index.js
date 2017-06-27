import { combineReducers } from 'redux';
import heartsPlayers, * as fromHeartsPlayers from './heartsPlayers';
import heartsTricks, * as fromHeartsTricks from './heartsTricks';

const heartsGame = combineReducers({players: heartsPlayers, tricks: heartsTricks});

export default heartsGame;

export const getPlayers = (state) => fromHeartsPlayers.getPlayers(state.players);
export const getPlayerHand = (state, player) => fromHeartsPlayers.getPlayerHand(state.players, player);
export const getCurrentTrick = (state) => fromHeartsTricks.getCurrentTrick(state.tricks);
//export const getCurrentPlayer = (state) => state.currentPlayer;
