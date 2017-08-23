// ACTIONS
export const SET_PLAYER_POV = "UI:SET_PLAYER_POV";

const heartsUI = (state = {POV: null}, action) => {
  switch (action.type) {
    case SET_PLAYER_POV:
      return {POV: action.playerID};
    default:
      return state;
  }
}

export const getCurrentPOV = (state) => (state.POV);

export default heartsUI;
