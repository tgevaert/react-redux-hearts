import React from 'react';
import HeartsGame from './HeartsGame';
import { Score } from './Score';
import GameOver from './GameOver';
import { DealButton } from './DealButton';

const GameTitle = ({title}) => {
  return (
    <div className={"game-title"}>
      <h1>{title}</h1>
    </div>
  );
}

const HeartsRoot = () => {
  return (
    <div>
      <GameTitle title="Hearts" />
      <div className="jumbotron">
        <HeartsGame />
        <GameOver>
          <DealButton />
          <Score />
        </GameOver>
      </div>
    </div>
  );
}

export default HeartsRoot;
