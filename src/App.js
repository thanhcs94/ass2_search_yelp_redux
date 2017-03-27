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
import SearchList  from './layout/Search/SearchList';
import SearchFilter  from './layout/Search/SearchFilter';
import Login  from './layout/Login';
import {connect} from 'react-redux';
class App extends Component {

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
        /** check is login*/
        const { isAuthenticated } = this.props;
        console.log("isAuthenticated " +  JSON.stringify(this.props));
        if (!isAuthenticated) {
            return <SearchList/>;
        }else{
            console.log("data" +  JSON.stringify(this.props.user));
        }
        return (
            <Navigator
                initialRoute={{name:"SearchList"}}
                renderScene={this.renderScene.bind(this)}
            />
        )

    }
}
const mapStateToProps = function(state) {
    const { loginReducer } = state;
    console.log("isAuthenticated mapStateToProps " + JSON.stringify(loginReducer));
    // if(loginReducer.failure){
    //     alert(loginReducer.errorMessage)
    // }else{
    //
    // }
    return {
        isAuthenticated: loginReducer.isAuthenticated
    }
};
export default connect(mapStateToProps)(App);