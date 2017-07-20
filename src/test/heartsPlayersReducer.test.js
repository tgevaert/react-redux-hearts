import heartsPlayers, * as fromHeartsPlayers from '../reducers/heartsPlayers';
import * as testConstants from './testConstants';
import deepFreeze from 'deep-freeze';

const addBobAction = Object.assign({}, {type: fromHeartsPlayers.ADD_PLAYER}, testConstants.playerBob);

const dealBobCardAH = Object.assign({}, { type: fromHeartsPlayers.DEAL_CARD}, {playerID: testConstants.playerBob.id}, {card: testConstants.cardAH})

const playBobCardAH = Object.assign({}, { type: fromHeartsPlayers.PLAY_CARD}, {playerID: testConstants.playerBob.id}, {card: testConstants.cardAH})

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

it("Plays a card", () => {
  let state = undefined;
  state = heartsPlayers(state, addBobAction);
  state = heartsPlayers(state, dealBobCardAH);
  state = heartsPlayers(state, playBobCardAH);
  expect(state).toEqual([
      Object.assign({}, testConstants.playerBob, {playerHand: testConstants.emptyHand})
  ]);
});

it("Tests card in hand", () => {
  let state = undefined;
  state = heartsPlayers(state, addBobAction);
  state = heartsPlayers(state, dealBobCardAH);
  expect(fromHeartsPlayers.playerHandContainsCard(state, testConstants.playerBob.id, testConstants.cardAH)).toEqual(true);
  expect(fromHeartsPlayers.playerHandContainsCard(state, testConstants.playerBob.id, testConstants.cardAC)).toEqual(false);
});

it("Tests suit in hand", () => {
  let state = undefined;
  state = heartsPlayers(state, addBobAction);
  state = heartsPlayers(state, dealBobCardAH);
  expect(fromHeartsPlayers.playerHandContainsSuit(state, testConstants.playerBob.id, "H")).toEqual(true);
  expect(fromHeartsPlayers.playerHandContainsSuit(state, testConstants.playerBob.id, "S")).toEqual(false);
});

it("Has no side effects.", () => {
  let state = undefined;
  state = heartsPlayers(state, addBobAction);
  state = heartsPlayers(state, dealBobCardAH);
  deepFreeze(state);
  heartsPlayers(state, dealBobCardAH);
  fromHeartsPlayers.getPlayers(state);
  fromHeartsPlayers.getPlayerIDs(state);
  fromHeartsPlayers.getPlayerHand(state, testConstants.playerBob.id);
  fromHeartsPlayers.playerHandContainsCard(state, testConstants.playerBob.id, testConstants.cardAH);
  fromHeartsPlayers.playerHandContainsSuit(state, testConstants.playerBob.id, "H");
  heartsPlayers(state, playBobCardAH);
});
