import React from 'react';
import HeartsGame from './HeartsGame';
import { Score } from './Score';
import GameOver from './GameOver';
import ScoreGraph from './ScoreGraph';
import { DealButton } from './DealButton';

const GameTitle = ({ title }) => {
  return (
    <div className={'game-title'}>
      <h1>
        {title}
      </h1>
    </div>
  );
};
//      <GameOver>
//        <DealButton />
//        <Score />
//      </GameOver>

const HeartsRoot = () => {
  return (
    <div className="heartsRootContainer">
      <div className="nav">
        <GameTitle title="Hearts" />
        <div className="nav-right">
          <a href="http://github.com/tgevaert/react-redux-hearts">Github</a>
        </div>
      </div>
      <ScoreGraph />
      <HeartsGame />
    </div>
  );
};

export default HeartsRoot;
