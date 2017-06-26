import { combineReducers } from 'redux';
import heartsPlayers, * as fromHeartsPlayers from './heartsPlayers';
import currentTrick, * as fromCurrentTrick from './currentTrick';

const currentPlayer = (state = "", action) => {
  return state;
};

const rules = (state = {}, action) => {
  return state;
};

const heartsGame = combineReducers({players: heartsPlayers, rules, currentTrick, currentPlayer});

export default heartsGame;

export const getPlayers = (state) => fromHeartsPlayers.getPlayers(state.players);
export const getCurrentTrick = (state) => fromCurrentTrick.getCurrentTrick(state.currentTrick);
