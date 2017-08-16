import React from 'react';

const ButtonPresentation = ({onClick, children}) => {
  return (
      <div onClick={onClick} className={"hearts-button"}>
        {children}
      </div>
  );
};

export default ButtonPresentation;
