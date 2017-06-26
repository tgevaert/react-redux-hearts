import React from 'react';
import ReactDOM from 'react-dom';
import HeartsApp from '../heartsApp';
import heartsCreateStore from '../heartsCreateStore';

it('renders without crashing', () => {
  const heartsStore = heartsCreateStore();
  const div = document.createElement('div');
  ReactDOM.render(<HeartsApp store={heartsStore} />, div);
});
