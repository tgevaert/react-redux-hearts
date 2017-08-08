import { SET_PHASE, gamePhases } from '../reducers/heartsPhases.js';
export const startPassing = () => ({ type: SET_PHASE, phase: gamePhases.PASSING });
export const startPlaying = () => ({ type: SET_PHASE, phase: gamePhases.PLAYING });
