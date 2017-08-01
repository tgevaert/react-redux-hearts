import * as fromPlayers from './players';
import * as fromTricks from './tricks';
import * as fromRounds from './rounds';
import { getPlayers, getCurrentPlayerID, getCurrentPlayer, getCurrentTrick, playerHandContainsCard, playerHandContainsSuit, getCurrentTrickSuit, isHeartsBroken, isTrickComplete, isRoundComplete, isGameComplete } from '../reducers';
import { AIplayRandomCard } from '../ai';

export const addPlayer = (player, playerType = "Human") => fromPlayers.addPlayer(player, playerType);

const MOVE_DELAY = 350; // ms

const delayedPromise = (delay, dispatch) => {
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

const computerMove = () => {
  return (dispatch, getState) => {
    const state = getState();
    const currentPlayer = getCurrentPlayer(state);
    if (currentPlayer.playerType === "Human") {
      return Promise.resolve("Waiting for human.");
    } else {
      const nextCard = AIplayRandomCard(state, currentPlayer.id);
      return delayedPromise(MOVE_DELAY, () => dispatch(playCard(currentPlayer.id, nextCard)));
    }
  }
}

const gameTick = () => {
  // Eventually the control loop will be:
  // Select Cards
  // Pass Cards
  // Play Card
  // Complete Trick
  // Complete Round
  // Complete Game
  return (dispatch, getState) => {
    const state = getState();
    let nextAction = null;
    if (isGameComplete(state)) {
      nextAction = null;
    } else if (isRoundComplete(state)) {
      nextAction = fromRounds.newRound;
    } else if (isTrickComplete(state)) {
      nextAction = fromTricks.newTrick;
    } 

    if (nextAction !== null) {
      delayedPromise(MOVE_DELAY, () => dispatch(nextAction())).then(() => dispatch(computerMove()));
    } else {
      dispatch(computerMove());
    }
  }
}

export const playCard = (playerID, card) => {
  return (dispatch, getState) => {
    const state = getState();
    if (getCurrentPlayerID(state) === playerID && isValidMove(state, playerID, card)) {
      // Play card, and tick over the game state
      dispatch(fromPlayers.playCard(playerID, card));
      // If Playing local game, client must tick over game state, rather than wait for server action.
      dispatch(gameTick());
      return Promise.resolve("Played Card Success!");
    } else {
      // Invalid card or playing out of turn.
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

