import React from 'react';
import './css/heartsApp.css';
import { getPlayers, getCurrentTrick } from './reducers';
import * as actions from './actions';

const GameTitle = ({title}) => {
  return (
    <h1>{title}</h1>
  );
}

const GameButton = ({text, onClick}) => {
  return (
      <button onClick={onClick}>{text}</button>
  );
};

const Player = ({player}) => <li>{player.name} - {player.playerType}</li>;

const Card = ({card}) => <li>{card.player} - {card.card}</li>;

const CurrentTrick = ({currentTrick}) => {
  const cards = currentTrick.map(card => <Card key={card.card} card={card} />);
  return (<div>{cards}</div>);
};

const Game = ({players, currentTrick}) => {

  const playerElements = players.map(p => <Player key={p.name} player={p} />);

  return (
      <div>
        <h2>Players:</h2>
          <ul>
            {playerElements}
          </ul>
        <br />
        <h2>Current Trick:</h2>
          <ul>
            <CurrentTrick currentTrick={currentTrick} />
          </ul>
      </div>

  )
};

const HeartsApp = ({store}) => {
  return (
    <div>
      <GameTitle title="HEARTS" />
      <GameButton text="DEAL" onClick={() => console.log("CLICK!")} />
      <Game players={getPlayers(store.getState())} currentTrick={getCurrentTrick(store.getState())} />
    </div>
  );
}

export default HeartsApp;
