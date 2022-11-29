import React from 'react';

import styles from './styles.scss';

const View = ({ element }) => {
  const { name, disc } = element;

  return (
    <div className={styles.container} title={`Перейти в ${name}`}>
      <span className={styles.title}>{name}</span>
      <span className={styles.disc}>{disc}</span>
    </div>
  );
};

export default View;
