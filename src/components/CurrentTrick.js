import { connect } from 'react-redux';
import { getCurrentTrick, getPlayerIDs } from '../reducers';
import { Trick } from './Trick';

const CurrentTrick = connect(state => ({trick: getCurrentTrick(state), playerIDs: getPlayerIDs(state) || []}), null)(Trick);

export default CurrentTrick;
