import React, { useState, useEffect, useRef } from 'react';

import View from './view';

import styles from './styles.scss';

const defaultScale = 0.4;
const searchContainerWidth = 350;

const defaultMapParams = {
  scale: defaultScale,
  translation: { x: 0, y: 0 },
};

const setDirectedElement = (mapData, directedElementId) => {
  Object.values(mapData).forEach(({ id }) => {
    if (id === directedElementId) {
      const element = document.getElementById(id);

      if (element) {
        element.classList.add(styles.directed);
      }
    } else {
      const element = document.getElementById(id);

      if (!element) {
        return null;
      }

      element.classList.remove(styles.directed);
    }
  });
};

const getMapSpace = ({ clientWidth, clientHeight }, { width, height }) => {
  const leftSpace = clientWidth / 2 - width / 2;
  const topSpace = clientHeight / 2 - height / 2;

  return { x: leftSpace, y: topSpace };
};

const getMapParamsOnActive = ({
  mapElement,
  mapContainer: { clientWidth: mapWidth, clientHeight: mapHeight },
  mapParams: {
    translation: { x: mapX, y: mapY },
    scale,
  },
}) => {
  if (!mapElement) {
    return {
      translation: { x: mapX, y: mapY },
      scale,
    };
  }

  const { id: elementId } = mapElement;
  const { left, top } = document.getElementById(elementId).getBoundingClientRect();
  const { width } = document.getElementById(elementId).getBBox();

  const centerOfActiveElement = (width / 2) * scale;

  const x = mapX - left + searchContainerWidth - centerOfActiveElement + mapWidth / 2;
  const y = mapY - top + mapHeight / 2;

  return {
    scale,
    translation: { x, y },
  };
};

const Controller = ({
  mapData,
  setActiveElement,
  setActiveMapName,
  directedElementId,
  activeMapName,
  activeMapElement,
  activeMapConfig,
  setMapScale,
  ...rest
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapParams, setMapParams] = useState(defaultMapParams);

  const handler = (event) => {
    const {
      target: {
        parentElement: { id: mapElementId },
      },
    } = event;

    setActiveElement(mapElementId);
  };

  // const getDir = (id) => {
  //   const domEl = document.getElementById(id);

  // };

  const moveHandler = (event) => {
    const {
      target: {
        parentElement: { id: mapElementId },
      },
    } = event;
    const { direction } = Object.values(mapData).find(({ id }) => id === mapElementId);
    setActiveMapName(direction);
    setActiveElement(null);
  };

  useEffect(() => {
    setMapScale(mapParams.scale);
  }, [mapParams.scale]);

  useEffect(() => {
    if (!mapData) {
      return null;
    }

    setDirectedElement(mapData, directedElementId);
    const { subdivisions } = activeMapConfig || {};
    Object.values(mapData).forEach(({ id, subdivision, action }) => {
      const mapElement = document.getElementById(id);
      if (!mapElement) {
        return null;
      }
      if (action === 'move') {
        mapElement.addEventListener('click', moveHandler);
      } else {
        mapElement.addEventListener('click', handler);
      }

      mapElement.classList.add(styles.interactiveObject);
      if (subdivisions && subdivision) {
        mapElement.style.fill = subdivisions[subdivision].color;
        mapElement.children[0].style.fill = subdivisions[subdivision].color;
      }
    });

    return () => {
      Object.values(mapData).forEach(({ id }) => {
        const mapElement = document.getElementById(id);
        if (!mapElement) {
          return null;
        }

        mapElement.removeEventListener('click', handler);
      });
    };
  }, [mapData, directedElementId, activeMapName]);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return null;
    }

    const activeMapParams = getMapParamsOnActive({
      mapElement: activeMapElement,
      mapContainer: mapContainerRef.current,
      mapParams,
    });

    setMapParams({ ...activeMapParams });
  }, [mapContainerRef, activeMapElement, mapRef]);

  useEffect(() => {
    const mapImage = document.getElementsByClassName(styles.image)[0].getBoundingClientRect();
    if (!mapContainerRef.current || !mapImage) {
      return null;
    }

    const { x, y } = getMapSpace(mapContainerRef.current, mapImage);

    setMapParams({
      ...mapParams,
      translation: { x, y },
    });
  }, [mapContainerRef, activeMapName]);

  return (
    <View
      {...rest}
      mapParams={mapParams}
      setMapParams={setMapParams}
      setActiveElement={setActiveElement}
      activeMapName={activeMapName}
      activeMapElement={activeMapElement}
      mapContainerRef={mapContainerRef}
      mapRef={mapRef}
    />
  );
};

export default Controller;
