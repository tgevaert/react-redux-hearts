import React from 'react';
import HeartsGame from './HeartsGame';
import { Score } from './Score';
import GameOver from './GameOver';
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

const HeartsRoot = () => {
  return (
    <div className="heartsRootContainer">
      <div className="nav">
        <GameTitle title="Hearts" />
        <div className="nav-right">
          <a href="http://github.com/tgevaert/react-redux-hearts">Github</a>
        </div>
      </div>
      <GameOver>
        <DealButton />
        <Score />
      </GameOver>
      <HeartsGame />
    </div>
  );
};

export default HeartsRoot;
