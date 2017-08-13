import React from 'react';
import { connect } from 'react-redux';
import { gamePhases, getCurrentPhase } from '../reducers';

const GameOverPresentation = ({ gameOverClass, children }) => {
  return (
    <div className={gameOverClass}>
      <div>
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const gameOverClass =
    'game-over ' + (getCurrentPhase(state) === gamePhases.GAME_END);
  return {
    gameOverClass: gameOverClass
  };
};

const GameOver = connect(mapStateToProps)(GameOverPresentation);

export default GameOver;
