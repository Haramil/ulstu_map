import { connect } from 'react-redux';
import { actions, selectors } from 'store';

import View from './view';

const mapStateToProps = (state) => ({
  mapName: selectors.getActiveMapName(state),
});

const mapDispatchToProps = {
  setActiveMapName: actions.setActiveMapName,
  setActiveElement: actions.setActiveElement,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
