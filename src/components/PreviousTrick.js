import { connect } from 'react-redux';
import { getPreviousTrick } from '../reducers';
import { Trick } from './Trick';
export const PreviousTrick = connect(
  state => ({ trick: getPreviousTrick(state) }),
  null
)(Trick);
