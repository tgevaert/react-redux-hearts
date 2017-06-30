import { combineReducers } from 'redux';
import heartsPlayers, * as fromHeartsPlayers from './heartsPlayers';
import heartsRounds, * as fromHeartsRounds from './heartsRounds';
import * as fromHeartsTricks from './heartsTricks';

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

const heartsGame = combineReducers({players: heartsPlayers, rounds: heartsRounds});

export default heartsGame;

// Player selectors
export const getPlayers = (state) => fromHeartsPlayers.getPlayers(state.players);
export const getPlayerHand = (state, player) => fromHeartsPlayers.getPlayerHand(state.players, player);
export const playerHandContainsCard = (state, player, card) => fromHeartsPlayers.playerHandContainsCard(state.players, player, card)
export const playerHandContainsSuit = (state, player, suit) => fromHeartsPlayers.playerHandContainsSuit(state.players, player, suit)

// Round selectors
export const getCurrentTrick = (state) => fromHeartsRounds.getCurrentTrick(state.rounds);
export const getCurrentTrickSuit = (state) => fromHeartsRounds.getCurrentTrickSuit(state.rounds);
export const getPreviousTrick = (state) => fromHeartsRounds.getPreviousTrick(state.rounds);
export const getCurrentWinner = (state) => fromHeartsRounds.getCurrentWinner(state.rounds);
export const getRoundTrickHistory = (state) => fromHeartsRounds.getRoundTrickHistory(state.rounds);

// Trick selectors
export const getCurrentTrickPointValue = (state) => fromHeartsTricks.getTrickPointValue(getCurrentTrick(state)); 
