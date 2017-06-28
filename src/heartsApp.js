import React from 'react';
import { connect, Provider } from 'react-redux';
import './css/heartsApp.css';
import { getPlayers, getCurrentTrick, getPlayerHand, getCurrentWinner, getCurrentPlayer, getCurrentTrickPointValue } from './reducers';
import { constants as heartsConstants } from './heartsRules';
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
  const cardElements = cards.map(card => <Card key={card.value + card.suit} onClickHandler={() => playCard(player.name, card)} card={card} />)
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

const Card = ({card, onClickHandler}) => {
  let {value, suit} = card;
  return (
    <span onClick={onClickHandler}>{value}{heartsConstants.cardSuits[suit].symbol}</span>
  )
}

const CurrentTrick = ({currentTrick}) => {
  const cards = currentTrick.map(trick => <Card key={trick.card.value + trick.card.suit} card={trick.card} />);
  return (<div>
          {cards}
          </div>);
};

const Game = ({players, currentTrick, currentWinner, currentPlayer, currentTrickPointValue}) => {

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
        <h2>Current Trick Point Value:</h2>
          {currentTrickPointValue}
        <h2>Currently Winning:</h2>
          {currentWinner ? currentWinner : "Nobody"}
        <h2>Waiting for:</h2>
          {currentPlayer ? currentPlayer : "Nobody"}
      </div>

  )
};

let AddPlayer = ({addPlayer}) => {
  let playerName = null;

  return (
      <div>
        <input type="text" ref={(input) => {playerName = input;}} />
        <button onClick={() => addPlayer(playerName.value)}>Add Player</button>
        <br />
      </div>
  );
}

AddPlayer = connect(null, {addPlayer: actions.addPlayer})(AddPlayer);

const HeartsApp = ({store}) => {
  return (
      <Provider store={store}>
        <div>
          <GameTitle title="HEARTS" />
          <AddPlayer />
          <GameButton text="DEAL" onClick={() => store.dispatch(actions.deal())} />
          <Game players={getPlayers(store.getState())} currentTrick={getCurrentTrick(store.getState())} currentTrickPointValue={getCurrentTrickPointValue(store.getState())} currentWinner={getCurrentWinner(store.getState())} currentPlayer={getCurrentPlayer(store.getState())} />
      </div>
      </Provider>
  );
}

export default HeartsApp;
