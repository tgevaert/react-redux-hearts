import React from 'react';
import { connect, Provider } from 'react-redux';
import './css/heartsApp.css';
import { Table, Well, Grid, Row, PageHeader, Jumbotron } from 'react-bootstrap';
import { getPlayers, getCurrentTrick, getPreviousTrick, getPlayerHand, getCurrentWinner, getCurrentPlayer, getCurrentTrickPointValue, getRoundTrickHistory } from './reducers';
import { constants as heartsConstants } from './heartsRules';
import * as actions from './actions';

const GameTitle = ({title}) => {
  return (
    <PageHeader>{title}</PageHeader>
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
      <div className="hand">
        {cardElements}
      </div>
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

const Card = ({card, onClickHandler, direction}) => {
  const {value, suit} = card;
  const className = "card" + (direction !== undefined ? " " + direction : "");
  
  return (
    <div className={className} onClick={onClickHandler} style={{color: heartsConstants.cardSuits[suit].colour}}>{value}{" "}{heartsConstants.cardSuits[suit].symbol}</div>
  )
}

const Trick = ({trick}) => {
  const direction = ["north", "east", "south", "west"];
  let d = 0;
  const cards = trick.map(move => <Card key={move.card.value + move.card.suit} direction={direction[d++]} card={move.card} />);
  return (<div className="trick">
          {cards}
          </div>);
};

const TrickHistory = ({tricks = []}) => {
  let trickElements = tricks.map(trick => <li key={trick.reduce((acc, move) => acc + move.card.value + move.card.suit)}><Trick trick={trick} /></li>);

  return (<ul>
          {trickElements}
          </ul>);
}

const mapStateToTrickHistoryProps = (state) => ({tricks: getRoundTrickHistory(state)});

const TrickHistoryContainer = connect(mapStateToTrickHistoryProps)(TrickHistory);

const ScoreTable = ({players, scores}) => {
  const sum = [...players].fill(0);
  for (let score of scores){
    for (let s = 0; s < score.length; s++) {
      sum[s] += score[s];
    }
  }
  const tableHeading = players.map(p => <th key={p} className={"col-md-3"}>{p}</th>);
  const tableRows = scores.map(scoreRow => <tr>{scoreRow.map(score => <td className={"col-md-3"}>{score}</td>)}</tr>)

  return (
      <Table>
        <thead>
          <tr>
            {tableHeading}
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
        <thead>
          <tr>
            {sum.map((s) => <th>{s}</th>)}
          </tr>
        </thead>

      </Table>
      )
  
  
}

const mapStateToScoreProps = (getState) => (
    {
      players: ["Bob", "Doug", "Bill", "Ted"],
      scores: [
        [0, 5, 5, 16],
        [0, 5, 5, 16]
      ]
});

const ScoreContainer = connect(mapStateToScoreProps)(ScoreTable);

const Game = ({players, currentTrick, previousTrick, currentWinner, currentPlayer, currentTrickPointValue}) => {

  const playerElements = players.map(p => <Player key={p.name} player={p} />);

  return (
      <div>
        <h2>Players:</h2>
          <Well bsSize="small">
            <ul>
              {playerElements}
            </ul>
          </Well>
        <br />
        <h2>Current Trick:</h2>
          <Trick trick={currentTrick} />
        <h2>Previous Trick:</h2>
          <Trick trick={previousTrick} />
        <h2>Current Trick Point Value:</h2>
          {currentTrickPointValue}
        <h2>Currently Winning:</h2>
          {currentWinner ? currentWinner : "Nobody"}
        <h2>Waiting for:</h2>
          {currentPlayer ? currentPlayer : "Nobody"}
        <h2>Trick History:</h2>
        <TrickHistoryContainer />
        <h2>Scores:</h2>
        <ScoreContainer />
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
        <Grid>
          <Row>
            <GameTitle title="Hearts" />
          </Row>
          <Row>
          <Jumbotron>
            <AddPlayer />
            <GameButton text="DEAL" onClick={() => store.dispatch(actions.deal())} />
            <Game players={getPlayers(store.getState())} currentTrick={getCurrentTrick(store.getState())} previousTrick={getPreviousTrick(store.getState())} currentTrickPointValue={getCurrentTrickPointValue(store.getState())} currentWinner={getCurrentWinner(store.getState())} currentPlayer={getCurrentPlayer(store.getState())} />
          </Jumbotron>
          </Row>
        </Grid>
      </Provider>
  );
}

export default HeartsApp;
