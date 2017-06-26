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

const PlayerHand = ({cards}) => {
  const cardElements = cards.map(card => <Card key={card} card={card} />)
  return (
      <ul>
      {cardElements}
      </ul>
  );
}

const Player = ({player}) => {
  
  return (
    <div>
      <li>{player.name} - {player.playerType}</li>
      <br />
      <PlayerHand cards={player.playerHand} />
    </div>
  )
}

const Card = ({card}) => <li>{card}</li>;

const CurrentTrick = ({currentTrick}) => {
  const cards = currentTrick.map(trick => <Card key={trick.card} card={trick.card} />);
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

const AddPlayer = ({dispatch}) => {
  let playerName = null;

  return (
      <div>
        <input type="text" ref={(input) => {playerName = input;}} />
        <button onClick={() => dispatch(actions.addPlayer({name: playerName.value}))}>Add Player</button>
        <br />
      </div>
  );
}

const HeartsApp = ({store}) => {
  return (
    <div>
      <GameTitle title="HEARTS" />
      <GameButton text="DEAL" onClick={() => console.log("CLICK!")} />
      <AddPlayer dispatch={store.dispatch} />
      <Game players={getPlayers(store.getState())} currentTrick={getCurrentTrick(store.getState())} />
    </div>
  );
}

export default HeartsApp;
