import React, { useState, useEffect } from 'react';

import View from './view';

const Controller = ({ ...rest }) => {
  const [isTextCopied, setIsTextCopied] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const windowResizeListener = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', windowResizeListener);

    return () => {
      window.removeEventListener('resize', windowResizeListener);
    };
  }, []);

  useEffect(() => {
    if (isTextCopied) {
      setTimeout(() => setIsTextCopied(false), 1000);
    }
  }, [isTextCopied]);

  return (
    <View
      {...rest}
      isTextCopied={isTextCopied}
      setIsTextCopied={setIsTextCopied}
      windowWidth={windowWidth}
    />
  );
};

export default Controller;
