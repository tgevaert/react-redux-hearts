import { v4 as uuidV4 } from 'uuid';
import { ADD_PLAYER, DEAL_CARD, PLAY_CARD }  from '../reducers/heartsPlayers'

export const addPlayer = (name, playerType = "Human") => ({
  type: ADD_PLAYER,
  id: uuidV4(),
  name: name,
  playerType: playerType
});

export const dealCard = (playerID, card) => ({
  type: DEAL_CARD,
  playerID: playerID,
  card: card
});

export const playCard = (playerID, card) => ({
  type: PLAY_CARD,
  playerID: playerID,
  card: card
});
