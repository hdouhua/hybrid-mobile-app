/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './src/c20/App';
import {name as appName} from './app.json';

// disalbe debug
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.debug = () => {};

// LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
