import { connect } from 'react-redux';

import { selectors, actions } from 'store';

import Controller from './controller';

const mapStateToProps = (state) => ({
  activeElement: selectors.getActiveElement(state),
});

const mapDispatchToProps = {
  setActiveElement: actions.setActiveElement,
};

const ConnectedController = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default ConnectedController;
