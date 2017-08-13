import React from 'react';
import { connect } from 'react-redux';
import { getPlayers, getScores } from '../reducers';

const ScoreTable = ({ players, scores }) => {
  const sum = [...players].fill(0);
  for (let score of scores) {
    for (let s = 0; s < score.length; s++) {
      sum[s] += score[s];
    }
  }
  const tableHeading = players.map(p =>
    <th key={p.id}>
      {p.name}
    </th>
  );
  const tableRows = scores.map((scoreRow, rowIndex) => {
    return (
      <tr key={rowIndex}>
        {scoreRow.map((score, playerIndex) => {
          return (
            <td key={playerIndex}>
              {score}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <table>
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
          {sum.map((s, index) =>
            <th key={index}>
              {s}
            </th>
          )}
        </tr>
      </thead>
    </table>
  );
};

const mapStateToProps = state => ({
  players: getPlayers(state),
  scores: getScores(state)
});

export const Score = connect(mapStateToProps)(ScoreTable);
