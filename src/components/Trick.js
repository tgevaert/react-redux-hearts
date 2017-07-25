import React from 'react';
import Card from './Card';

export const Trick = ({trick}) => {
  const direction = ["north", "east", "south", "west"];
  let d = 0;
  const cards = trick.map(move => <Card key={move.card.value + move.card.suit} direction={direction[d++]} card={move.card} />);
  return (<div className="trick">
          {cards}
          </div>);
};
