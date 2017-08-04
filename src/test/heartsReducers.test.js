import * as testConstants from './testConstants';
import heartsReducer, * as fromHeartsReducer from '../reducers';
import * as fromPlayerActions from '../actions/players';


it('Adds a player', () => {
  const state = {};
  const nextState = heartsReducer(state, testConstants.addPlayerBob);
  expect(nextState.players).toEqual([testConstants.playerBob]);
});

it('Adds 4 players', () => {
  let state = {};
  state = heartsReducer(state, testConstants.addPlayerBob);
  state = heartsReducer(state, testConstants.addPlayerDoug);
  state = heartsReducer(state, testConstants.addPlayerBill);
  state = heartsReducer(state, testConstants.addPlayerTed);
  expect(state.players).toEqual([
      testConstants.playerBob, 
      testConstants.playerDoug,
      testConstants.playerBill,
      testConstants.playerTed
  ]);
});

it('Deals a card', () => {
  let state = {};
  // Add Bob
  state = heartsReducer(state, testConstants.addPlayerBob);
  // Deal Card
  state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerBob.id, testConstants.cardAH));
  expect(fromHeartsReducer.getPlayerHand(state, testConstants.playerBob.id)).toEqual([testConstants.cardAH]);
});

it('Plays a card', () => {
  let state = {};
  state = heartsReducer(state, testConstants.addPlayerBob);
  // Deal Card
  state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerBob.id, testConstants.cardAH));

  // Play Card
  state = heartsReducer(state, fromPlayerActions.playCard(testConstants.playerBob.id, testConstants.cardAH));

  expect(fromHeartsReducer.getPlayerHand(state, testConstants.playerBob.id)).toEqual([]);
  expect(fromHeartsReducer.getCurrentTrick(state)).toEqual([{card: testConstants.cardAH, playerID: testConstants.playerBob.id}]);
});

it('Calculates a trick value', () => {
  let state = {};
  state = heartsReducer(state, testConstants.addPlayerBob);
  state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerBob.id, testConstants.cardAH));
  state = heartsReducer(state, fromPlayerActions.playCard(testConstants.playerBob.id, testConstants.cardAH));
  expect(fromHeartsReducer.getCurrentTrickPointValue(state)).toEqual(1);
});

it("Tests game state before game started.", () => {
  let state = undefined;
  //state = heartsReducer(state, undefined);
  fromHeartsReducer.isGameComplete(state);
});
