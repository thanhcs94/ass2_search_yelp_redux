/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './src/App';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();
export default class Ass2 extends Component {
  render() {
    return (
     <Provider store={store}>
     <App/>
     </Provider>
    )}
}

AppRegistry.registerComponent('Ass2', () => Ass2);
