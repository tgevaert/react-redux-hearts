import React from 'react';
import HeartsButton from './HeartsButton';
import githubLogo from '../logo-github.svg';

const SourceButtonPresentation = () => (
  <a href="http://github.com/tgevaert/react-redux-hearts">
    <HeartsButton>
      <img src={githubLogo} alt="Github Logo"></img>
    </HeartsButton>
  </a>
)

export default SourceButtonPresentation;
