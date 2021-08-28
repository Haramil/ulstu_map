import { connect } from 'react-redux';

import { selectors, actions } from 'store';

import Controller from './controller';

const mapStateToProps = (state) => ({
  directedElementId: selectors.getDirectedElementId(state),
  activeMapName: selectors.getActiveMapName(state),
  activeMapConfig: selectors.getActiveMapConfig(state),
  activeMapElement: selectors.getActiveElement(state),
  mapData: selectors.getActiveMapData(state),
});

const mapDispatchToProps = {
  setActiveElement: actions.setActiveElement,
  setActiveMapName: actions.setActiveMapName,
  setMapScale: actions.setMapScale,
};

const ConnectedController = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default ConnectedController;
