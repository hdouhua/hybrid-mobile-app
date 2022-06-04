/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './src/c20/App';
import {name as appName} from './app.json';

// LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
