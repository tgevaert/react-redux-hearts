import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/lib/Table';
import { getPlayers, getScores } from '../reducers';

const ScoreTable = ({players, scores}) => {
  const sum = [...players].fill(0);
  for (let score of scores){
    for (let s = 0; s < score.length; s++) {
      sum[s] += score[s];
    }
  }
  const tableHeading = players.map(p => <th key={p.id} className={"col-md-3"}>{p.name}</th>);
  const tableRows = scores.map(scoreRow => <tr key={scores.indexOf(scoreRow)}>{scoreRow.map(score => <td className={"col-md-3"}>{score}</td>)}</tr>)

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

const mapStateToProps = (state) => (
    {
      players: getPlayers(state),
      scores: getScores(state)
});

export const Score = connect(mapStateToProps)(ScoreTable);
