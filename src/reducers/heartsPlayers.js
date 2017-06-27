const playerHand = (state = [], action) => {
  switch(action.type) {
    case "DEAL_CARD":
      return [...state, action.card];
    case "PLAY_CARD":
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
    case "ADD_PLAYER":
      nextState = {name: action.name, playerType: action.playerType, playerHand: playerHand([], action)}
      return nextState;
    case "DEAL_CARD":
    case "PLAY_CARD":
      if (state.name !== action.player) {
        return state
      }
      nextState = Object.assign({}, state, {playerHand: playerHand(state.playerHand, action)});
      return nextState;
    default:
      return state;
  }
}

const heartsPlayers = (state = [], action) => {
  let nextState = null;
  switch (action.type) {
    case "ADD_PLAYER":
      nextState = [...state, heartsPlayer(state, action)];
      return nextState;
    case "DEAL_CARD":
    case "PLAY_CARD":
      nextState = state.map(player => heartsPlayer(player, action));
      return nextState;
    default:
      return state;
  }
}

const getPlayer = (state, playerName) => {
  return state.find(player => player.name === playerName);
}

export default heartsPlayers;

export const getPlayers = (state) => state;
export const getPlayerHand = (state, playerName) => {
  const player = getPlayer(state, playerName);
  return player.playerHand;
};
