import React from 'react';

import ArrowIcon from 'assets/svg/arrow.svg';

import styles from './styles.scss';

const View = ({ config: { prevMap, nextMap, floorName }, setActiveMapName, setActiveElement }) => {
  if (!prevMap && !nextMap) {
    return null;
  }

  return (
    <div className={styles.buttonsContainer}>
      <button
        onClick={() => {
          setActiveMapName(nextMap);
          setActiveElement(null);
        }}
        disabled={!nextMap}
      >
        <ArrowIcon />
      </button>
      <button>{floorName}</button>
      <button
        onClick={() => {
          setActiveMapName(prevMap);
          setActiveElement(null);
        }}
        disabled={!prevMap}
      >
        <ArrowIcon />
      </button>
    </div>
  );
};
export default View;
