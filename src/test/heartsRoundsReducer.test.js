import heartsRounds, * as fromHeartsRounds from '../reducers/heartsRounds';
import * as fromHeartsTricks from '../reducers/heartsTricks';
import * as fromHeartsPlayers from '../reducers/heartsPlayers';
import * as testConstants from './testConstants';
import deepFreeze from 'deep-freeze';

const newRoundAction = { type: fromHeartsRounds.NEW_ROUND };

const newTrickAction = { type: fromHeartsTricks.NEW_TRICK };

const playCardAction = { type: fromHeartsPlayers.PLAY_CARD };

it('Creates initial State', () => {
  expect(heartsRounds(undefined, testConstants.dummyAction)).toEqual([
    testConstants.emptyRound
  ]);
});

it('Creates a new round', () => {
  expect(heartsRounds(undefined, newRoundAction)).toEqual([
    testConstants.emptyRound
  ]);
});

it('Has no side-effects', () => {
  const initialState = heartsRounds(undefined, newRoundAction);
  let state = heartsRounds(
    initialState,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardAC
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardKC
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.card3C
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.card2C
    })
  );
  state = heartsRounds(state, newTrickAction);
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardAH
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardQH
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.card3H
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.card2H
    })
  );
  state = heartsRounds(state, newRoundAction);

  deepFreeze(state);
  fromHeartsRounds.isHeartsBroken(state);
  fromHeartsRounds.getScores(state, [1, 2, 3, 4]);
});

it('Reports if hearts are not broken', () => {
  let state = undefined;
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardAC
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardKC
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.card3C
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.card2C
    })
  );
  state = heartsRounds(state, newTrickAction);
  expect(fromHeartsRounds.isHeartsBroken(state)).toEqual(false);
});

it('Reports if hearts are not broken', () => {
  let state = undefined;
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardAH
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardKC
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.card3C
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.card2C
    })
  );
  state = heartsRounds(state, newTrickAction);
  expect(fromHeartsRounds.isHeartsBroken(state)).toEqual(true);
});

it('Calculates scores', () => {
  let state = undefined;
  const players = [
    testConstants.playerBob.id,
    testConstants.playerDoug.id,
    testConstants.playerBill.id,
    testConstants.playerTed.id
  ];

  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardAH
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerDoug.id,
      card: testConstants.cardAC
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBill.id,
      card: testConstants.card3C
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerTed.id,
      card: testConstants.card2C
    })
  );
  state = heartsRounds(state, newTrickAction);
  expect(fromHeartsRounds.getScores(state, players)).toEqual([[1, 0, 0, 0]]);
});

it('Calculates multiple round scores', () => {
  let state = undefined;
  const players = [
    testConstants.playerBob.id,
    testConstants.playerDoug.id,
    testConstants.playerBill.id,
    testConstants.playerTed.id
  ];

  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.cardAH
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerDoug.id,
      card: testConstants.cardAC
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBill.id,
      card: testConstants.card3C
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerTed.id,
      card: testConstants.card2C
    })
  );
  state = heartsRounds(state, newTrickAction);
  state = heartsRounds(state, newRoundAction);
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBob.id,
      card: testConstants.card2C
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerDoug.id,
      card: testConstants.card3C
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerBill.id,
      card: testConstants.cardQS
    })
  );
  state = heartsRounds(
    state,
    Object.assign({}, playCardAction, {
      playerID: testConstants.playerTed.id,
      card: testConstants.cardAC
    })
  );
  expect(fromHeartsRounds.getScores(state, players)).toEqual([
    [1, 0, 0, 0],
    [0, 0, 0, 13]
  ]);
});
