import React from 'react';
import { connect } from 'react-redux';
import { newGame } from '../actions';

const DealButtonPresentation = ({handleClick}) => {
  return (
      <button onClick={handleClick}>New Game</button>
  );
};

export const DealButton = connect(null, {handleClick: newGame})(DealButtonPresentation);
