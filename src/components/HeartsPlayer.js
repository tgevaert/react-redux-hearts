import React from 'react';
import { PlayerHand } from './PlayerHand';

const HeartsPlayer = ({player, position, cardsHidden}) => {
  if (player === undefined) {
    return (
          <div>"Waiting for player..."</div>
    );
  }
  const playerClass = "player " + position;
  return (
      <div className={playerClass}>
        <div className={"name"}>{player.name}</div>
        <PlayerHand player={player} cardsHidden={cardsHidden} />
      </div>
  );
}

export default HeartsPlayer;
