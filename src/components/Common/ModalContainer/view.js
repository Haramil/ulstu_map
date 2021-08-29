import React from 'react';
import cn from 'classnames';

import MoveInfoModal from 'components/Modals/MoveInfoModal';

import CrossIcon from 'assets/svg/cross.svg';

import styles from './styles.scss';

const getModalContent = (activeElement) => {
  const { action } = activeElement;

  if (action === 'move_info') {
    return <MoveInfoModal element={activeElement} />;
  }

  if (action === 'info' || action === 'auditory') {
    return <MoveInfoModal element={activeElement} isInfoOnly />;
  }

  return null;
};

const getModalPosition = (activeElement, mapContainer) => {
  const { clientWidth: mapWidth, clientHeight: mapHeight } = mapContainer;
  const { id: elementId } = activeElement;
  const mapElement = document.getElementById(elementId);

  if (!mapElement) {
    return { left: 0, top: 0 };
  }

  return { left: mapWidth / 2 - 160, top: mapHeight / 2 - 240 };
};

const View = ({ activeElement, setActiveElement, mapContainer, windowWidth }) => {
  if (!activeElement) {
    return null;
  }

  const modalContent = getModalContent(activeElement);
  const modalPosition = getModalPosition(activeElement, mapContainer);

  return (
    <>
      <div
        id="modalId"
        className={cn(styles.container, windowWidth < 1000 ? styles.mobContainer : null)}
        style={{ ...modalPosition }}
        onMouseUp={({ preventDefault }) => preventDefault()}
      >
        {modalContent}
        <button className={styles.crossButton} onClick={() => setActiveElement(null)}>
          <CrossIcon className={styles.crossIcon} />
        </button>
        <div className={cn(styles.arrow, windowWidth < 1000 ? styles.mob : null)} />
      </div>
    </>
  );
};

export default View;
