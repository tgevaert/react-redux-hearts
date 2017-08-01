import React from 'react';
import Card from './Card';

export const Trick = ({trick, playerIDs}) => {
  const directions = ["west", "north", "east", "south"];
  const directionMap = {};
  for (let i = 0; i < playerIDs.length; i++) {
    directionMap[playerIDs[i]] = directions[i];
  }
  const cards = trick.map(move => <Card 
                                    key={move.card.value + move.card.suit} 
                                    direction={directionMap[move.playerID]} 
                                    card={move.card} />);
  return (
    <div className="trick">
        {cards}
    </div>
  );
};
