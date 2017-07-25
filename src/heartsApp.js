import React from 'react';
import { Provider } from 'react-redux';
import './css/heartsApp.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import HeartsAppDevTools from './heartsAppDevTools';
import { HeartsGame } from './components/HeartsGame';
import { Score } from './components/Score';

const GameTitle = ({title}) => {
  return (
    <PageHeader>{title}</PageHeader>
  );
}

const HeartsApp = ({store}) => {
  return (
      <Provider store={store}>
        <div>
          <Grid>
            <Row>
              <GameTitle title="Hearts" />
            </Row>
            <Row>
            <Jumbotron>
              <HeartsGame />
              <Score />
            </Jumbotron>
            </Row>
          </Grid>
          <HeartsAppDevTools />
        </div>
      </Provider>
  );
}

export default HeartsApp;
