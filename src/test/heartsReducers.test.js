import heartsReducer, * as fromHeartsReducer from '../reducers';

it('Adds a player', () => {
  const state = {}
  const action = {
    type: "ADD_PLAYER",
    name: "Bob",
    playerType: "Human"
  };
  const nextState = heartsReducer(state,action);
  expect(nextState.players).toEqual([{name: 'Bob', playerType: 'Human', playerHand: []}]);
});

it('Adds 4 players', () => {
  let state = {}
  const action = {
    type: "ADD_PLAYER",
    name: "Bob",
    playerType: "Human"
  };
  state = heartsReducer(state, action);
  state = heartsReducer(state, action);
  state = heartsReducer(state, action);
  state = heartsReducer(state, action);
  expect(state.players).toEqual([
      {name: 'Bob', playerType: 'Human', playerHand: []},
      {name: 'Bob', playerType: 'Human', playerHand: []},
      {name: 'Bob', playerType: 'Human', playerHand: []},
      {name: 'Bob', playerType: 'Human', playerHand: []},
  ]);
});

it('Deals a card', () => {
  let state = {}
  const addPlayerAction = {
    type: "ADD_PLAYER",
    name: "Bob",
    playerType: "Human"
  };

  state = heartsReducer(state, addPlayerAction);

  const dealCardAction = {
    type: "DEAL_CARD",
    player: "Bob",
    card: "AH"
  }

  state = heartsReducer(state, dealCardAction);
  console.log(state);

  expect(fromHeartsReducer.getPlayerHand(state, "Bob")).toEqual(["AH"]);
});

  

