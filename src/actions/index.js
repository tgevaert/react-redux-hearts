import * as fromPlayers from './players';
import * as fromTricks from './tricks';
import * as fromRounds from './rounds';
import * as fromPhases from './phases';
import * as fromUI from './ui';
import {
  getPlayers,
  getPlayerIDs,
  getPlayerByName,
  getCurrentPlayerID,
  getCurrentPlayer,
  playerHandContainsCard,
  playerHandContainsSuit,
  isPlayerHandOnlyHearts,
  getCurrentTrickSuit,
  isCurrentPhase,
  gamePhases,
  isHeartsBroken,
  isTrickComplete,
  isRoundComplete,
  isGameComplete,
  isReadyToPass,
  getPassDirection,
  getSelectedCards,
  getCurrentPhase
} from '../reducers';
import aiPlayChoice, { aiPassChoice } from '../ai/random';

export const addPlayer = (playerName, playerType = 'Human', setPOV = false) => {
  return (dispatch, getState) => {
    dispatch(fromPlayers.addPlayer(playerName, playerType));
    if (setPOV) {
      const state = getState();
      const player = getPlayerByName(state, playerName)
      dispatch(fromUI.setPOV(player.id));
    }
  }
}

const MOVE_DELAY = 500; // ms

const delayedPromise = (delay, dispatch) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(dispatch()), delay);
  });
};

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
    if (card.suit === 'H' && !isHeartsBroken(state)) {
      // Need to check if only hearts left in hand
      if (isPlayerHandOnlyHearts) {
        return true;
      }
      return false;
    }
    return true;
  }

  if (card.suit === suit || !playerHandContainsSuit(state, playerID, suit)) {
    // Following suit or Can't follow suit
    return true;
  }
  return false;
};

const computerMove = currentPlayer => {
  return (dispatch, getState) => {
    const state = getState();
    const nextCard = aiPlayChoice(state, currentPlayer.id);
    return delayedPromise(MOVE_DELAY, () =>
      dispatch(playCard(currentPlayer.id, nextCard))
    );
  };
};

const computerSelectPassCard = playerID => {
  return (dispatch, getState) => {
    const state = getState();
    let card = aiPassChoice(state, playerID);
    dispatch(fromPlayers.toggleCard(playerID, card));
  };
};

const computerSelections = () => {
  return (dispatch, getState) => {
    const state = getState();
    const players = getPlayers(state);
    const aiPlayers = players.filter(p => p.playerType === 'AI');
    for (let p = 0; p < aiPlayers.length; p++) {
      for (let i = 0; i < 3; i++) {
        dispatch(computerSelectPassCard(aiPlayers[p].id));
      }
    }
    return Promise.resolve('Done Selections');
  };
};

const passCards = () => {
  return (dispatch, getState) => {
    const state = getState();
    const pass = getPassDirection(state);

    const playerIDs = getPlayerIDs(state);
    for (let i = 0; i < playerIDs.length; i++) {
      const selectedCards = getSelectedCards(state, playerIDs[i]);
      dispatch(
        fromPlayers.passCards(
          playerIDs[i],
          playerIDs[(i + playerIDs.length + pass) % playerIDs.length],
          selectedCards
        )
      );
    }
    return Promise.resolve('Cards Passed!');
  };
};

export const playCard = (playerID, card) => {
  return (dispatch, getState) => {
    const state = getState();
    if (
      getCurrentPlayerID(state) === playerID &&
      isValidMove(state, playerID, card)
    ) {
      // Play card, and tick over the game state
      return Promise.resolve(dispatch(fromPlayers.playCard(playerID, card)));
    } else {
      // Invalid card or playing out of turn.
      return Promise.reject('Invalid Card Played.');
    }
  };
};

const toggleCard = (playerID, card) => {
  return (dispatch, getState) => {
    return Promise.resolve(dispatch(fromPlayers.toggleCard(playerID, card)));
  };
};

