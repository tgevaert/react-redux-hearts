import heartsRounds, * as fromHeartsRounds from '../reducers/heartsRounds';
import * as testConstants from './testConstants';

const newRoundAction = {type: "NEW_ROUND"};

const playCardAction = {type: "PLAY_CARD"};

it('Creates initial State', () => {
  expect(heartsRounds(undefined, testConstants.dummyAction)).toEqual([testConstants.emptyRound]);
});

it('Creates a new round', () => {
  expect(heartsRounds(undefined, newRoundAction)).toEqual([testConstants.emptyRound]);
});

it('Reports if hearts are not broken', () => {
  let state = undefined;
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.cardAC}))
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.cardKC}))
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.card3C}))
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.card2C}))
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.card2C}))
  state = heartsRounds(state, {type: "NEW_TRICK"});
  expect(fromHeartsRounds.isHeartsBroken(state)).toEqual(false);
});

it('Reports if hearts are not broken', () => {
  let state = undefined;
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.cardAH}))
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.cardKC}))
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.card3C}))
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.card2C}))
  state = heartsRounds(state, Object.assign({}, playCardAction, {player: testConstants.playerBob.name, card: testConstants.card2C}))
  state = heartsRounds(state, {type: "NEW_TRICK"});
  expect(fromHeartsRounds.isHeartsBroken(state)).toEqual(true);
});


