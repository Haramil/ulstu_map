import { connect } from 'react-redux';

import { actions } from 'store';

import Controller from './controller';

const mapDispatchToProps = {
  setActiveMapName: actions.setActiveMapName,
  setActiveElement: actions.setActiveElement,
};

const ConnectedController = connect(null, mapDispatchToProps)(Controller);

export default ConnectedController;
