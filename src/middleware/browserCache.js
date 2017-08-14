import { NEW_TRICK } from '../reducers/heartsTricks';
import { NEW_GAME } from '../reducers/heartsRounds';

const STATE = "state";

export const loadState = () => {
  try {
    const loadedState = JSON.parse(localStorage.getItem(STATE));
    if (loadedState !== null) {
      return loadedState;
    }
    return undefined;
  } catch (err) {
    console.log("Can't load state: " + err);
    return undefined;
  }
};

const browserCache = store => next => action => {
  switch (action.type) {
    case NEW_TRICK:
      try {
        const serializedState = JSON.stringify(store.getState());
        localStorage.setItem(STATE, serializedState);
      } catch (err) {
        console.error(err);
      }
    break;
    case NEW_GAME:
      localStorage.removeItem(STATE);
      break;
    default:
      // Nothing
      break;
  }

  return next(action);
};

export default browserCache;
