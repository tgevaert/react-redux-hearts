import React from 'react';

export const Slide = ({direction, cardinal, children}) => {
  let cName = "slide";
  if (direction && cardinal) {
    cName += "-" + direction + "-" + cardinal;
  }
  return (
      <div className={cName}>
        {children}
      </div>
  )
};
