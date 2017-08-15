import React from 'react';
import { PlayerHand } from './PlayerHand';

const HeartsPlayer = ({player, position}) => {
  if (player === undefined) {
    return (
          <div>"Waiting for player..."</div>
    );
  }
  const playerClass = "player " + position;
  return (
      <div className={playerClass}>
        <div className={"name"}>{player.name}</div>
        <PlayerHand player={player} />
      </div>
  );
}

export default HeartsPlayer;
