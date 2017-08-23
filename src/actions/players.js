import { v4 as uuidV4 } from 'uuid';
import {
  ADD_PLAYER,
  DEAL_CARD,
  PLAY_CARD,
  TOGGLE_CARD,
  PASS_CARDS
} from '../reducers/heartsPlayers';

export const addPlayer = (name, playerType = 'Human') => ({
  type: ADD_PLAYER,
  id: uuidV4(),
  name,
  playerType
});

export const dealCard = (playerID, card) => ({
  type: DEAL_CARD,
  playerID,
  card
});

export const playCard = (playerID, card) => ({
  type: PLAY_CARD,
  playerID,
  card
});

export const toggleCard = (playerID, card) => ({
  type: TOGGLE_CARD,
  playerID,
  card
});

export const passCards = (fromPlayerID, toPlayerID, cards) => ({
  type: PASS_CARDS,
  fromPlayerID,
  toPlayerID,
  cards
});
