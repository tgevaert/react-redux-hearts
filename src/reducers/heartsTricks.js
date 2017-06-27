export const getCurrentTrick = (state) => state[0];
export const getCompletedTricks = (state) => state.slice(1);

const heartsTricks = (state = [[]], action) => {
  switch (action.type) {
    case "PLAY_CARD":
      const currentTrick = getCurrentTrick(state);
      const newTrick = [...currentTrick, {
        card: action.card, 
        player: action.player
      }];
      const nextState = [newTrick, ...state.slice(1)];
      return nextState;
    case "NEW_TRICK":
      return [[], ...state];
    default:
      return state;
  }
};

export default heartsTricks;
