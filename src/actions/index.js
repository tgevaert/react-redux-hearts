import * as fromPlayers from './players';
import { getPlayers } from '../reducers';

export const addPlayer = (player) => fromPlayers.addPlayer(player);
export const deal = () => {
  return (dispatch, getState) => {
    const suits = ["C", "D", "S", "H"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const players = getPlayers(getState());

    for (let s = 0; s < suits.length; s++) {
      for (let v = 0; v < values.length; v++) {
        let card = values[v] + suits[s];
        let index = s*values.length + v
        dispatch(fromPlayers.dealCard(players[index % players.length].name, card));
      }
    }
  }
};

