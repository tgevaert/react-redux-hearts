import React from 'react';
import { Provider } from 'react-redux';
//import HeartsAppDevTools from './heartsAppDevTools';
import HeartsRoot from './HeartsRoot';
const HeartsAppDevTools = () => <div />;

const HeartsApp = ({ store }) => {
  return (
    <Provider store={store}>
      <div className="heartsRoot">
        <HeartsRoot />
        <HeartsAppDevTools />
      </div>
    </Provider>
  );
};

export default HeartsApp;
