import { constants } from '../heartsRules';

export const getCurrentTrick = (state) => state[0];
export const getPreviousTrick = (state) => {
  if (state.length > 1) {
    return state[1];
  } else {
    return [];
  }
};

export const getCompletedTricks = (state) => state.slice(1);
export const getLastMove = (trick) => trick[trick.length-1];

const heartsTricks = (state = [[]], action) => {
  switch (action.type) {
    case "PLAY_CARD":
      const currentTrick = getCurrentTrick(state);
      const newTrick = [...currentTrick, {
        card: action.card, 
        player: action.player
      }];
      const nextState = [newTrick, ...state.slice(1)];
      return nextState;
    case "NEW_TRICK":
      return [[], ...state];
    default:
      return state;
  }
};

const getCardSuit = (card) => {
  return card.suit;
}

export const getTrickSuit = (trick) => {
  return getCardSuit(trick[0].card);
}

export const getTrickWinner = (trick) => {
  let winningPlayer = null, winningCard = null;
  winningCard = trick[0].card;
  winningPlayer = trick[0].player;
  const suit = getTrickSuit(trick);
  for (let c = 0; c < trick.length; c++) {
    let {card, player} = trick[c];
    if (suit === getCardSuit(card) &&
        constants.cardValues[card.value].rank > constants.cardValues[winningCard.value].rank) {
      winningCard = card;
      winningPlayer = player;
    }
  }
  return winningPlayer;
}

export const getCurrentWinner = (state) => {
  const currentTrick = getCurrentTrick(state);
  if (!currentTrick.length) {
    return null;
  }
  return getTrickWinner(currentTrick);
}

export default heartsTricks;
