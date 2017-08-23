import React from 'react';
import PlayerHand from './PlayerHand';

const HeartsPlayer = ({player, position, cardsHidden = false}) => {
  if (player === undefined) {
    return (
          <div>"Waiting for player..."</div>
    );
  }
  const playerClass = "player";
  const playerClassModifier = playerClass + "--" + position;
  const playerClasses = [playerClass, playerClassModifier].join(" ");

  
  const playerNameClass = playerClass + "__name";
  const playerNameClasses = playerNameClass + (cardsHidden ? "" : ( " " + playerNameClass + "--disabled"));

  return (
      <div className={playerClasses}>
        <div className={playerNameClasses}>{player.name}</div>
        <PlayerHand player={player} cardsHidden={cardsHidden} />
      </div>
  );
}

export default HeartsPlayer;
