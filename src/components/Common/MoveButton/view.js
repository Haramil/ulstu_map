import React from 'react';
import cn from 'classnames';

import styles from './styles.scss';

const View = ({ className, onClick }) => (
  <button className={cn(styles.button, className)} onClick={onClick}>
    Схема
  </button>
);

export default View;
