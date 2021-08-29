import React from 'react';
import cn from 'classnames';

import styles from './styles.scss';

const View = ({ prevMapName, setActiveMapName, setActiveElement, isMobile }) => {
  if (!prevMapName) {
    return null;
  }

  return (
    <button
      className={cn(styles.button, isMobile ? styles.mobile : null)}
      onClick={() => {
        setActiveMapName(prevMapName);
        setActiveElement(null);
      }}
    >
      Назад
    </button>
  );
};
export default View;
