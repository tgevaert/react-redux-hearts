import * as fromPlayers from './players';
import * as fromTricks from './tricks';
import { getPlayers, getCurrentPlayer, getCurrentTrick, playerHandContainsCard, playerHandContainsSuit, getCurrentTrickSuit, isHeartsBroken } from '../reducers';

export const addPlayer = (player) => fromPlayers.addPlayer(player);

const isValidMove = (state, player, card) => {
  // Does Player possess card
  if (!playerHandContainsCard(state, player, card)) {
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

  if (card.suit === suit || !playerHandContainsSuit(state, player, suit) ) {
    // Following suit or Can't follow suit
    return true;
  }
  return false;
}

export const playCard = (player, card) => {
  return (dispatch, getState) => {
    const state = getState();
    if (getCurrentPlayer(state) === player && isValidMove(state, player, card)) {
      dispatch(fromPlayers.playCard(player, card));
      const newState = getState();
      const players = getPlayers(newState);
      const currentTrick = getCurrentTrick(newState);
      if (players.length === currentTrick.length) {
        dispatch(fromTricks.newTrick());
      }
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
        dispatch(fromPlayers.dealCard(players[index % players.length].name, card));
      }
    }
  }
};

