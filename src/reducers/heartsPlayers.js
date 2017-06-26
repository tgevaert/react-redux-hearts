const playerHand = (state = [], action) => {
  return state;
};

const heartsPlayer = (state = {}, action) => {
  switch(action.type) {
    case "ADD_PLAYER":
      const newState = {name: action.name, playerType: action.playerType}
      return newState;
    default:
      return state;
  }
}

const heartsPlayers = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      const newState = [...state, heartsPlayer(state, action)];
      return newState;
    default:
      return state;
  }
}

export default heartsPlayers;

export const getPlayers = (state) => state;
