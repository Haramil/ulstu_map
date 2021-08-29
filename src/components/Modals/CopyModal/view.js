import React from 'react';
import cn from 'classnames';

import styles from './styles.scss';

const View = ({ message, isOpen, isMob }) => (
  <div
    className={cn(styles.container, isMob ? styles.mobContainer : null)}
    style={{ opacity: isOpen ? 1 : 0 }}
  >
    <span className={styles.message}>{message}</span>
  </div>
);
export default View;
