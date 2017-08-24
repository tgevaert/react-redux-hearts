import React from 'react';
import Card from './Card';
import { Slide } from './Slide';

export const Trick = ({ trick, playerIDs, winnerID, POVIndex }) => {
  const directions = ['south', 'west', 'north', 'east'];
  const pnum = playerIDs.length;
  const directionMap = {};
  for (let i = 0; i < playerIDs.length; i++) {
    directionMap[playerIDs[(POVIndex + i) % pnum]] = directions[i];
  }
  const animationDirection = winnerID !== null ? directionMap[winnerID] : '';
  const cards = trick.map(move =>
    <Card
      key={move.card.value + move.card.suit}
      direction={directionMap[move.playerID]}
      card={move.card}
    />
  );
  return (
    <Slide direction={'out'} cardinal={animationDirection}>
      <div className="trick">
        {cards}
      </div>
    </Slide>
  );
};
