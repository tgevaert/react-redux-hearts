import heartsPlayers, * as fromHeartsPlayers from '../reducers/heartsPlayers';
import * as testConstants from './testConstants';

const addBobAction = Object.assign({}, {type: "ADD_PLAYER"}, testConstants.playerBob);

const dealBobCardAH = Object.assign({}, { type: "DEAL_CARD"}, {player: testConstants.playerBob.name}, {card: testConstants.cardAH})

it("Handles a dummy action.", () => {
  expect(heartsPlayers(undefined, testConstants.dummyAction)).toEqual([]);
});

it("Adds a player", () => {
  expect(heartsPlayers(undefined, addBobAction)).toEqual([Object.assign({}, testConstants.playerBob, testConstants.emptyHand)]);
});

it("Deals a card", () => {
  let state = undefined;
  state = heartsPlayers(state, addBobAction);
  state = heartsPlayers(state, dealBobCardAH);
  expect(state).toEqual([
    Object.assign({}, testConstants.playerBob, {playerHand: [testConstants.cardAH]})
  ]);
});

it("Tests card in hand", () => {
  let state = undefined;
  state = heartsPlayers(state, addBobAction);
  state = heartsPlayers(state, dealBobCardAH);
  expect(fromHeartsPlayers.playerHandContainsCard(state, testConstants.playerBob.name, testConstants.cardAH)).toEqual(true);
  expect(fromHeartsPlayers.playerHandContainsCard(state, testConstants.playerBob.name, testConstants.cardAC)).toEqual(false);
});

it("Tests suit in hand", () => {
  let state = undefined;
  state = heartsPlayers(state, addBobAction);
  state = heartsPlayers(state, dealBobCardAH);
  expect(fromHeartsPlayers.playerHandContainsSuit(state, testConstants.playerBob.name, "H")).toEqual(true);
  expect(fromHeartsPlayers.playerHandContainsSuit(state, testConstants.playerBob.name, "S")).toEqual(false);
});