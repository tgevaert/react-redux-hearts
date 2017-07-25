// Actions

export const ADD_PLAYER = "ADD_PLAYER";
export const DEAL_CARD = "DEAL_CARD";
export const PLAY_CARD = "PLAY_CARD";

// Reducers
const playerHand = (state = [], action) => {
  switch(action.type) {
    case DEAL_CARD:
      return [...state, action.card];
    case PLAY_CARD:
      const idx = state.findIndex(card => card === action.card);
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
  switch(action.type) {
    case ADD_PLAYER:
      nextState = {
        id: action.id, 
        name: action.name, 
        playerType: action.playerType, 
        playerHand: playerHand([], action)
      }
      return nextState;
    case DEAL_CARD:
    case PLAY_CARD:
      if (state.id !== action.playerID) {
        return state
      }
      nextState = Object.assign({}, state, {playerHand: playerHand(state.playerHand, action)});
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
    case DEAL_CARD:
    case PLAY_CARD:
      nextState = state.map(player => heartsPlayer(player, action));
      return nextState;
    default:
      return state;
  }
}

// Selectors

const getPlayer = (state, playerID) => {
  return state.find(player => player.id === playerID);
}

export default heartsPlayers;

export const getPlayers = (state) => state;
export const getPlayerIDs = (state) => state.map(player => player.id);
export const getPlayerHand = (state, playerID) => {
  const player = getPlayer(state, playerID);
  return player.playerHand;
};

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
