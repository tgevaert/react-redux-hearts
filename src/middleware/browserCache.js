import { NEW_TRICK } from '../reducers/heartsTricks';

export const loadState = () => {
  try {
    const loadedState = JSON.loads(localStorage.getItem('state'));
    return loadedState;
  }
  catch (err) {
    return undefined;
  }
}

const browserCache = store => next => action => {
  switch (action.type) {
    case NEW_TRICK:
      try {
        const serializedState = JSON.stringify(store.getState());
        localStorage.setItem('state', serializedState);
      } 
      catch (err) {
        console.error(err)
      };
    // case NEW_GAME
    break
    default:
      // Nothing
    break
  }

  return next(action);
}

export default browserCache;
