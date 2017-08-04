import heartsTricks, * as fromHeartsTricks from './heartsTricks';

// Action Types

export const NEW_ROUND = "NEW_ROUND";
export const NEW_GAME = "NEW_GAME";

// Reducers

const heartsRound = (state = {}, action) => {
  return {
    tricks: heartsTricks(state.tricks, action),
  }
}

const heartsRounds = (state = [], action) => {
  switch (action.type) {
    case NEW_ROUND:
      return [heartsRound(undefined, action), ...state]
    case NEW_GAME:
      return [heartsRound(undefined, action)]
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
};

export const getScores = (state, playerIDs) => {
  const scores = [];
  let trickPoints = 0;
  let trickWinner = null;
  for (let r = state.length - 1; r >= 0; r--) {
    let round = state[r];
    const roundScores = [...playerIDs].fill(0);
    for (let trick of round.tricks) {
      trickPoints = fromHeartsTricks.getTrickPointValue(trick);
      if (trickPoints > 0) {
        trickWinner = fromHeartsTricks.getTrickWinnerID(trick);
        roundScores[playerIDs.indexOf(trickWinner)] += trickPoints;
      }
    }
    // Check if someone shot the moon.
    scores.push(roundScores);
  }
  return scores;
};

export const getCurrentTrick = (state) => fromHeartsTricks.getCurrentTrick(state[0].tricks);
export const getCurrentTrickSuit = (state) => fromHeartsTricks.getTrickSuit(getCurrentTrick(state));
export const getPreviousTrick = (state) => fromHeartsTricks.getPreviousTrick(state[0].tricks);
export const getRoundTrickHistory = (state) => fromHeartsTricks.getCompletedTricks(state[0].tricks);
export const getCurrentWinnerID = (state) => fromHeartsTricks.getCurrentWinnerID(state[0].tricks);
export default heartsRounds;
