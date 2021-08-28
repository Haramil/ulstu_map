import { connect } from 'react-redux';

import { selectors } from 'store';

import View from './view';

const mapStateToProps = (state) => ({
  mapName: selectors.getActiveMapLabel(state),
});

const ConnectedView = connect(mapStateToProps)(View);

export default ConnectedView;
