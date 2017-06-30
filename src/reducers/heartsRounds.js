import heartsTricks, * as fromHeartsTricks from './heartsTricks';

// Reducers

const heartsRound = (state = {}, action) => {
  return {
    tricks: heartsTricks(state.tricks, action),
  }
}

const heartsRounds = (state = [], action) => {
  switch (action.type) {
    case "NEW_ROUND":
      return [heartsRound(undefined, action), ...state]
    default:
      return [].concat(heartsRound(state[0], action), ...state.slice(1))
  }
};

// Selectors

export const isHeartsBroken = (state) => {
  for (let trick of getRoundTrickHistory(state)) {
    for (let move of trick) {
      if (move.card.suit === "H") {
        return true;
      }
    }
  }
  return false;
}

export const getCurrentTrick = (state) => fromHeartsTricks.getCurrentTrick(state[0].tricks);
export const getCurrentTrickSuit = (state) => fromHeartsTricks.getTrickSuit(getCurrentTrick(state));
export const getPreviousTrick = (state) => fromHeartsTricks.getPreviousTrick(state[0].tricks);
export const getRoundTrickHistory = (state) => fromHeartsTricks.getCompletedTricks(state[0].tricks);
export const getCurrentWinner = (state) => fromHeartsTricks.getCurrentWinner(state[0].tricks);
export default heartsRounds;
