import { getTrickPointValue } from '../reducers/heartsTricks'

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

  expect(getTrickPointValue(trick)).toEqual(2);
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

  expect(getTrickPointValue(trick)).toEqual(0);
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

  expect(getTrickPointValue(trick)).toEqual(13);
});
