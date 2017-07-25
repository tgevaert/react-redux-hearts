import { connect } from 'react-redux';
import { getCurrentTrick } from '../reducers';
import { Trick } from './Trick';

const CurrentTrick = connect(state => ({trick: getCurrentTrick(state)}), null)(Trick);

export default CurrentTrick;
