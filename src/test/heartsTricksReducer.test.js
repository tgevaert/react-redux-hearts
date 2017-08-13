import deepFreeze from 'deep-freeze';
import heartsTricks, * as fromHeartsTricks from '../reducers/heartsTricks';
import * as fromHeartsPlayers from '../reducers/heartsPlayers';
import * as testConstants from './testConstants';

it('Handles a dummy action.', () => {
  expect(heartsTricks(undefined, testConstants.dummyAction)).toEqual([[]]);
});

it('Gets Trick Suit', () => {
  expect(fromHeartsTricks.getTrickSuit(testConstants.clubsTrick)).toEqual('C');
});

it('Handles Empty Trick Suit', () => {
  expect(fromHeartsTricks.getTrickSuit([])).toEqual(null);
});

it('Calculates Hearts Trick Values', () => {
  expect(
    fromHeartsTricks.getTrickPointValue(testConstants.heartsTrick)
  ).toEqual(2);
});

it('Calculates Clean Trick Values', () => {
  expect(fromHeartsTricks.getTrickPointValue(testConstants.clubsTrick)).toEqual(
    0
  );
});

it('Calculates Queen Trick Values', () => {
  expect(fromHeartsTricks.getTrickPointValue(testConstants.queenTrick)).toEqual(
    13
  );
});

it('Has no side effects.', () => {
  let trick = testConstants.queenTrick;
  let tricks = [testConstants.queenTrick, testConstants.clubsTrick];
  deepFreeze(tricks);
  // Reducer
  heartsTricks(tricks, testConstants.dummyAction);
  heartsTricks(tricks, { type: fromHeartsTricks.NEW_TRICK });
  heartsTricks(tricks, {
    type: fromHeartsPlayers.PLAY_CARD,
    card: testConstants.cardAH,
    playerID: testConstants.playerBob.id
  });
  // Tricks Selectors
  fromHeartsTricks.getCurrentTrick(tricks);
  fromHeartsTricks.getPreviousTrick(tricks);
  fromHeartsTricks.getCompletedTricks(tricks);
  fromHeartsTricks.getCurrentWinnerID(tricks);

  // Trick Selectors
  fromHeartsTricks.getLastMove(trick);
  fromHeartsTricks.getTrickSuit(trick);
  fromHeartsTricks.getTrickWinnerID(trick);
  fromHeartsTricks.getTrickPointValue(trick);
});
