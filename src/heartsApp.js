import React from 'react';
import { connect, Provider } from 'react-redux';
import './css/heartsApp.css';
import { Table, Well, Grid, Row, PageHeader, Jumbotron } from 'react-bootstrap';
import { getPlayers, getCurrentTrick, getPreviousTrick, getPlayerHand, getCurrentWinner, getCurrentPlayerID, getCurrentTrickPointValue, getRoundTrickHistory, getScores } from './reducers';
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
  const cardElements = cards.map(card => <Card key={card.value + card.suit} onClickHandler={() => playCard(player.id, card)} card={card} />)
  return (
      <div className="hand">
        {cardElements}
      </div>
  );
}

const mapStateToPlayerHandProps = (state, { player }) => {
  const playerHand = getPlayerHand(state, player.id);

  return {player, cards: playerHand}
};

const PlayerHandContainer = connect(mapStateToPlayerHandProps, {playCard: actions.playCard})(PlayerHand);

const Player = ({player, isCurrentPlayer}) => {
  const className = "player" + (isCurrentPlayer ? " player-current" : "");
  
  return (
    <div className={className}>
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

const mapStateToScoreProps = (state) => (
    {
      players: getPlayers(state),
      scores: getScores(state)
});

const ScoreContainer = connect(mapStateToScoreProps)(ScoreTable);

const Players = ({players, currentPlayerID}) => {
  const playerElements = players.map(p => <Player isCurrentPlayer={p.id === currentPlayerID} key={p.id} player={p} />);

  return (
    <div>
      <h2>Players:</h2>
      <Well bsSize="small">
        <ul>
          {playerElements}
        </ul>
      </Well>
    </div>
  );
}

const mapStateToPlayersProps = (state) => ({
  players: getPlayers(state),
  currentPlayerID: getCurrentPlayerID(state)
});

const PlayersContainer = connect(mapStateToPlayersProps, null)(Players);
const CurrentTrickContainer = connect(state => ({trick: getCurrentTrick(state)}), null)(Trick);
const PreviousTrickContainer = connect(state => ({trick: getPreviousTrick(state)}), null)(Trick);

const Game = ({currentTrick, previousTrick, currentWinner, currentPlayer, currentTrickPointValue}) => {
  //let scoreContainer = <ScoreContainer />;
  let scoreContainer = (<h4>TODO: SCORE</h4>);


  return (
      <div>
        <PlayersContainer />
        <br />
        <h2>Current Trick:</h2>
        <CurrentTrickContainer />
        <h2>Previous Trick:</h2>
        <PreviousTrickContainer />
        <h2>Current Trick Point Value:</h2>
          {currentTrickPointValue}
        <h2>Currently Winning:</h2>
          {currentWinner ? currentWinner : "Nobody"}
        <h2>Trick History:</h2>
        <TrickHistoryContainer />
        <h2>Scores:</h2>
        {scoreContainer}
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
  const state = store.getState();
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
            <Game currentTrickPointValue={getCurrentTrickPointValue(state)} 
                  currentWinner={getCurrentWinner(state)} />
          </Jumbotron>
          </Row>
        </Grid>
      </Provider>
  );
}

export default HeartsApp;
