import { getCurrentTrick, getPlayerHand, getCurrentTrickSuit, getCurrentTrickValue, playerHandContainsSuit } from '../reducers'
import { constants as heartsConstants } from '../heartsRules';

const cardCost = (card) => {
  // Cost of keeping a card
  // Higher cost implies that the card is more likely to result in winning points
  // Keeping a Q of Spades is bad.  Keeping an A of hearts is bad.  Keeping a 2 of Clubs is good.
  return heartsConstants.cardValues[card.value].rank + heartsConstants.pointValue(card);
}

const getRandomElement = (array) => {
  const max = array.length;
  const ri = Math.floor(Math.random() * max);
  return array[ri];
}

export const AIplayCard = (state, playerID) => {
  const hand = getPlayerHand(state);
  const trick = getCurrentTrick(state);
  const suit = getCurrentTrickSuit(state);
  const followSuit = playerHandContainsSuit(state, playerID, suit);

  let bestCard = null;
  let lowestCost = 100000;
  let cardPool = [];

  if (followSuit) {
    cardPool = hand.filter((card) => { return card.suit === suit; });
  } else {
    cardPool = hand;
  }

  for (let card of cardPool) {
  }

  return bestCard;
}

export const AIplayRandomCard = (state, playerID) => {
  const hand = getPlayerHand(state, playerID);
  const suit = getCurrentTrickSuit(state);
  const followSuit = playerHandContainsSuit(state, playerID, suit);
  console.log("Follow Suit: " + followSuit);

  let cardPool = [];

  if (followSuit) {
    cardPool = hand.filter((card) => { return card.suit === suit; });
  } else {
    cardPool = hand;
  }

  return getRandomElement(cardPool);
}
