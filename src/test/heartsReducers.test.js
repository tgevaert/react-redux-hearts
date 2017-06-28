import heartsReducer, * as fromHeartsReducer from '../reducers';
import * as actions from '../actions';
import * as fromPlayerActions from '../actions/players';

it('Adds a player', () => {
  const state = {};
  const action = {
    type: "ADD_PLAYER",
    name: "Bob",
    playerType: "Human"
  };
  const nextState = heartsReducer(state, action);
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
  const card = {
    value: "A",
    suit: "H"
  }
  state = heartsReducer(state, fromPlayerActions.dealCard("Bob", card));

  expect(fromHeartsReducer.getPlayerHand(state, "Bob")).toEqual([card]);
});

it('Plays a card', () => {
  let state = {};
  state = heartsReducer(state, actions.addPlayer("Bob"));
  // Deal Card
  const card = {
    value: "A",
    suit: "H"
  }

  state = heartsReducer(state, fromPlayerActions.dealCard("Bob", card));

  state = heartsReducer(state, fromPlayerActions.playCard("Bob", card));

  expect(fromHeartsReducer.getPlayerHand(state, "Bob")).toEqual([]);
  expect(fromHeartsReducer.getCurrentTrick(state)).toEqual([{card: card, player: "Bob"}]);
});

it('Calculates a trick value', () => {
  let state = {};
  const card = {
    value: "A",
    suit: "H"
  }
  state = heartsReducer(state, actions.addPlayer("Bob"));
  state = heartsReducer(state, fromPlayerActions.dealCard("Bob", card));
  state = heartsReducer(state, fromPlayerActions.playCard("Bob", card));
  expect(fromHeartsReducer.getCurrentTrickPointValue(state)).toEqual(1);
});
