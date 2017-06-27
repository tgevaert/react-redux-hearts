import { combineReducers } from 'redux';
import heartsPlayers, * as fromHeartsPlayers from './heartsPlayers';
import heartsTricks, * as fromHeartsTricks from './heartsTricks';

export const getCurrentPlayer = (state) => {
  let players = getPlayers(state);
  if (!players.length) {
    // No players yet
    return null;
  }

  const currentTrick = getCurrentTrick(state);
  // If an empty trick, get the previous trick's winner.
  if (!currentTrick.length) {
    const previousTrick = getPreviousTrick(state);
    if (!previousTrick.length) {
      // Start of game, start with first player
      return players[0].name;
    } 
    // Retain lead of previous trick winner
    return fromHeartsTricks.getTrickWinner(previousTrick);
  }
  // If an ongoing trick, get the next player.
  const lastMove = fromHeartsTricks.getLastMove(currentTrick);
  const idx = players.findIndex(p => p.name === lastMove.player);
  return players[(idx + 1) % players.length].name
}

const heartsGame = combineReducers({players: heartsPlayers, tricks: heartsTricks});

export default heartsGame;

export const getPlayers = (state) => fromHeartsPlayers.getPlayers(state.players);
export const getPlayerHand = (state, player) => fromHeartsPlayers.getPlayerHand(state.players, player);
export const getCurrentTrick = (state) => fromHeartsTricks.getCurrentTrick(state.tricks);
export const getPreviousTrick = (state) => fromHeartsTricks.getPreviousTrick(state.tricks);
export const getCurrentWinner = (state) => fromHeartsTricks.getCurrentWinner(state.tricks);
//export const getCurrentPlayer = (state) => state.currentPlayer;
