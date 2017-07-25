import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { getPlayerHand } from '../reducers';
import { playCard } from '../actions';

const PlayerHandPresentation = ({player, cards, handleClick}) => {
  const cardElements = cards.map(card => <Card key={card.value + card.suit} onClickHandler={() => handleClick(player.id, card).then((result) => console.log(result), (error) => console.log("error" + error))} card={card} />)
  return (
      <div className="hand">
        {cardElements}
      </div>
  );
}

const mapStateToProps = (state, { player }) => {
  const playerHand = getPlayerHand(state, player.id);

  return {player, cards: playerHand}
};

export const PlayerHand = connect(mapStateToProps, {handleClick: playCard})(PlayerHandPresentation);
