import { constants as heartsConstants } from '../heartsRules';
import { getTrickWinnerID, getTrickPointValue } from '../reducers/heartsTricks';

const cardCost = card => {
  // Cost of keeping a card
  // Higher cost implies that the card is more likely to result in winning points
  // Keeping a Q of Spades is bad.  Keeping an A of hearts is bad.  Keeping a 2 of Clubs is good.
  // Cost 2C < AH < QS
  return (
    heartsConstants.cardValues[card.value].rank +
    heartsConstants.pointValue(card)
  );
};

const handCost = cards => {
  return cards.reduce((sum, card) => sum + cardCost(card), 0);
};

const trickCost = (trick, playerID) => {
  if (getTrickWinnerID(trick) !== playerID) {
    return 0;
  }
  return getTrickPointValue(trick);
}

export const selectCardToPlay = (cardPool, trick) => {
  let bestCard = null;
  let lowestCost = 100000;
  let dummyPlayerID = "placeholder";
  for (let i = 0; i < cardPool.length; i++) {
    let trialHand = cardPool.filter(card => card !== cardPool[i]);
    let cost = handCost(trialHand);
    if (trick.length !== 0) { // No Lead
      let trialTrick = [...trick, {card: cardPool[i], playerID: dummyPlayerID}];
      cost += 100*trickCost(trialTrick, dummyPlayerID);
    } else { // Has Lead
      cost += 100*heartsConstants.pointValue(cardPool[i]);
    }
    if (cost < lowestCost) {
      lowestCost = cost;
      bestCard = cardPool[i];
    }
  }

  return bestCard;
};
