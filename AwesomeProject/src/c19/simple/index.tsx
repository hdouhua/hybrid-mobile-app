import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import Counter from './features/counter';

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
