import React from 'react';

export const Slide = ({direction, cardinal, children}) => {
  return (
      <div className={"slide-" + direction + "-" + cardinal}>
        {children}
      </div>
  )
};
