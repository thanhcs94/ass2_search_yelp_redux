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
    StatusBar,
    Picker,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
const token = "sSdedQPhuRc8W-dn6p7e1Mlr6SmoJhLp2FHhUAHFHmHtRF7KYl2AjtEd9x7vOg4Hv9X0q54fUGH-9Dmz9VpQzqgSzmiFDYpYXARgZHiqkkkH9DsFdNUi4n2ciOTYWHYx";
export default class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount(){
        this._fetchDataFood();
    }
    _fetchDataFood(){
        // https://api.yelp.com/v3/businesses/search?term=delis&location=San%20Francisco
        const request = new Request('https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972', {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
                'Authorization': 'Bearer '+token,
            }),
        });
        return fetch(request)
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log("DATA"+ JSON.stringify(json))
                return json; // Token
            })
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"/>
                <View style={styles.actionBar}>
                    <View style={styles.actionBarFilter}>
                    <Text style={styles.textActionBar}>Filter</Text>
                    </View>
                    <TextInput style={styles.input}
                        placeholder={'Restaurants'}
                    />
                </View>

                <View style={styles.viewContent}>

                </View>
            </View>
        );
    }
}

//isAuthenticated mapStateToProps {"isAuthenticated":true,"isFetching":false,"token":"sSdedQPhuRc8W-dn6p7e1Mlr6SmoJhLp2FHhUAHFHmHtRF7KYl2AjtEd9x7vOg4Hv9X0q54fUGH-9Dmz9VpQzqgSzmiFDYpYXARgZHiqkkkH9DsFdNUi4n2ciOTYWHYx","user":{"name":"Teo(fake name)","email":"teo@gmail.com","password":"","token":"sSdedQPhuRc8W-dn6p7e1Mlr6SmoJhLp2FHhUAHFHmHtRF7KYl2AjtEd9x7vOg4Hv9X0q54fUGH-9Dmz9VpQzqgSzmiFDYpYXARgZHiqkkkH9DsFdNUi4n2ciOTYWHYx","token_type":"Bearer","expires_in":15547834},"errorMessage":"","failure":false}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#c00024',
    },
    actionBar:{
        backgroundColor:'#c00024',
        marginTop:30,
        paddingLeft :10,
        paddingRight:10,
        flexDirection:'row',
        paddingBottom:10
    },
    actionBarFilter:{
        flex:1,
        backgroundColor:'#c00024',
        flexDirection:'row',
        borderRadius:4,
        borderColor:'#ffffff',
        borderWidth:1,
        flexWrap:'wrap',
        height : 30,
        alignItems:'center',
        justifyContent:'center'

    },
    textActionBar:{
        color: '#ffffff',
        fontWeight:'500',
        fontSize:13,
        textAlign:'left',
        alignItems:'center',
        justifyContent:'center'
    },

    viewContent:{
        backgroundColor:'#fafafa',
        flex:1
    },

    input:{
        minWidth:300,
        flexWrap:'wrap',
        height : 30,
        backgroundColor: '#fafafa',
        paddingHorizontal : 10,
        color:'#171d18',
        borderRadius:5,
        textAlign:'left',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    }
});