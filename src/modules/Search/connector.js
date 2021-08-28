import { connect } from 'react-redux';

import { selectors, actions } from 'store';

import View from './view';

const mapStateToProps = (state) => ({
  filter: selectors.getFilter(state),
});

const mapDispatchToProps = {
  setFilter: actions.setFilter,
};

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(View);

export default ConnectedView;
