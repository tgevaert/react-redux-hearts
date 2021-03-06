import {
  getPlayerHand,
  getCurrentTrickSuit,
  getSelectedCards,
  playerHandContainsSuit,
  isHeartsBroken
} from '../reducers';

const getRandomElement = array => {
  const max = array.length;
  const ri = Math.floor(Math.random() * max);
  return array[ri];
};

const AIplayRandomCard = (state, playerID) => {
  const hand = getPlayerHand(state, playerID);
  const suit = getCurrentTrickSuit(state);
  const hasLead = suit === null;
  const followSuit = playerHandContainsSuit(state, playerID, suit);
  const brokenHearts = isHeartsBroken(state);

  let cardPool = [];

  if (followSuit) {
    cardPool = hand.filter(card => card.suit === suit);
  } else if (hasLead && !brokenHearts) {
    cardPool = hand.filter(card => card.suit !== 'H');
    if (cardPool.length === 0) {
      // Only hearts left in hand
      cardPool = hand;
    }
  } else {
    cardPool = hand;
  }

  return getRandomElement(cardPool);
};

export const aiPassChoice = (state, playerID) => {
  const hand = getPlayerHand(state, playerID);
  const selectedCards = getSelectedCards(state, playerID);
  const cardPool = hand.filter(
    card =>
      selectedCards.findIndex(
        sc => sc.suit === card.suit && sc.value === card.value
      ) === -1
  );
  return getRandomElement(cardPool);
};

export default AIplayRandomCard;
