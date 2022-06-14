import {createStore} from 'redux';
import rootReducer from './reducers';
import {createReduxEnhancer} from '@shared/utils/monitoring';

const sentryEnhancer = createReduxEnhancer();

const store = createStore(rootReducer, sentryEnhancer);

// https://redux.js.org/usage/usage-with-typescript

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store};
