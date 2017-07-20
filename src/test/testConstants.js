import { ADD_PLAYER } from '../reducers/heartsPlayers';
export const dummyAction = {type: "DUMMY_ACTION"}

export const emptyHand = [];


export const player = {
  name: "",
  id: null,
  playerType: "Human",
  playerHand: emptyHand
}

export const playerBob = Object.assign({}, player, {id: 1, name: "Bob"});
export const playerDoug = Object.assign({}, player, {id: 2, name: "Doug"});
export const playerBill = Object.assign({}, player, {id: 3, name: "Bill"});
export const playerTed = Object.assign({}, player, {id: 4, name: "Ted"});

export const addPlayerBob = Object.assign(
    {}, 
    { type: ADD_PLAYER }, 
    {
      name: playerBob.name,
      id: playerBob.id,
      playerType: playerBob.playerType
    }
);

export const addPlayerDoug = Object.assign(
    {}, 
    { type: ADD_PLAYER }, 
    {
      name: playerDoug.name,
      id: playerDoug.id,
      playerType: playerDoug.playerType
    }
);

export const addPlayerBill = Object.assign(
    {}, 
    { type: ADD_PLAYER }, 
    {
      name: playerBill.name,
      id: playerBill.id,
      playerType: playerBill.playerType
    }
);

export const addPlayerTed = Object.assign(
    {}, 
    { type: ADD_PLAYER }, 
    {
      name: playerTed.name,
      id: playerTed.id,
      playerType: playerTed.playerType
    }
);

export const emptyTrick = [];

export const emptyRound = {tricks: [[]]};

export const cardAH = {
  value: "A",
  suit: "H"
};

export const card3H = {
  value: "3",
  suit: "H"
};

export const card2H = {
  value: "2",
  suit: "H"
};

export const cardQH = {
  value: "Q",
  suit: "H"
};

export const cardAC = {
  value: "A",
  suit: "C"
};

export const cardKC = {
  value: "K",
  suit: "C"
};

export const card3C = {
  value: "3",
  suit: "C"
};

export const card2C = {
  value: "3",
  suit: "C"
};

export const cardQS = {
  value: "Q",
  suit: "S"
};

export const heartsTrick = [{
    playerID: playerBob.id,
    card: cardAH
  }, {
    playerID: playerDoug.id,
    card: card3H
  }
];

export const clubsTrick = [{
    playerID: playerBob.id,
    card: cardAC
  }, {
    playerID: playerDoug.id,
    card: cardKC
  }
];

export const queenTrick = [{
    playerID: playerBob.id,
    card: cardQS
  }, {
    playerID: playerDoug.id,
    card: card3C
  }
];