export const playOrToggleCard = (playerID, card) => {
  return (dispatch, getState) => {
    const state = getState();
    const movePromise = new Promise((resolve, reject) => {
      let action = null;
      if (isCurrentPhase(state, gamePhases.PASSING)) {
        action = toggleCard;
      } else if (isCurrentPhase(state, gamePhases.PLAYING)) {
        action = playCard;
      } else {
        reject("I'm sorry we can't handle your click right now");
      }
      resolve(
        dispatch(action(playerID, card)).then(resolved => {
          if (process.env.NODE_ENV !== 'production') {
            console.log(resolved);
          }
          return dispatch(gameTick());
        }, console.log)
      );
    });
    return movePromise;
  };
};

export const newGame = () => {
  return (dispatch, getState) => {
    dispatch(fromRounds.newGame());
    dispatch(gameTick());
  };
};

export const gameTick = () => {
  return (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Game Tick');
    }
    const state = getState();
    let nextTick = new Promise((resolve, reject) => {
      switch (getCurrentPhase(state)) {
        case gamePhases.GAME_START:
          const playerIDs = getPlayers(state);
          if (playerIDs.length === 0) {
            dispatch(addPlayer('Alice', 'AI'));
            dispatch(addPlayer('Bob', 'AI'));
            dispatch(addPlayer('Carol', 'AI'));
            dispatch(addPlayer('You', 'Human', true));
          }
          resolve(dispatch(fromPhases.startRound()));
          break;

        case gamePhases.ROUND_START:
          if (getPassDirection(state) === 0) {
            // Skip if hand is for holding.
            resolve(
              dispatch(deal()).then(() => dispatch(fromPhases.startPlaying()))
            );
          } else {
            resolve(
              dispatch(deal())
                .then(() => dispatch(computerSelections()))
                .then(() => dispatch(fromPhases.startPassing()))
            );
          }
          break;

        case gamePhases.PASSING:
          if (isReadyToPass(state)) {
            resolve(
              dispatch(passCards()).then(() =>
                dispatch(fromPhases.startPlaying())
              )
            );
          } else {
            reject('Waiting for cards to be selected');
          }
          break;

        case gamePhases.PLAYING:
          if (isTrickComplete(state)) {
            resolve(dispatch(fromPhases.endTrick()));
          } else {
            const currentPlayer = getCurrentPlayer(state);
            if (currentPlayer.playerType === 'AI') {
              resolve(dispatch(computerMove(currentPlayer)));
            } else {
              reject('Waiting for human');
            }
          }
          break;

        case gamePhases.TRICK_END:
          if (isRoundComplete(state)) {
            resolve(
              delayedPromise(MOVE_DELAY, () => dispatch(fromPhases.endRound()))
            );
          } else {
            resolve(
              delayedPromise(MOVE_DELAY, () => dispatch(fromTricks.newTrick()))
            );
          }
          break;

        case gamePhases.TRICK_START:
          resolve(dispatch(fromPhases.startPlaying()));
          break;

        case gamePhases.ROUND_NEW:
          resolve(dispatch(fromPhases.startRound()));
          break;

        case gamePhases.ROUND_END:
          if (isGameComplete(state)) {
            resolve(dispatch(fromPhases.endGame()));
          } else {
            resolve(dispatch(fromRounds.newRound()));
          }
          break;

        case gamePhases.GAME_END:
        default:
          return reject('Nothing to do!');
      }
    });
    return nextTick.then(resolved => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(resolved);
      }
      return dispatch(gameTick());
    }, console.log);
  };
};

const randomPop = array => {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
};

export const deal = () => {
  return (dispatch, getState) => {
    const suits = ['C', 'D', 'S', 'H'];
    const values = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A'
    ];
    const players = getPlayers(getState());
    let deck = [];

    for (let s = 0; s < suits.length; s++) {
      for (let v = 0; v < values.length; v++) {
        deck.push({ value: values[v], suit: suits[s] });
      }
    }

    const deckSize = deck.length;

    for (let d = 0; d < deckSize; d++) {
      dispatch(
        fromPlayers.dealCard(players[d % players.length].id, randomPop(deck))
      );
    }

    return Promise.resolve('Finished Dealing');
  };
};
