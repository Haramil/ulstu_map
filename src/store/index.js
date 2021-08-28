import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import reducer, { actions, selectors } from './slice';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export { actions, selectors };

export default store;
