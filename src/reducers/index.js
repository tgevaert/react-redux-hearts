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
      return players[0];
    } 
    // Retain lead of previous trick winner
    const previousWinnerID = fromHeartsTricks.getTrickWinnerID(previousTrick);
    return players.find(player => player.id === previousWinnerID);
  }
  // If an ongoing trick, get the next player.
  const lastMove = fromHeartsTricks.getLastMove(currentTrick);
  const idx = players.findIndex(p => p.id === lastMove.playerID);
  return players[(idx + 1) % players.length];
}

export const getCurrentPlayerID = (state) => {
  const currentPlayer = getCurrentPlayer(state);
  if (currentPlayer === null) {
    return null;
  }
  return currentPlayer.id;
}

const heartsGame = combineReducers({players: heartsPlayers, rounds: heartsRounds});

export default heartsGame;

export const isRoundComplete = (state) => {
  let playerHand = [];
  for (let playerID of getPlayerIDs(state)) {
    playerHand = getPlayerHand(state, playerID);
    if (playerHand.length > 0) {
      return false;
    }
  }
  return true;
};

export const isTrickComplete = (state) => {
  const players = getPlayers(state);
  const currentTrick = getCurrentTrick(state);
  if (players.length === currentTrick.length) {
    return true;
  }
  return false;
};

export const isGameComplete = (state) => {
  // First check if round is complete..
  if (!isRoundComplete(state)) {
    return false;
  }
  // Check cumulate score for each player.  Return true when scores reach above 100
  const currentScores = getScores(state);
  let sum = [...currentScores[0]].fill(0);
  for (let roundScore of currentScores) {
    for (let s = 0; s < roundScore.length; s++) {
      sum[s] += roundScore[s];
      if (sum[s] > 100) {
        return true;
      }
    }
  }
  return false;
};

// Player selectors
export const getPlayers = (state) => fromHeartsPlayers.getPlayers(state.players);
export const getPlayerIDs = (state) => fromHeartsPlayers.getPlayerIDs(state.players);
export const getPlayerByID = (state, playerID) => fromHeartsPlayers.getPlayerByID(state.players, playerID);
export const getPlayerHand = (state, playerID) => fromHeartsPlayers.getPlayerHand(state.players, playerID);
export const playerHandContainsCard = (state, playerID, card) => fromHeartsPlayers.playerHandContainsCard(state.players, playerID, card)
export const playerHandContainsSuit = (state, playerID, suit) => fromHeartsPlayers.playerHandContainsSuit(state.players, playerID, suit)
export const isPlayerHandOnlyHearts = (state, playerID) => fromHeartsPlayers.isPlayerHandOnlyHearts(state.players, playerID)

// Round selectors
export const getCurrentTrick = (state) => fromHeartsRounds.getCurrentTrick(state.rounds);
export const getCurrentTrickSuit = (state) => fromHeartsRounds.getCurrentTrickSuit(state.rounds);
export const getPreviousTrick = (state) => fromHeartsRounds.getPreviousTrick(state.rounds);
export const getCurrentWinnerID = (state) => fromHeartsRounds.getCurrentWinnerID(state.rounds);
export const getRoundTrickHistory = (state) => fromHeartsRounds.getRoundTrickHistory(state.rounds);
export const isHeartsBroken = (state) => fromHeartsRounds.isHeartsBroken(state.rounds);
export const getScores = (state) => fromHeartsRounds.getScores(state.rounds, getPlayerIDs(state));

// Trick selectors
export const getCurrentTrickPointValue = (state) => fromHeartsTricks.getTrickPointValue(getCurrentTrick(state)); 
