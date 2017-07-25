import * as testConstants from './testConstants';
import heartsReducer, * as fromHeartsReducer from '../reducers';
import * as fromPlayerActions from '../actions/players';
import { AIplayRandomCard } from '../ai';

let state = undefined;
state = heartsReducer(undefined, testConstants.addPlayerBob);
state = heartsReducer(state, testConstants.addPlayerDoug);
state = heartsReducer(state, testConstants.addPlayerBill);
state = heartsReducer(state, testConstants.addPlayerTed);

// Deal Cards
// Bob
state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerBob.id, testConstants.cardAH));
state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerBob.id, testConstants.card3H));
// Doug
state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerDoug.id, testConstants.card2H));
state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerDoug.id, testConstants.cardQH));
// Bill
state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerBill.id, testConstants.cardKC));
state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerBill.id, testConstants.card3C));
state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerBill.id, testConstants.card4H));
// Ted
state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerTed.id, testConstants.card2C));
state = heartsReducer(state, fromPlayerActions.dealCard(testConstants.playerTed.id, testConstants.cardAC));
// Play Cards
state = heartsReducer(state, fromPlayerActions.playCard(testConstants.playerBob.id, testConstants.cardAH));
state = heartsReducer(state, fromPlayerActions.playCard(testConstants.playerDoug.id, testConstants.cardQH));
state = heartsReducer(state, fromPlayerActions.playCard(testConstants.playerBill.id, testConstants.card2C));

it("Plays a random card from a hand", () => {
  // Either card is at least clubs
  expect(AIplayRandomCard(state, testConstants.playerTed.id)).toMatchObject({suit: "C"});
});

it ("Folows suit", () => {
  expect(AIplayRandomCard(state, testConstants.playerBill.id)).toEqual(testConstants.card4H);
});
