import heartsReducer from '../reducers';

it('Adds a player', () => {
  const state = {}
  const action = {
    type: "ADD_PLAYER",
    name: "Bob",
    playerType: "Human"
  };
  const nextState = heartsReducer(state,action);
  expect(nextState.players).toEqual([{name: 'Bob', playerType: 'Human'}]);
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
      {name: 'Bob', playerType: 'Human'},
      {name: 'Bob', playerType: 'Human'},
      {name: 'Bob', playerType: 'Human'},
      {name: 'Bob', playerType: 'Human'},
  ]);
});
