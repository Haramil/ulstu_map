import React from 'react';

import MoveButton from 'components/Common/MoveButton';

import styles from './styles.scss';

const View = ({ element, setActiveMapName, setActiveElement }) => {
  const { name, direction, directionName } = element;

  return (
    <div className={styles.container} title={`Перейти в ${name}`}>
      <span className={styles.title}>{`Перейти на: "${directionName}"?`}</span>
      <MoveButton
        className={styles.enterIcon}
        onClick={() => {
          setActiveMapName(direction);
          setActiveElement(null);
        }}
      />
    </div>
  );
};

export default View;
