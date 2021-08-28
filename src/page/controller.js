import React, { useEffect, useState } from 'react';

import View from './view';

const Controller = ({ ...rest }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const windowResizeListener = () => {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);
    };

    window.addEventListener('resize', windowResizeListener);

    return () => {
      window.removeEventListener('resize', windowResizeListener);
    };
  }, []);

  return <View {...rest} windowWidth={windowWidth} />;
};

export default Controller;
