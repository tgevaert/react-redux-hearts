import React from 'react';
import { constants as heartsConstants } from '../heartsRules';

const CardValue = ({ value }) => (
    <div className="card__value">
      {value}
    </div>
);

const CardSymbol = ({ symbol }) => (
    <div className="card__symbol">
      {symbol}
    </div>
);


const Card = ({ card, onClickHandler, direction, overturned = false, toggled = false }) => {
  const { value, suit } = card;
  const className =
    'card' +
    (direction !== undefined ? ' ' + direction : '') +
    (toggled ? ' card--toggled' : '') +
    (overturned? ' card--overturned' : '');

  const contents = overturned ? [] : [<CardValue key="value" value={value} />, <CardSymbol key="symbol" symbol={heartsConstants.cardSuits[suit].symbol} />];

  return (
    <div
      className={className}
      onClick={onClickHandler}
      style={{ color: heartsConstants.cardSuits[suit].colour }}
    >
      {contents}
    </div>
  );
};

export default Card;
