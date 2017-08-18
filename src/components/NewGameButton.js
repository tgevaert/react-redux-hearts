import React from 'react';
import { connect } from 'react-redux';
import { newGame } from '../actions';
import HeartsButton from './HeartsButton';

const DealButtonPresentation = ({ handleClick }) => {
  return <HeartsButton onClick={handleClick}>New Game</HeartsButton>;
};

export default connect(null, { handleClick: newGame })(DealButtonPresentation);
