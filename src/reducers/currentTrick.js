const currentTrick = (state = [], action) => {
  switch (action.type) {
    case "PLAY_CARD":
      const nextState = [...state, {
        card: action.card, 
        player: action.player
      }];
      return nextState;
    default:
      return state;
  }
};

export default currentTrick;

export const getCurrentTrick = (state) => state;
