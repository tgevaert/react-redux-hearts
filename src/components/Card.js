import React from 'react';
import { constants as heartsConstants } from '../heartsRules';

const Card = ({ card, onClickHandler, direction, overturned = false, toggled = false }) => {
  const { value, suit } = card;
  const className =
    'card' +
    (direction !== undefined ? ' ' + direction : '') +
    (toggled ? ' toggled' : '') +
    (overturned? ' overturned' : '');

  const text = overturned ? '' : value + ' ' + heartsConstants.cardSuits[suit].symbol;

  return (
    <div
      className={className}
      onClick={onClickHandler}
      style={{ color: heartsConstants.cardSuits[suit].colour }}
    >
      {text}
    </div>
  );
};

export default Card;
