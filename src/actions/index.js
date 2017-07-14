import * as fromPlayers from './players';
import * as fromTricks from './tricks';
import * as fromRounds from './rounds';
import { getPlayers, getCurrentPlayerID, getCurrentTrick, playerHandContainsCard, playerHandContainsSuit, getCurrentTrickSuit, isHeartsBroken, isRoundComplete } from '../reducers';

export const addPlayer = (player) => fromPlayers.addPlayer(player);

const isValidMove = (state, playerID, card) => {
  // Does Player possess card
  if (!playerHandContainsCard(state, playerID, card)) {
    return false;
  }

  // Suit to follow
  const suit = getCurrentTrickSuit(state);

  if (suit === null) {
    // Player has the lead
    // Check if hearts broken
    if (card.suit === "H" && !isHeartsBroken(state)) {
      // Need to check if only hearts left in hand
      return false
    }
    return true;
  }

  if (card.suit === suit || !playerHandContainsSuit(state, playerID, suit) ) {
    // Following suit or Can't follow suit
    return true;
  }
  return false;
}

const isTrickComplete = () => {
  return (dispatch, getState) => {
    const state = getState();
    const players = getPlayers(state);
    const currentTrick = getCurrentTrick(state);
    if (players.length === currentTrick.length) {
      dispatch(fromTricks.newTrick());
      return Promise.resolve("Trick Complete!");
    }
    return Promise.reject("Trick Not Complete");
  }
}

const isRoundCompleted = () => {
  return (dispatch, getState) => {
    if (isRoundComplete(getState())) {
      dispatch(fromRounds.newRound());
      return Promise.resolve("Round Complete!");
    }
    return Promise.reject("Round is not complete!");
  }
}

const isGameComplete = () => {
  return (dispatch, getState) => {
    console.log("isGameComplete?");
    return Promise.reject("Game is not complete!");
  }
}

export const playCard = (playerID, card) => {
  // Eventually the control loop will be:
  // Select Cards
  // Pass Cards
  // Play Card
  // Complete Trick
  // Complete Round
  // Complete Game
  return (dispatch, getState) => {
    const state = getState();
    if (getCurrentPlayerID(state) === playerID && isValidMove(state, playerID, card)) {
      dispatch(fromPlayers.playCard(playerID, card));
      dispatch(isTrickComplete())
        .then(() => dispatch(isRoundCompleted()))
        .then(() => dispatch(isGameComplete()))
        .catch((error) => console.log(error));
    }
  }
}

export const deal = () => {
  return (dispatch, getState) => {
    const suits = ["C", "D", "S", "H"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const players = getPlayers(getState());

    for (let s = 0; s < suits.length; s++) {
      for (let v = 0; v < values.length; v++) {
        let card = { value: values[v], suit: suits[s] }
        let index = s*values.length + v
        dispatch(fromPlayers.dealCard(players[index % players.length].id, card));
      }
    }
  }
};

