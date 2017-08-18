import React from 'react';
import { Provider } from 'react-redux';
import HeartsRoot from './HeartsRoot';

const HeartsApp = ({ store }) => {
  return (
    <Provider store={store}>
      <div className="heartsRoot">
        <HeartsRoot />
      </div>
    </Provider>
  );
};

export default HeartsApp;
