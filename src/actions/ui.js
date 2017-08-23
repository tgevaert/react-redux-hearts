import { SET_PLAYER_POV } from '../reducers/heartsUI';

export const setPOV = (playerID) => ({
  type: SET_PLAYER_POV,
  playerID
})
