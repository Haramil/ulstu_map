import { connect } from 'react-redux';

import { selectors, actions } from 'store';

import View from './view';

const mapStateToProps = (state) => ({
  mapData: selectors.getActiveMapData(state),
  filter: selectors.getFilter(state),
  mapConfig: selectors.getActiveMapConfig(state),
});

const mapDispatchToProps = {
  setActiveElement: actions.setActiveElement,
  setDirectedElementId: actions.setDirectedElementId,
};

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(View);

export default ConnectedView;
