import React from 'react';
import { connect } from 'react-redux';
import { deal } from '../actions';

const DealButtonPresentation = ({handleClick}) => {
  return (
      <button onClick={handleClick}>DEAL!</button>
  );
};

export const DealButton = connect(null, {handleClick: deal})(DealButtonPresentation);
