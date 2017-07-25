import React from 'react';
import { connect } from 'react-redux';
import Trick from './Trick';
import { getRoundTrickHistory } from '../reducers';

const TrickHistoryPresentation = ({tricks = []}) => {
  let trickElements = tricks.map(trick => <li key={trick.reduce((acc, move) => acc + move.card.value + move.card.suit)}><Trick trick={trick} /></li>);

  return (<ul>
          {trickElements}
          </ul>);
}

const mapStateToProps = (state) => ({tricks: getRoundTrickHistory(state)});

export const TrickHistory = connect(mapStateToProps)(TrickHistoryPresentation);
