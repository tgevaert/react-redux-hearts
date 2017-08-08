// Actions
export const SET_PHASE = "SET_PHASE";

// GAME_START: 
//  Add Players
//  Fix Deck Size
// ROUND_START:
//  Deal
// PASSING:
//  Select Cards to pass
//  Pass Cards
// PLAYING:
//  Play Card
//  New Trick
// ROUND_END:
//  Display scores
//  Round_START:
// GAME_END:
//  Display scores
//  New Game
// 

export const gamePhases = {
  GAME_START: "GAME_START",
  GAME_END: "GAME_END",
  ROUND_START: "ROUND_START",
  ROUND_END: "ROUND_END",
  TRICK_START: "TRICK_START",
  TRICK_END: "TRICK_END",
  PASSING: "PASSING",
  PLAYING: "PLAYING",
};

// Reducers

const heartsPhase = (state = gamePhases.GAME_START, action) => {
  switch (action.type) {
    case SET_PHASE:
      if (!(action.phase in gamePhases)) {
        return state;
      }
      return gamePhases[action.phase];
    default:
    return state;
  }
}

// Selectors

export const isCurrentPhase = (state, phase) => {
  return phase === state;
}

export default heartsPhase;
