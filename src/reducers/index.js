import { combineReducers } from 'redux';

const playerHand = (state = [], action) => {
  return state;
};

const player = (state = {}, action) => {
  switch(action.type) {
    case "ADD_PLAYER":
      const newState = {name: action.name}
      return newState;
  }
  return state;
}

const players = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      const newState = [...state, player(state, action)]
      return newState;
    default:
      return state;
  }
  return state;
}

const currentTrick = (state = [], action) => {
  return state;
};

const currentPlayer = (state = "", action) => {
  return state;
};

const rules = (state = {}, action) => {
  return state;
};

const heartsGame = combineReducers({players, rules, currentTrick, currentPlayer});

export default heartsGame;
