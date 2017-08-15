import React from 'react';
import { connect } from 'react-redux';
import { getPlayers, getScoreTotals } from '../reducers';

const GraphRowLabel = ({label}) => (<div className={"graph label"}>{label}</div>);

const GraphLine = ({size}) => {
  const colors = ["#388e3c", "#ffd600", "#e65100", "#d50000", "#d50000"];
  const barStyle = { 
    flexBasis: Math.min(size, 100)+"%",
    backgroundColor: colors[Math.floor(size / 25)],
  };
  return (
      <div className={"graph row"}>
        <div className={"graph row bar"} style={barStyle}>{size}</div>
        <div className={"graph row blank"}></div>
      </div>
    );
};

const ScoreGraphPresentation = ({playerNames, scores}) => {
  const graphRowLabels = playerNames.map((playerName) => <GraphRowLabel label={playerName} />);
  const graphLines = scores.map((score) => <GraphLine size={score} />);
  return (
        <div className={"graph"}>
          <div className={"labels"}>
            {graphRowLabels}
          </div>
          <div className={"bars"}>
            {graphLines}
          </div>
        </div>
      )
}

const mapStateToProps = (state) => {
  const playerNames = getPlayers(state).map((player) => player.name);
  const scores = getScoreTotals(state);

  return {playerNames: playerNames, scores: scores};
}

export default connect(mapStateToProps)(ScoreGraphPresentation);
