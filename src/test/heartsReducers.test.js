import heartsReducer, * as fromHeartsReducer from '../reducers';
import * as actions from '../actions';

it('Adds a player', () => {
  const state = {};
  const action = {
    type: "ADD_PLAYER",
    name: "Bob",
    playerType: "Human"
  };
  const nextState = heartsReducer(state,action);
  expect(nextState.players).toEqual([{name: 'Bob', playerType: 'Human', playerHand: []}]);
});

it('Adds 4 players', () => {
  let state = {};
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
  let state = {};
  // Add Bob
  state = heartsReducer(state, actions.addPlayer("Bob"));
  // Deal Card
  const dealCardAction = {
    type: "DEAL_CARD",
    player: "Bob",
    card: "AH"
  }
  state = heartsReducer(state, dealCardAction);

  expect(fromHeartsReducer.getPlayerHand(state, "Bob")).toEqual(["AH"]);
});

it('Plays a card', () => {
  let state = {};
  state = heartsReducer(state, actions.addPlayer("Bob"));
  // Deal Card
  const dealCardAction = {
    type: "DEAL_CARD",
    player: "Bob",
    card: "AH"
  };

  state = heartsReducer(state, dealCardAction);

  const playCardAction = {
    type: "PLAY_CARD",
    player: "Bob",
    card: "AH"
  };

  state = heartsReducer(state, playCardAction);

  expect(fromHeartsReducer.getPlayerHand(state, "Bob")).toEqual([]);
});

  

