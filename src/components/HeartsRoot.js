import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import { HeartsGame } from './HeartsGame';
import { Score } from './Score';
import GameOver from './GameOver';
import { DealButton } from './DealButton';

const GameTitle = ({title}) => {
  return (
    <PageHeader>{title}</PageHeader>
  );
}

const HeartsRoot = () => {
  return (
    <Grid>
      <Row>
        <GameTitle title="Hearts" />
      </Row>
      <Row>
      <Jumbotron>
        <HeartsGame />
        <GameOver>
          <DealButton />
          <Score />
        </GameOver>
      </Jumbotron>
      </Row>
    </Grid>
  );
}

export default HeartsRoot;
