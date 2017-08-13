import React from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../actions';

const AddPlayerPresentation = ({ handleClick }) => {
  let playerName = null;

  return (
    <div>
      <input
        type="text"
        ref={input => {
          playerName = input;
        }}
      />
      <button onClick={() => handleClick(playerName.value)}>Add Player</button>
      <br />
    </div>
  );
};

export const AddPlayer = connect(null, { handleClick: addPlayer })(
  AddPlayerPresentation
);
