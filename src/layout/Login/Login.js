import React, { Component } from 'react';
import LoginForm from './LoginForm';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.logoConten}>
                    <Image
                        style = {styles.logo}
                        source={require('../../images/ic_yelp.png')} />
                    <Text style = {styles.titleAppBig}>OMG I'M SO HUNGRY
                    </Text>
                </View>
                <LoginForm style ={{flex:0}}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#c02542',
    },
    logoConten:{
        flexGrow :1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleAppBig: {
        width : 300,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color :'#ffffff',
        fontWeight:'700'
    },
    titleApp: {
        width : 300,
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color :'#ffffff'
    },
    logo:{

    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});