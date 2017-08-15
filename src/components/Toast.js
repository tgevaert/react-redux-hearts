import React from 'react';
import { connect } from 'react-redux';
import { getToast } from '../reducers'

const ToastPresentation = ({message = " "}) => {
  return (
      <div className="toast">{message}</div>
  );
}

export default connect((state) => ({message: getToast(state)}))(ToastPresentation);
