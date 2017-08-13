import React from 'react';
import { Provider } from 'react-redux';
import HeartsRoot from './HeartsRoot';

const HeartsApp = ({ store }) => {
  return (
    <Provider store={store}>
      <HeartsRoot />
    </Provider>
  );
};

export default HeartsApp;
