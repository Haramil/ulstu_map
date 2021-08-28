import React from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import cn from 'classnames';

import MapLabel from 'components/Common/MapLabel';
import ModalContainer from 'components/Common/ModalContainer';
import FloorsButton from 'components/Common/FloorsButton';

import mapsVocabulary from './helpers';

import styles from './styles.scss';

const minScale = 0.3;
const maxScale = 1.05;

const View = ({
  mapParams,
  setMapParams,
  setActiveElement,
  activeMapName,
  activeMapElement,
  mapContainerRef,
  mapRef,
  windowWidth,
}) => (
  <div
    className={cn(styles.container, windowWidth < 1000 ? styles.fullWideContainer : null)}
    ref={mapContainerRef}
  >
    <MapLabel />
    <MapInteractionCSS
      value={mapParams}
      onChange={(value) => {
        if (value.scale < minScale || value.scale > maxScale) {
          return null;
        }
        if (activeMapElement) {
          setActiveElement(null);
        }
        setMapParams(value);
      }}
    >
      <div className={styles.image} ref={mapRef}>
        {mapsVocabulary[activeMapName]}
      </div>
    </MapInteractionCSS>
    <ModalContainer mapContainer={mapContainerRef.current} />
    <FloorsButton />
  </div>
);
export default View;
