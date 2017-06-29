import heartsRounds, * as fromHeartsRounds from '../reducers/heartsRounds';

const dummyAction = {type: "DUMMY"};

const newRoundAction = {type: "NEW_ROUND"};

const emptyRound = {tricks: [[]]};

it('Creates initial State', () => {
  expect(heartsRounds(undefined, dummyAction)).toEqual([emptyRound]);
});

it('Creates a new round', () => {
  expect(heartsRounds(undefined, newRoundAction)).toEqual([emptyRound]);
});
