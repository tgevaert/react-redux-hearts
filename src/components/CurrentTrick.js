import { connect } from 'react-redux';
import { getCurrentTrick, getPlayerIDs, isTrickComplete, getCurrentWinnerID } from '../reducers';
import { Trick } from './Trick';

const CurrentTrick = connect(state => ({
  trick: getCurrentTrick(state), 
  playerIDs: getPlayerIDs(state) || [],
  winnerID: isTrickComplete(state) ? getCurrentWinnerID(state) : null}), null)(Trick);

export default CurrentTrick;
