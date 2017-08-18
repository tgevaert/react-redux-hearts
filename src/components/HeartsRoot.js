import React from 'react';
import { connect } from 'react-redux';
import HeartsGame from './HeartsGame';
import ScoreGraph from './ScoreGraph';
import GameOver from './GameOver';
import NewGame from './NewGameButton';
import SourceButton from './SourceButton';
import { gamePhases, getCurrentPhase } from '../reducers';


const GameTitle = ({ title }) => {
  return (
    <div className={'game-title'}>
      <h1>
        {title}
      </h1>
    </div>
  );
};

const HeartsRootPresentation = ({isGameOver}) => {
  let viewComponents = [];
  if (!isGameOver) {
    viewComponents = [<ScoreGraph key="graph" />, <HeartsGame key="game" />]
  } else {
    viewComponents = [<GameOver key="gameover" />];
  }

  return (
    <div className="heartsGameContainer">
      <div className="nav">
        <GameTitle title="Hearts" />
        <NewGame />
        <div className="nav-right">
          <SourceButton />
        </div>
      </div>
      <div className="content">
        { viewComponents }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ isGameOver: (getCurrentPhase(state) === gamePhases.GAME_END) });

export default connect(mapStateToProps)(HeartsRootPresentation);
