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
import SearchList from './SearchList';
import SearchFilter from './SearchFilter';

class SearchScreen extends Component {

    renderScene(route, navigator) {
        switch (route.name) {
            case "SearchList":
                return (
                    <SearchList/>
                )
            case  "SearchFilter":
                return (
                    <SearchFilter/>
                )
            default:
                return {}
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{name:"SearchList"}}
                renderScene={this.renderScene.bind(this)}
            />
        )
    }
}
export default SearchScreen;