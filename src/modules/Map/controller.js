import React, { useState, useEffect, useRef } from 'react';

import View from './view';

import styles from './styles.scss';

const defaultScale = 0.4;
const searchContainerWidth = 300;

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
  windowWidth,
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
  const leftSpace = windowWidth < 1000 ? 0 : searchContainerWidth;
  const x = mapX - left + leftSpace - centerOfActiveElement + mapWidth / 2;
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getParentOfElement = (id) => {
    const domEl = document.getElementById(id);
    if (domEl.parentElement.nodeName === 'svg' || (mapData[id] && mapData[id].direction)) {
      return id;
    }

    return getParentOfElement(domEl.parentElement.id);
  };

  const handler = (event) => {
    const {
      target: {
        parentElement: { id: mapElementId },
      },
    } = event;

    setActiveElement(mapElementId);
  };

  const moveHandler = (event) => {
    const {
      target: {
        parentElement: { id: mapElementId },
      },
    } = event;
    const elementId = getParentOfElement(mapElementId);

    const { direction } = Object.values(mapData).find(({ id }) => id === elementId);
    setActiveMapName(direction);
    setActiveElement(null);
  };

  useEffect(() => {
    const windowResizeListener = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', windowResizeListener);

    return () => {
      window.removeEventListener('resize', windowResizeListener);
    };
  }, []);

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
        mapElement.addEventListener('touchend', moveHandler);
      } else {
        mapElement.addEventListener('click', handler);
        mapElement.addEventListener('touchend', handler);
      }

      mapElement.classList.add(styles.interactiveObject);
      if (subdivisions && subdivision && activeMapName !== 'global') {
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
        mapElement.addEventListener('touchend', handler);
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
      windowWidth,
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
      windowWidth={windowWidth}
    />
  );
};

export default Controller;
