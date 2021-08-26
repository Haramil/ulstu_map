import { connect } from 'react-redux';

import { selectors, actions } from 'store/slice';

import View from './view';

const mapStateToProps = (state) => ({
  config: selectors.getActiveMapConfig(state),
});

const mapDispatchToProps = {
  setActiveMapName: actions.setActiveMapName,
  setActiveElement: actions.setActiveElement,
};

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(View);

export default ConnectedView;
