import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { getPlayerHand, getSelectedCards } from '../reducers';
import { playOrToggleCard } from '../actions';

const isToggled = (selectedCards, card) => {
  return (
    selectedCards.findIndex(
      c => c.suit === card.suit && c.value === card.value
    ) > -1
  );
};

const PlayerHandPresentation = ({
  player,
  cards,
  selectedCards = [],
  handleClick
}) => {
  const cardElements = cards.map(card =>
    <Card
      key={card.value + card.suit}
      onClickHandler={() => handleClick(player.id, card)}
      card={card}
      toggled={isToggled(selectedCards, card)}
    />
  );
  return (
    <div className="hand">
      {cardElements}
    </div>
  );
};

const mapStateToProps = (state, { player }) => {
  const playerHand = getPlayerHand(state, player.id);
  const selectedCards = getSelectedCards(state, player.id);

  return { player, cards: playerHand, selectedCards: selectedCards };
};

export const PlayerHand = connect(mapStateToProps, {
  handleClick: playOrToggleCard
})(PlayerHandPresentation);
