import * as fromPlayers from './players';
import * as fromTricks from './tricks';
import * as fromRounds from './rounds';
import * as fromPhases from './phases';
import { getPlayers, getPlayerIDs, getCurrentPlayerID, getCurrentPlayer, playerHandContainsCard, playerHandContainsSuit, isPlayerHandOnlyHearts, getCurrentTrickSuit, isCurrentPhase, gamePhases, isHeartsBroken, isTrickComplete, isRoundComplete, isGameComplete, isReadyToPass, getRoundNumber, getSelectedCards } from '../reducers';
import aiPlayChoice, { aiPassChoice }  from '../ai/random';

export const addPlayer = (player, playerType = "Human") => fromPlayers.addPlayer(player, playerType);

const MOVE_DELAY = 500; // ms

const delayedPromise = (delay, dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dispatch()), delay);
  });
}

const isValidMove = (state, playerID, card) => {
  if (isTrickComplete(state)) {
    return false;
  }

  // Does Player possess card
  if (!playerHandContainsCard(state, playerID, card)) {
    return false;
  }

  // Suit to follow
  const suit = getCurrentTrickSuit(state);

  if (suit === null) {
    // Player has the lead
    // Check if hearts broken
    if (card.suit === "H" && !isHeartsBroken(state)) {
      // Need to check if only hearts left in hand
      if (isPlayerHandOnlyHearts) {
        return true;
      }
      return false;
    }
    return true;
  }

  if (card.suit === suit || !playerHandContainsSuit(state, playerID, suit) ) {
    // Following suit or Can't follow suit
    return true;
  }
  return false;
}

const computerMove = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (isCurrentPhase(state, gamePhases.PASSING)) {
      return Promise.resolve("Waiting for human to Pass!");
    }
    const currentPlayer = getCurrentPlayer(state);
    if (currentPlayer.playerType === "Human") {
      return Promise.resolve("Waiting for human.");
    } else {
      const nextCard = aiPlayChoice(state, currentPlayer.id);
      return delayedPromise(MOVE_DELAY, () => dispatch(playCard(currentPlayer.id, nextCard)));
    }
  }
}

const computerSelectPassCard = (playerID) => {
  return (dispatch, getState) => {
    const state = getState();
    let card = aiPassChoice(state, playerID);
    dispatch(fromPlayers.toggleCard(playerID, card));
  }
}

const computerSelections = () => {
  return (dispatch, getState) => {
    const state = getState();
    const players = getPlayers(state);
    const aiPlayers = players.filter((p) => p.playerType === "AI");
    for (let p = 0; p < aiPlayers.length; p++) {
      for (let i = 0; i < 3; i++) {
        dispatch(computerSelectPassCard(aiPlayers[p].id));
      }
    }
  }
}

const newRoundThunk = () => {
  return (dispatch, getState) => {
    dispatch(fromRounds.newRound());
    dispatch(deal());
    dispatch(fromPhases.startPassing());
    dispatch(computerSelections());
    return Promise.resolve("New Round Dealt!");
  }
}

const passCards = () => {
  return (dispatch, getState) => {
    const state = getState();
    const passDirections = [1, -1, 2, 0];
    const roundN = getRoundNumber(state);
    const pass = passDirections[roundN % passDirections.length];

    const playerIDs = getPlayerIDs(state);
    for (let i = 0; i < playerIDs.length; i++) {
      const selectedCards = getSelectedCards(state, playerIDs[i]);
      dispatch(fromPlayers.passCards(playerIDs[i], playerIDs[(i + playerIDs.length + pass) % playerIDs.length], selectedCards)); 
    }
    
    dispatch(fromPhases.startPlaying());
    dispatch(gameTick());
  }
}

const gameTick = () => {
  // Eventually the control loop will be:
  // Select Cards
  // Pass Cards
  // Play Card
  // Complete Trick
  // Complete Round
  // Complete Game
  return (dispatch, getState) => {
    const state = getState();
    if (isCurrentPhase(state, gamePhases.PASSING)) {
      if (isReadyToPass(state)) {
        dispatch(passCards());
      }
      return;
    }

    let nextAction = null;
    if (isGameComplete(state)) {
      return;
    } else if (isRoundComplete(state)) {
      nextAction = newRoundThunk;
    } else if (isTrickComplete(state)) {
      nextAction = fromTricks.newTrick;
    } 

    if (nextAction !== null) {
      delayedPromise(MOVE_DELAY, () => dispatch(nextAction())).then(() => dispatch(computerMove()));
    } else {
      dispatch(computerMove());
    }
  }
}

export const playCard = (playerID, card) => {
  return (dispatch, getState) => {
    const state = getState();
    if (getCurrentPlayerID(state) === playerID && isValidMove(state, playerID, card)) {
      // Play card, and tick over the game state
      dispatch(fromPlayers.playCard(playerID, card));
      // If Playing local game, client must tick over game state, rather than wait for server action.
      dispatch(gameTick());
      return Promise.resolve("Played Card Success!");
    } else {
      // Invalid card or playing out of turn.
      return Promise.reject("Invalid Card Played.");
    }
  }
};

const toggleCard = (playerID, card) => {
  return (dispatch, getState) => {
    dispatch(fromPlayers.toggleCard(playerID, card));
    dispatch(gameTick());
  }
}

export const playOrToggleCard = (playerID, card) => {
  return (dispatch, getState) => {
    if (isCurrentPhase(getState(), gamePhases.PASSING)) {
      dispatch(toggleCard(playerID, card));
    } else {
      dispatch(playCard(playerID, card)); 
    }
  }
}

export const newGame = () => {
  return (dispatch, getState) => {
    dispatch(fromRounds.newGame());
    dispatch(deal());
    dispatch(fromPhases.startPassing());
    dispatch(computerSelections());
    dispatch(gameTick());
  }
};

const randomPop = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
}

export const deal = () => {
  return (dispatch, getState) => {
    const suits = ["C", "D", "S", "H"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const players = getPlayers(getState());
    let deck = [];

    for (let s = 0; s < suits.length; s++) {
      for (let v = 0; v < values.length; v++) {
        deck.push({ value: values[v], suit: suits[s] });
      }
    }

    const deckSize = deck.length;

    for (let d = 0; d < deckSize; d++) {
      dispatch(fromPlayers.dealCard(players[d % players.length].id, randomPop(deck)));
    }
  }
};

