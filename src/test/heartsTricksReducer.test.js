import heartsTricks, * as fromHeartsTricks from '../reducers/heartsTricks'
import * as testConstants from './testConstants';

it("Handles a dummy action.", () => {
  expect(heartsTricks(undefined, testConstants.dummyAction)).toEqual([[]]);
});

it("Gets Trick Suit", () => {
  const trick = [{
    player: "Bob",
    card: {
      value: "2",
      suit: "H"
    }
  }, {
    player: "Doug",
    card: {
      value: "3",
      suit: "H"
    }
  }]
  expect(fromHeartsTricks.getTrickSuit(trick)).toEqual("H");
});

it("Handles Empty Trick Suit", () => {
  expect(fromHeartsTricks.getTrickSuit([])).toEqual(null);
});

it("Calculates Hearts Trick Values", () => {
  const trick = [{
    player: "Bob",
    card: {
      value: "2",
      suit: "H"
    }
  }, {
    player: "Doug",
    card: {
      value: "3",
      suit: "H"
    }
  }]

  expect(fromHeartsTricks.getTrickPointValue(trick)).toEqual(2);
});

it("Calculates Clean Trick Values", () => {
  const trick = [{
    player: "Bob",
    card: {
      value: "2",
      suit: "C"
    }
  }, {
    player: "Doug",
    card: {
      value: "3",
      suit: "C"
    }
  }]

  expect(fromHeartsTricks.getTrickPointValue(trick)).toEqual(0);
});

it("Calculates Queen Trick Values", () => {
  const trick = [{
    player: "Bob",
    card: {
      value: "Q",
      suit: "S"
    }
  }, {
    player: "Doug",
    card: {
      value: "3",
      suit: "C"
    }
  }]

  expect(fromHeartsTricks.getTrickPointValue(trick)).toEqual(13);
});
