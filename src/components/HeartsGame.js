import React from 'react';
import { connect } from 'react-redux';
import HeartsPlayer from './HeartsPlayer';
import CurrentTrick from './CurrentTrick';
import Toast from './Toast';
import { getPlayers, getPOVPlayerIndex } from '../reducers';

const HeartsGamePresentation = ({ players, POVindex }) => {
  const pnum = players.length;

  return (
    <div className="game-table">
      <HeartsPlayer player={players[(POVindex + 2) % pnum]} position={"north"} cardsHidden={true} />
      <div className="row-flex">
        <HeartsPlayer player={players[(POVindex + 1) % pnum]} position={"west"} cardsHidden={true} />
        <div className="game-board">
          <div className="viewport">
            <CurrentTrick />
          </div>
        </div>
        <HeartsPlayer player={players[(POVindex + 3) % pnum]} position={"east"} cardsHidden={true} />
      </div>
      <Toast />
      <HeartsPlayer player={players[POVindex]} position={"south"} />
    </div>
  );
};

export default connect(state => ({ players: getPlayers(state), POVindex: getPOVPlayerIndex(state) }))(
  HeartsGamePresentation
);
