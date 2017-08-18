import React from 'react';
import Toast from './Toast';
import ScoreTable from './ScoreTable';

const GameOverPresentation = () => {
  return (
    <div className={"game-over slide-in-south"}>
      <div className={"game-over__row"}>
        <Toast />
      </div>
      <div className={"game-over__row"}>
        <ScoreTable />
      </div>
    </div>
  );
};

export default GameOverPresentation;
