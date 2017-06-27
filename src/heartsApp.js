import React from 'react';
import { connect, Provider } from 'react-redux';
import './css/heartsApp.css';
import { getPlayers, getCurrentTrick, getPlayerHand } from './reducers';
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

const PlayerHand = ({player, cards, playCard}) => {
  const cardElements = cards.map(card => <Card key={card} onClickHandler={() => playCard(player.name, card)} card={card} />)
  return (
      <ul>
      {cardElements}
      </ul>
  );
}

const mapStateToPlayerHandProps = (state, { player }) => {
  const playerHand = getPlayerHand(state, player.name);

  return {player, cards: playerHand}
};

const PlayerHandContainer = connect(mapStateToPlayerHandProps, {playCard: actions.playCard})(PlayerHand);

const Player = ({player}) => {
  
  return (
    <div>
      <li>{player.name} - {player.playerType}</li>
      <br />
      <PlayerHandContainer player={player} />
    </div>
  )
}

const Card = ({card, onClickHandler}) => <li onClick={onClickHandler}>{card}</li>;

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
      <Provider store={store}>
        <div>
          <GameTitle title="HEARTS" />
          <GameButton text="DEAL" onClick={() => console.log("CLICK!")} />
          <AddPlayer dispatch={store.dispatch} />
          <Game players={getPlayers(store.getState())} currentTrick={getCurrentTrick(store.getState())} />
      </div>
      </Provider>
  );
}

export default HeartsApp;
