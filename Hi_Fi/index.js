/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import ExploreScreen from './src/screens/ExploreScreen';
import AnimationDemo from './src/AnimationDemo';
AppRegistry.registerComponent(appName, () => AnimationDemo);
