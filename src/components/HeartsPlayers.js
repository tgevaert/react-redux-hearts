import React from 'react';
import { connect } from 'react-redux';
import Well from 'react-bootstrap/lib/Well';
import { PlayerHand } from './PlayerHand';
import { getPlayers, getCurrentPlayerID, isTrickComplete } from '../reducers';

const Player = ({player, isCurrentPlayer}) => {
  const className = "player" + (isCurrentPlayer ? " player-current" : "");
  
  return (
    <div className={className}>
      <li>{player.name} - {player.playerType}</li>
      <PlayerHand player={player} />
    </div>
  )
}

const Players = ({players, currentPlayerID}) => {
  const playerElements = players.map(p => <Player isCurrentPlayer={p.id === currentPlayerID} key={p.id} player={p} />);

  return (
    <div>
      <Well bsSize="small">
        <ul className="list-unstyled">
          {playerElements}
        </ul>
      </Well>
    </div>
  );
}

const mapStateToProps = (state) => ({
  players: getPlayers(state),
  currentPlayerID: isTrickComplete(state) ? null : getCurrentPlayerID(state)
});

export const HeartsPlayers = connect(mapStateToProps, null)(Players);
