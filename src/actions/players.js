export const addPlayer = (player) => ({
  type: "ADD_PLAYER",
  name: player.name,
  playerType: player.type
});
