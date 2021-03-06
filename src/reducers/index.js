import { combineReducers } from 'redux';
import heartsPlayers, * as fromHeartsPlayers from './heartsPlayers';
import heartsRounds, * as fromHeartsRounds from './heartsRounds';
import heartsPhases, * as fromHeartsPhases from './heartsPhases';
import heartsUI, * as fromHeartsUI from './heartsUI';
import * as fromHeartsTricks from './heartsTricks';

export const getCurrentPlayer = state => {
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
};

export const getCurrentPlayerID = state => {
  const currentPlayer = getCurrentPlayer(state);
  if (currentPlayer === null) {
    return null;
  }
  return currentPlayer.id;
};

const heartsGame = combineReducers({
  players: heartsPlayers,
  rounds: heartsRounds,
  phase: heartsPhases,
  ui: heartsUI
});

export default heartsGame;

export const isRoundComplete = state => {
  let playerHand = [];
  for (let playerID of getPlayerIDs(state)) {
    playerHand = getPlayerHand(state, playerID);
    if (playerHand.length > 0) {
      return false;
    }
  }
  return true;
};

export const isTrickComplete = state => {
  const players = getPlayers(state);
  const currentTrick = getCurrentTrick(state);
  if (players.length === currentTrick.length) {
    return true;
  }
  return false;
};

export const getScoreTotals = (state) => {
  const currentScores = getScores(state);
  let sum = [...currentScores[0]].fill(0);
  for (let roundScore of currentScores) {
    for (let s = 0; s < roundScore.length; s++) {
      sum[s] += roundScore[s];
    }
  }
  return sum;
}

export const isGameComplete = state => {
  // First check if round is complete..
  if (!isRoundComplete(state)) {
    return false;
  }
  // Check cumulate score for each player.  Return true when scores reach above 100
  const scoreTotals = getScoreTotals(state);
  for (let s = 0; s < scoreTotals.length; s++) {
    if (scoreTotals[s] > 100) {
      return true;
    }
  }
  return false;
};

export const isReadyToPass = state => {
  if (!isCurrentPhase(state, gamePhases.PASSING)) {
    return false;
  }

  const playerIDs = getPlayerIDs(state);

  for (let p = 0; p < playerIDs.length; p++) {
    let selectedCards = getSelectedCards(state, playerIDs[p]);
    if (selectedCards.length !== 3) {
      return false;
    }
  }
  return true;
};

export const getPassDirection = state => {
  const roundNumber = getRoundNumber(state);
  const passDirections = [0, 1, -1, 2];
  return passDirections[roundNumber % passDirections.length];
};

export const getToast = (state) => {
  switch (getCurrentPhase(state)) {
    case gamePhases.GAME_START:
      return "Welcome to Hearts";
    case gamePhases.PASSING:
      const players = getPlayers(state);
      const passDirection = getPassDirection(state);
      const POVIndex = getPOVPlayerIndex(state);
      return "Pass 3 cards to " + players[(POVIndex + passDirection) % players.length].name;
    case gamePhases.PLAYING:
      const currentPlayer = getCurrentPlayer(state);
      return "Waiting for " + currentPlayer.name;
    case gamePhases.GAME_END:
      return "GAME OVER!";
    default:
      return " ";
  }
};

export const getPOVPlayerIndex = state => {
  const playerIDs = getPlayerIDs(state);
  const POVPlayerID = getCurrentPOV(state);
  return playerIDs.indexOf(POVPlayerID);
};

// Player selectors
export const getPlayers = state => fromHeartsPlayers.getPlayers(state.players);
export const getPlayerIDs = state =>
  fromHeartsPlayers.getPlayerIDs(state.players);
export const getPlayerByID = (state, playerID) =>
  fromHeartsPlayers.getPlayerByID(state.players, playerID);
export const getPlayerByName = (state, playerName) =>
  fromHeartsPlayers.getPlayerByName(state.players, playerName);
export const getPlayerHand = (state, playerID) =>
  fromHeartsPlayers.getPlayerHand(state.players, playerID);
export const getSelectedCards = (state, playerID) =>
  fromHeartsPlayers.getSelectedCards(state.players, playerID);
export const playerHandContainsCard = (state, playerID, card) =>
  fromHeartsPlayers.playerHandContainsCard(state.players, playerID, card);
export const playerHandContainsSuit = (state, playerID, suit) =>
  fromHeartsPlayers.playerHandContainsSuit(state.players, playerID, suit);
export const isPlayerHandOnlyHearts = (state, playerID) =>
  fromHeartsPlayers.isPlayerHandOnlyHearts(state.players, playerID);

// Round selectors
export const getCurrentTrick = state =>
  fromHeartsRounds.getCurrentTrick(state.rounds);
export const getCurrentTrickSuit = state =>
  fromHeartsRounds.getCurrentTrickSuit(state.rounds);
export const getPreviousTrick = state =>
  fromHeartsRounds.getPreviousTrick(state.rounds);
export const getCurrentWinnerID = state =>
  fromHeartsRounds.getCurrentWinnerID(state.rounds);
export const getRoundTrickHistory = state =>
  fromHeartsRounds.getRoundTrickHistory(state.rounds);
export const getRoundNumber = state =>
  fromHeartsRounds.getRoundNumber(state.rounds);
export const isHeartsBroken = state =>
  fromHeartsRounds.isHeartsBroken(state.rounds);
export const getScores = state =>
  fromHeartsRounds.getScores(state.rounds, getPlayerIDs(state));

// Trick selectors
export const getCurrentTrickPointValue = state =>
  fromHeartsTricks.getTrickPointValue(getCurrentTrick(state));

// Phase selectors
export const isCurrentPhase = (state, phase) =>
  fromHeartsPhases.isCurrentPhase(state.phase, phase);
export const getCurrentPhase = state =>
  fromHeartsPhases.getCurrentPhase(state.phase);
export const gamePhases = fromHeartsPhases.gamePhases;

// UI selectors
export const getCurrentPOV = (state) => 
  fromHeartsUI.getCurrentPOV(state.ui);
