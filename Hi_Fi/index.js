/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import Demo from './src/Demo';
AppRegistry.registerComponent(appName, () => Demo);
