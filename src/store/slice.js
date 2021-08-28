import { createSlice, current } from '@reduxjs/toolkit';

import { global } from 'maps/global';
import c1 from 'maps/c1';
import c2 from 'maps/c2';
import c3 from 'maps/c3';
import c4 from 'maps/c4';
import c5 from 'maps/c5';
import c6 from 'maps/c6';
import other from 'maps/other';
import iatu from 'maps/iatu';

const initialState = {
  activeMapName: 'global',
  activeElement: null,
  activeMapData: global.items,
  activeMapConfig: global.config,
  activeMapLabel: global.config.mapLabel,
  prevMapName: null,
  directedElementId: null,
  filter: null,
  mapScale: null,
  maps: {
    global,
    ...c1,
    ...c2,
    ...c3,
    ...c4,
    ...c5,
    ...c6,
    ...other,
    ...iatu,
  },
};

const reducers = {
  setActiveMapName: (state, { payload: mapName }) => {
    state.prevMapName = state.activeMapName;
    state.activeMapName = mapName;
    state.activeMapLabel = state.maps[mapName].config.mapLabel || null;
    state.activeMapData = state.maps[mapName].items || null;
    state.activeMapConfig = state.maps[mapName].config || null;
  },
  setActiveElement: (state, { payload: elementId }) => {
    if (elementId === null) {
      state.activeElement = null;

      return;
    }
    const activeMap = state.activeMapName;
    const element = current(state.maps[activeMap].items[elementId]);
    state.activeElement = element;
  },
  setDirectedElementId: (state, { payload: elementId }) => {
    state.directedElementId = elementId;
  },
  setFilter: (state, { payload: filter }) => {
    state.filter = filter;
  },
  setMapScale: (state, { payload: scale }) => {
    state.mapScale = scale;
  },
};

const { actions, reducer } = createSlice({
  name: 'store',
  reducers,
  initialState,
});

const selectors = {
  getGlobalMapData: (state) => state?.global?.data,
  getActiveMapName: (state) => state.activeMapName,
  getActiveMapLabel: (state) => state.activeMapLabel,
  getActiveElement: (state) => state.activeElement,
  getActiveMapData: (state) => state.activeMapData,
  getDirectedElementId: (state) => state.directedElementId,
  getFilter: (state) => state.filter,
  getMapScale: (state) => state.mapScale,
  getActiveMapConfig: (state) => state.activeMapConfig,
  getPrevMapName: (state) => state.prevMapName,
};

export { actions, selectors };

export default reducer;
