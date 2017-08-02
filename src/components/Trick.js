import React from 'react';
import Card from './Card';
import { Slide } from './Slide';

export const Trick = ({trick, playerIDs, winnerID}) => {
  const directions = ["west", "north", "east", "south"];
  const directionMap = {};
  for (let i = 0; i < playerIDs.length; i++) {
    directionMap[playerIDs[i]] = directions[i];
  }
  const animationDirection = (winnerID !== null) ? directionMap[winnerID] : "";
  const cards = trick.map(move => <Card 
                                      key={move.card.value + move.card.suit} 
                                      direction={directionMap[move.playerID]} 
                                      card={move.card} />);
  return (
  <Slide direction={"out"} cardinal={animationDirection}>
    <div className="trick">
        {cards}
    </div>
  </Slide>
  );
};
