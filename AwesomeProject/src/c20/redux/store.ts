import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import {createReduxEnhancer} from '@shared/utils/monitoring';

const store = configureStore({
  reducer: rootReducer,
  enhancers: [createReduxEnhancer()],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store};
