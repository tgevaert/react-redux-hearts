import React from 'react';
import { connect } from 'react-redux';
import HeartsPlayer from './HeartsPlayer';
import CurrentTrick from './CurrentTrick';
import Toast from './Toast';
import { getPlayers } from '../reducers';

const HeartsGamePresentation = ({ players }) => {
  return (
    <div className="game-table">
      <HeartsPlayer player={players[1]} position={"north"} />
      <div className="row-flex">
        <HeartsPlayer player={players[0]} position={"west"} />
        <div className="game-board">
          <div className="viewport">
            <CurrentTrick />
          </div>
        </div>
        <HeartsPlayer player={players[2]} position={"east"} />
      </div>
      <Toast />
      <HeartsPlayer player={players[3]} position={"south"} />
    </div>
  );
};

export default connect(state => ({ players: getPlayers(state) }))(
  HeartsGamePresentation
);
