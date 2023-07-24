/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/c02/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

it('renders correctly', () => {
  renderer.create(<App />);
});
