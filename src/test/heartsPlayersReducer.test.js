import heartsPlayers, * as fromHeartsPlayers from '../reducers/heartsPlayers';
import * as testConstants from './testConstants';
import deepFreeze from 'deep-freeze';

const dealBobCardAH = Object.assign({}, { type: fromHeartsPlayers.DEAL_CARD}, {playerID: testConstants.playerBob.id}, {card: testConstants.cardAH});
const dealBobCard2H = Object.assign({}, { type: fromHeartsPlayers.DEAL_CARD}, {playerID: testConstants.playerBob.id}, {card: testConstants.card2H});
const dealBobCard3H = Object.assign({}, { type: fromHeartsPlayers.DEAL_CARD}, {playerID: testConstants.playerBob.id}, {card: testConstants.card3H});

const playBobCardAH = Object.assign({}, { type: fromHeartsPlayers.PLAY_CARD}, {playerID: testConstants.playerBob.id}, {card: testConstants.cardAH});

const toggleCardAH = Object.assign({}, { type: fromHeartsPlayers.TOGGLE_CARD}, {playerID: testConstants.playerBob.id}, {card: testConstants.cardAH});

it("Handles a dummy action.", () => {
  expect(heartsPlayers(undefined, testConstants.dummyAction)).toEqual([]);
});

it("Adds a player", () => {
  expect(heartsPlayers(undefined, testConstants.addPlayerBob)).toEqual([Object.assign({}, testConstants.playerBob, testConstants.emptyHand)]);
});

it("Deals a card", () => {
  let state = undefined;
  state = heartsPlayers(state, testConstants.addPlayerBob);
  state = heartsPlayers(state, dealBobCardAH);
  expect(state).toEqual([
    Object.assign({}, testConstants.playerBob, {playerHand: [testConstants.cardAH]})
  ]);
});

it("Plays a card", () => {
  let state = undefined;
  state = heartsPlayers(state, testConstants.addPlayerBob);
  state = heartsPlayers(state, dealBobCardAH);
  state = heartsPlayers(state, playBobCardAH);
  expect(state).toEqual([
      Object.assign({}, testConstants.playerBob, {playerHand: testConstants.emptyHand})
  ]);
});

it("Toggles a card", () => {
  let state = undefined;
  state = heartsPlayers(state, testConstants.addPlayerBob);
  state = heartsPlayers(state, dealBobCardAH);
  state = heartsPlayers(state, toggleCardAH);
  expect(state).toEqual([
      Object.assign({}, testConstants.playerBob, {playerHand: [testConstants.cardAH]}, {selectedCards: [testConstants.cardAH]})
  ]);
});

it("Passes cards", () => {
  let state = undefined;
  let passCards = [testConstants.card2H, testConstants.card3H, testConstants.cardAH];
  state = heartsPlayers(state, testConstants.addPlayerBob);
  state = heartsPlayers(state, testConstants.addPlayerDoug);
  state = heartsPlayers(state, dealBobCardAH);
  state = heartsPlayers(state, dealBobCard3H);
  state = heartsPlayers(state, dealBobCard2H);
  state = heartsPlayers(state, {type: fromHeartsPlayers.PASS_CARDS, 
    fromPlayerID: testConstants.playerBob.id, 
    toPlayerID: testConstants.playerDoug.id,
    cards: passCards});
  expect(state).toEqual([testConstants.playerBob, 
      Object.assign({}, testConstants.playerDoug, {playerHand: passCards})]);
});

it("Tests card in hand", () => {
  let state = undefined;
  state = heartsPlayers(state, testConstants.addPlayerBob);
  state = heartsPlayers(state, dealBobCardAH);
  expect(fromHeartsPlayers.playerHandContainsCard(state, testConstants.playerBob.id, testConstants.cardAH)).toEqual(true);
  expect(fromHeartsPlayers.playerHandContainsCard(state, testConstants.playerBob.id, testConstants.cardAC)).toEqual(false);
});

it("Tests suit in hand", () => {
  let state = undefined;
  state = heartsPlayers(state, testConstants.addPlayerBob);
  state = heartsPlayers(state, dealBobCardAH);
  expect(fromHeartsPlayers.playerHandContainsSuit(state, testConstants.playerBob.id, "H")).toEqual(true);
  expect(fromHeartsPlayers.playerHandContainsSuit(state, testConstants.playerBob.id, "S")).toEqual(false);
});

it("Has no side effects.", () => {
  let state = undefined;
  state = heartsPlayers(state, testConstants.addPlayerBob);
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
