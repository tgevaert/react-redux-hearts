import { constants as  heartsConstants } from '../heartsRules';

// Actions
import { NEW_GAME } from './heartsRounds';
export const ADD_PLAYER = "ADD_PLAYER";
export const DEAL_CARD = "DEAL_CARD";
export const PLAY_CARD = "PLAY_CARD";
export const TOGGLE_CARD = "TOGGLE_CARD";

// Reducers
const selectedCards = (state = [], action) => {
  switch (action.type) {
    case TOGGLE_CARD: 
      const idx = state.findIndex(card => (card.value === action.card.value && card.suit === action.card.suit));
      if (idx > -1) {
        return [].concat(state.slice(0, idx), state.slice(idx+1));
      } else {
        return [...state, action.card];
      }
    default:
      return state;
  }
}

const playerHand = (state = [], action) => {
  switch (action.type) {
    case DEAL_CARD:
      let sortIndex = 0;
      const newCardRank = heartsConstants.cardRank(action.card);
      for (sortIndex = 0; sortIndex < state.length && newCardRank > heartsConstants.cardRank(state[sortIndex]); sortIndex++) {}
      return [...state.slice(0, sortIndex), action.card, ...state.slice(sortIndex)];
    case PLAY_CARD:
      const idx = state.findIndex(card => (card.value === action.card.value && card.suit === action.card.suit));
      if (idx > -1) {
        return [].concat(state.slice(0, idx), state.slice(idx+1));
      } else {
        return state;
      }
    default:
      return state;
  }
};

const heartsPlayer = (state = {}, action) => {
  let nextState = null;
  switch (action.type) {
    case ADD_PLAYER:
      nextState = {
        id: action.id, 
        name: action.name, 
        playerType: action.playerType, 
        playerHand: playerHand(undefined, action),
        selectedCards: selectedCards(undefined, action)
      }
      return nextState;
    case NEW_GAME:
      return Object.assign({}, state, {playerHand: playerHand(undefined, action)});
    case DEAL_CARD:
    case PLAY_CARD:
      if (state.id !== action.playerID) {
        return state
      }
      nextState = Object.assign({}, state, {playerHand: playerHand(state.playerHand, action)});
      return nextState;
    case TOGGLE_CARD:
      if (state.id !== action.playerID) {
        return state
      }
      nextState = Object.assign({}, state, {selectedCards: selectedCards(state.selectedCards, action)});
      return nextState;
    default:
      return state;
  }
};

const heartsPlayers = (state = [], action) => {
  let nextState = null;
  switch (action.type) {
    case ADD_PLAYER:
      nextState = [...state, heartsPlayer(state, action)];
      return nextState;
    case NEW_GAME:
    case DEAL_CARD:
    case PLAY_CARD:
    case TOGGLE_CARD:
      nextState = state.map(player => heartsPlayer(player, action));
      return nextState;
    default:
      return state;
  }
}

// Selectors

export const getPlayerByID = (state, playerID) => {
  return state.find(player => player.id === playerID);
}

export default heartsPlayers;

export const getPlayers = (state) => state;
export const getPlayerIDs = (state) => state.map(player => player.id);
export const getPlayerHand = (state, playerID) => {
  const player = getPlayerByID(state, playerID);
  return player.playerHand;
};

export const getSelectedCards = (state, playerID) => {
  const player = getPlayerByID(state, playerID);
  return player.selectedCards;
}

export const playerHandContainsCard = (state, playerID, card) => {
  const playerHand = getPlayerHand(state, playerID);
  for (let c of playerHand) {
    if (c.suit === card.suit && c.value === card.value) {
      return true;
    }
  }
  return false;
};

export const playerHandContainsSuit = (state, playerID, suit) => {
  const playerHand = getPlayerHand(state, playerID);
  for (let card of playerHand) {
    if (card.suit === suit) {
      return true;
    }
  }
  return false;
};

export const isPlayerHandOnlyHearts = (state, playerID) => {
  const playerHand = getPlayerHand(state, playerID);
  for (let card of playerHand) {
    if (card.suit !== "H") {
      return false;
    }
  }
  return true;
};
