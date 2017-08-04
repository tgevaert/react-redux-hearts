import React from 'react';
import { connect } from 'react-redux';
import { isGameComplete } from '../reducers';

const GameOverPresentation = ({gameOverClass, children}) => {
  return (
      <div className={gameOverClass}>
        <div>
          {children}
        </div>
      </div>
  );
}

const mapStateToProps = (state) => {
  const gameOverClass = isGameComplete(state) ? "game-over" : "";
  return {
    gameOverClass: gameOverClass
  };
};

const GameOver = connect(mapStateToProps)(GameOverPresentation);

export default GameOver;
