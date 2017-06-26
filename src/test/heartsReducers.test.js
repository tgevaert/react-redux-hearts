import heartsReducer from '../reducers';

it('Adds a player', () => {
  const state = {}
  const action = {
    type: "ADD_PLAYER",
    name: "Bob"
  };
  console.log(heartsReducer(state,action));
  expect(heartsReducer(state,action)).toEqual({});
});
