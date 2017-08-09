// Actions
import { NEW_GAME, NEW_ROUND } from './heartsRounds';
import { NEW_TRICK } from './heartsTricks';
import { PLAY_CARD } from './heartsPlayers';
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
    case NEW_GAME:
      return gamePhases.GAME_START;
    case NEW_ROUND:
      return gamePhases.ROUND_START;
    case PLAY_CARD:
      return gamePhases.PLAYING;
    case NEW_TRICK:
      return gamePhases.TRICK_START;
    default:
    return state;
  }
}

// Selectors

export const isCurrentPhase = (state, phase) => {
  return phase === state;
}

export default heartsPhase;
