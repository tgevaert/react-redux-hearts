import React from 'react';
import { constants as heartsConstants } from '../heartsRules';

const Card = ({card, onClickHandler, direction}) => {
  const {value, suit} = card;
  const className = "card" + (direction !== undefined ? " " + direction : "");
  
  return (
    <div className={className} onClick={onClickHandler} style={{color: heartsConstants.cardSuits[suit].colour}}>{value}{" "}{heartsConstants.cardSuits[suit].symbol}</div>
  )
}

export default Card;