import React from 'react';
import ReactDOM from 'react-dom';
import HeartsApp from '../heartsApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeartsApp />, div);
});
