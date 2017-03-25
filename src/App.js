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
    View,
    Navigator
} from 'react-native';
import SearchScreen  from './layout/Search';
import Login  from './layout/Login';
export default class App extends Component {
    renderScene(route, navigator) {
        switch (route.name) {

            case "SearchScreen":
                return (
                    <SearchScreen/>
                )

            case  "Login":
                return (
                    <Login/>
                )
            default:
                return {}
        }
    }


    render() {
        return (
            <Navigator
                initialRoute={{name:"Login"}}
                renderScene={this.renderScene.bind(this)}
            />
        )
    }
}