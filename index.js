/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/home.js';
import Comment from './src/comment.js';

const MainNavigator = createStackNavigator({
  Home: {screen: Home, navigationOptions: {headerShown:false}},
  Comment: {screen: Comment},
});

const App = createAppContainer(MainNavigator);

AppRegistry.registerComponent(appName, () => App);
