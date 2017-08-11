import { SET_PHASE, gamePhases } from '../reducers/heartsPhases.js';
export const startPassing = () => ({ type: SET_PHASE, phase: gamePhases.PASSING });
export const startPlaying = () => ({ type: SET_PHASE, phase: gamePhases.PLAYING });
export const startRound = () => ({ type: SET_PHASE, phase: gamePhases.ROUND_START });
export const endRound = () => ({ type: SET_PHASE, phase: gamePhases.ROUND_END });
export const endTrick = () => ({ type: SET_PHASE, phase: gamePhases.TRICK_END });
export const endGame = () => ({ type: SET_PHASE, phase: gamePhases.GAME_END });
