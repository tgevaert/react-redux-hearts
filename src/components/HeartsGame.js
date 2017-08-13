import React from 'react';
import { connect } from 'react-redux';
import { HeartsPlayers } from './HeartsPlayers';
import CurrentTrick from './CurrentTrick';
import { PlayerHand } from './PlayerHand';
import { getPlayers } from '../reducers';

const HeartsGamePresentation = ({ players }) => {
  let playerComponents = [];
  if (players.length < 4) {
    playerComponents = [<br />, <br />, <br />, <br />];
  } else {
    playerComponents = players.map(player => <PlayerHand player={player} />);
  }

  return (
    <div className="game-table">
      <div className="north-player">
        {playerComponents[1]}
      </div>
      <div className="row-flex">
        <div className="west-player">
          {playerComponents[0]}
        </div>
        <div className="game-board">
          <div className="viewport">
            <CurrentTrick />
          </div>
        </div>
        <div className="east-player">
          {playerComponents[2]}
        </div>
      </div>
      <div className="south-player">
        {playerComponents[3]}
      </div>
    </div>
  );
};

export default connect(state => ({ players: getPlayers(state) }))(
  HeartsGamePresentation
);
