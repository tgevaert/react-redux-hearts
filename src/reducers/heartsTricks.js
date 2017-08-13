import { constants as heartsConstants } from '../heartsRules';
import * as fromHeartsPlayers from './heartsPlayers';

// Action Types

export const NEW_TRICK = 'NEW_TRICK';

// Reducer

const heartsTricks = (state = [[]], action) => {
  switch (action.type) {
    case fromHeartsPlayers.PLAY_CARD:
      const currentTrick = getCurrentTrick(state);
      const newTrick = [
        ...currentTrick,
        {
          card: action.card,
          playerID: action.playerID
        }
      ];
      const nextState = [newTrick, ...state.slice(1)];
      return nextState;
    case NEW_TRICK:
      return [[], ...state];
    default:
      return state;
  }
};

// Selectors

export const getCurrentTrick = state => state[0];
export const getPreviousTrick = state => {
  if (state.length > 1) {
    return state[1];
  } else {
    return [];
  }
};

export const getCompletedTricks = state => state.slice(1);
export const getLastMove = trick => trick[trick.length - 1];

const getCardSuit = card => {
  return card.suit;
};

export const getTrickSuit = trick => {
  if (!trick.length) {
    return null;
  }
  return getCardSuit(trick[0].card);
};

export const getTrickWinnerID = trick => {
  let winningPlayerID = null,
    winningCard = null;
  winningCard = trick[0].card;
  winningPlayerID = trick[0].playerID;
  const suit = getTrickSuit(trick);
  for (let c = 0; c < trick.length; c++) {
    let { card, playerID } = trick[c];
    if (
      suit === getCardSuit(card) &&
      heartsConstants.cardValues[card.value].rank >
        heartsConstants.cardValues[winningCard.value].rank
    ) {
      winningCard = card;
      winningPlayerID = playerID;
    }
  }
  return winningPlayerID;
};

export const getCurrentWinnerID = state => {
  const currentTrick = getCurrentTrick(state);
  if (!currentTrick.length) {
    return null;
  }
  return getTrickWinnerID(currentTrick);
};

export const getTrickPointValue = trick =>
  trick.reduce((acc, move) => acc + heartsConstants.pointValue(move.card), 0);

export default heartsTricks;
