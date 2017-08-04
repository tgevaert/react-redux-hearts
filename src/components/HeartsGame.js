import React from 'react';
import { HeartsPlayers } from './HeartsPlayers';
import CurrentTrick from './CurrentTrick';

export const HeartsGame = () => {
  return (
      <div>
        <div className="game-board">
          <CurrentTrick /> 
        </div>
        <HeartsPlayers />
      </div>
  )
};
