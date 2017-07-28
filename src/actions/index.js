import * as fromPlayers from './players';
import * as fromTricks from './tricks';
import * as fromRounds from './rounds';
import { getPlayers, getCurrentPlayerID, getCurrentTrick, playerHandContainsCard, playerHandContainsSuit, getCurrentTrickSuit, isHeartsBroken, isRoundComplete, isGameComplete } from '../reducers';
import { AIplayRandomCard } from '../ai';

export const addPlayer = (player, playerType = "Human") => fromPlayers.addPlayer(player, playerType);

const delayedDispatch = (delay, dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dispatch()), delay);
  });
}

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
      return delayedDispatch(1000, () => dispatch(fromTricks.newTrick()))
        .then(() => Promise.reject("Trick Complete!"));
    }
    return Promise.resolve("Trick Not Complete");
  }
}

const isRoundCompleted = () => {
  return (dispatch, getState) => {
    if (isRoundComplete(getState())) {
      return delayedDispatch(1000, () => dispatch(fromRounds.newRound()))
               .then(() => Promise.reject("Round Complete!"));
    }
    return Promise.resolve("Round is not complete!");
  }
}

const isGameCompleted = () => {
  return (dispatch, getState) => {
    console.log("isGameComplete?");
    if (isGameComplete(getState())) {
      return Promise.reject("Game is complete");
    } else {
      return Promise.resolve("Game is not complete!");
    }
  }
}

const computerMove = () => {
  return (dispatch, getState) => {
    const state = getState();
    const currentPlayerID = getCurrentPlayerID(state);
    const nextCard = AIplayRandomCard(state, currentPlayerID);
    return delayedDispatch(1000, () => dispatch(playCard(currentPlayerID, nextCard)));
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
      dispatch(isGameCompleted())
        .then(() => dispatch(isRoundCompleted()))
        .then(() => dispatch(isTrickComplete()))
        .then(() => dispatch(computerMove()))
        .catch((error) => console.log(error));
      return Promise.resolve("Played Card Success!");
    } else {
      return Promise.reject("Invalid Card Played.");
    }
  }
}

const randomPop = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
}

export const deal = () => {
  return (dispatch, getState) => {
    const suits = ["C", "D", "S", "H"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const players = getPlayers(getState());
    let deck = [];

    for (let s = 0; s < suits.length; s++) {
      for (let v = 0; v < values.length; v++) {
        deck.push({ value: values[v], suit: suits[s] });
      }
    }

    const deckSize = deck.length;

    for (let d = 0; d < deckSize; d++) {
      dispatch(fromPlayers.dealCard(players[d % players.length].id, randomPop(deck)));
    }
  }
};

