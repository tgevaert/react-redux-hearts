import React, { Component } from 'react';
import logo from './logo.svg';
import './css/heartsApp.css';

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

const Player = ({player}) => <li>{player}</li>;

const Game = ({players, currentTrick}) => {

  const playerElements = players.map(p => <Player key={p} player={p} />);

  return (
      <div>
        <h2>Players:</h2>
          <ul>
            {playerElements}
          </ul>
        <br />
        <h2>Current Trick:</h2>
          {currentTrick}
      </div>

  )
};

const HeartsApp = () => {
  return (
    <div>
      <GameTitle title="HEARTS" />
      <GameButton text="DEAL" onClick={() => console.log("CLICK!")} />
      <Game players={["West", "North", "East", "Tim"]} currentTrick="" />
    </div>
  );
}

export default HeartsApp;
