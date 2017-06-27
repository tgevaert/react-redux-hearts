export const addPlayer = (name, playerType = "Human") => ({
  type: "ADD_PLAYER",
  name: name,
  playerType: playerType
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
