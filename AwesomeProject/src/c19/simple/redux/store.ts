import {configureStore} from '@reduxjs/toolkit';
import {counterSlice} from '../features/counter/counter-slice';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// https://redux.js.org/usage/usage-with-typescript

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
