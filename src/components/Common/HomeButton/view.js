import React from 'react';
import cn from 'classnames';

import styles from './styles.scss';

const View = ({ mapName, setActiveMapName, setActiveElement, isMobile }) => {
  if (mapName === 'global') {
    return null;
  }

  return (
    <button
      className={cn(styles.button, isMobile ? styles.mobile : null)}
      onClick={() => {
        setActiveMapName('global');
        setActiveElement(null);
      }}
    >
      На общую карту
    </button>
  );
};

export default View;
