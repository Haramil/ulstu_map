import React from 'react';

import styles from './styles.scss';

const getBackgroundColor = (mapConfig, subdivision) => {
  if (!mapConfig || !subdivision) {
    return null;
  }
  const { subdivisions } = mapConfig;
  const { color } = subdivisions[subdivision];

  return color;
};

const getCorpusItems = ({ mapData, setActiveElement, setDirectedElementId, filter, mapConfig }) => {
  const filteredItems = filter && mapData
    ? Object.values(mapData).filter(({ name }) => name.includes(filter))
    : Object.values(mapData);

  const items = filteredItems.map((mapItem) => {
    const { id, name, subdivision, action } = mapItem;
    const backgroundColor = getBackgroundColor(mapConfig, subdivision);
    if (action === 'move') {
      return null;
    }

    return (
      <div
        onClick={() => setActiveElement(id)}
        className={styles.item}
        onMouseEnter={() => setDirectedElementId(id)}
        onMouseLeave={() => setDirectedElementId(null)}
        key={id}
        style={{ backgroundColor }}
      >
        <span className={styles.label}>{name}</span>
      </div>
    );
  });

  return items;
};

const View = ({ mapData, setActiveElement, setDirectedElementId, filter, mapConfig }) => {
  if (!mapData) {
    return null;
  }

  const items = getCorpusItems({
    mapData,
    setActiveElement,
    setDirectedElementId,
    filter,
    mapConfig,
  });

  return <div className={styles.container}>{items}</div>;
};

export default View;
