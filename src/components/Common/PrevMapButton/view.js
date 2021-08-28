import React from 'react';

import styles from './styles.scss';

const View = ({ prevMapName, setActiveMapName, setActiveElement }) => {
  if (!prevMapName) {
    return null;
  }

  return (
    <button
      className={styles.button}
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
