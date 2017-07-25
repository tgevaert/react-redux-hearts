import React from 'react';
import { HeartsPlayers } from './HeartsPlayers';
import CurrentTrick from './CurrentTrick';

export const HeartsGame = () => {
  return (
      <div>
        <CurrentTrick /> 
        <HeartsPlayers />
      </div>
  )
};
