export const addPlayer = (player) => ({
  type: "ADD_PLAYER",
  name: player.name,
  playerType: player.playerType || "Human"
});

export const dealCard = (player, card) => ({
  type: "DEAL_CARD",
  player: player,
  card: card
});

export const playCard = (player, card) => ({
  type: "PLAY_CARD",
  player: player,
  card: card
});
