import { connect } from 'react-redux';

import { actions } from 'store/slice';

import View from './view';

const mapDispatchToProps = {
  setActiveMapName: actions.setActiveMapName,
  setActiveElement: actions.setActiveElement,
};

const ConnectedView = connect(null, mapDispatchToProps)(View);

export default ConnectedView;
