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
    ScrollView
} from 'react-native';
import data      from '../../categories.json'
import { Switch } from 'react-native-switch';
const DISTANCE_OPTION = ["0.3 miles", "1 mile", "5 miles", "20 miles"];
const SORT_BY_OPTION = ["best_match", "rating", "review_count", "distance"];
var countClickDistance = 0;
var countClickSortBy = 0;
var categorySize = 0;
var categoryStepSize = 3;
export default class SearchFilter extends Component {
    constructor(props) {
        super(props);
        viewAll = [];
        dataCategory = [];
        this.state = {
            viewDistance: viewAll,
            viewSortBy: viewAll,
            viewCategory: viewAll,
            dropdown_distance: require('../../images/dropdown.png'),
            dropdown_sort: require('../../images/dropdown.png'),
            listCategory: data,
            loading: 'loading...'
        };
    }

    _addviewDistance() {
        var view = [];
        var open;
        if (countClickDistance % 2 == 0) {
            open = require('../../images/dropdown.png');
        } else {
            for (var i = 0; i < DISTANCE_OPTION.length; i++) {
                var viewOptiom =
                    <View key={i} style={[styles.viewContentFilterItem1]}>

                        <Text style={styles.textFilter}>{DISTANCE_OPTION[i]}</Text>
                        <Image style={styles.controlFilterImage}
                               source={require('../../images/ic_circle_select.png')}
                        />
                    </View>
                view.push(viewOptiom);
            }
            open = require('../../images/ic_expand.png');
        }
        this.setState({
            viewDistance: view,
            dropdown_distance: open
        });
        return;
    }


    _addviewSortBy() {
        var view = [];
        var open;
        if (countClickSortBy % 2 == 0) {
            open = require('../../images/dropdown.png');
        } else {
            for (var i = 0; i < SORT_BY_OPTION.length; i++) {
                var viewOptiom =
                    <View key={i} style={[styles.viewContentFilterItem1]}>

                        <Text style={styles.textFilter}>{SORT_BY_OPTION[i]}</Text>
                        <Image style={styles.controlFilterImage}
                               source={require('../../images/ic_circle_select.png')}
                        />
                    </View>
                view.push(viewOptiom);
            }
            open = require('../../images/ic_expand.png');
        }
        this.setState({
            viewSortBy: view,
            dropdown_sort: open
        });
    }

    componentDidMount() {
        this._addViewDataCategory(categoryStepSize);
    }

    _addViewDataCategory(check){
        this.setState({
            loading:'loading...'
        })
        var viewCategory = [];
        if (this.state.listCategory.length > 2) {
            for (var i = 0; i < check; i++) {
                var view = <View key={i} style={styles.viewContentFilterCategory}>

                    <Text style={styles.textFilter}>{this.state.listCategory[i].title}</Text>
                    <Switch
                        style={styles.controlFilter}
                        value={this.state.falseSwitchIsOn}
                        onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                        disabled={false}
                        activeText={'On'}
                        inActiveText={'Off'}
                        backgroundActive={'#4cb4ff'}
                        backgroundInactive={'#cccccc'}
                        circleActiveColor={'#a50010'}
                        circleInActiveColor={'#cccccc'}
                    />
                </View>

                viewCategory.push(view);
            }
        }

        this.setState({
            loading: 'Load All',
            viewCategory: viewCategory
        })

    }
    _getMoviesFromApiAsync() {
        return fetch('../categories.json')
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log("data category : "+ JSON.stringify(responseJson));
                dataCategory = responseJson;
                this.setState({
                    listCategory: dataCategory
                })
                return responseJson
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let dropdown_icon = this.state.dropdown_open_icon ? require('../../images/ic_circle_select.png') : require('../../images/dropdown.png');
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"/>
                <View style={styles.actionBar}>
                    <TouchableOpacity style ={{flex:1}} onPress={()=>{this.props.onClickBack()}}>
                    <Text style={[styles.textActionBar, {textAlign:'left'}]}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={[styles.textActionBar, {textAlign:'center'}]}>Filter</Text>
                    <Text style={[styles.textActionBar, {textAlign:'right'}]}>Search</Text>
                </View>

                <View style={styles.viewContent}>
                    <ScrollView>
                        <View style={styles.viewContentFilter1}>
                            <Text style={styles.textFilter}>Offer Deals</Text>
                            <Switch
                                style={styles.controlFilter}
                                value={this.state.falseSwitchIsOn}
                                onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                                disabled={false}
                                activeText={'On'}
                                inActiveText={'Off'}
                                backgroundActive={'#4cb4ff'}
                                backgroundInactive={'#cccccc'}
                                circleActiveColor={'#a50010'}
                                circleInActiveColor={'#cccccc'}
                            />

                        </View>

                        <Text style={styles.textFilterTitle}>Distance</Text>
                        <View style={styles.viewContentFilterContainer}>
                            <TouchableOpacity style={styles.viewContentFilter1}
                                              onPress={()=>{this._addviewDistance(countClickDistance++)}}>
                                <Text style={styles.textFilter}>Auto</Text>
                                <Image style={styles.controlFilterImage}
                                       source={this.state.dropdown_distance}
                                />
                            </TouchableOpacity>
                            <View style={styles.viewContentFilterContainer}>{this.state.viewDistance}</View>
                        </View>

                        <Text style={styles.textFilterTitle}>Sort By</Text>
                        <View style={styles.viewContentFilterContainer}>
                            <TouchableOpacity style={styles.viewContentFilter1}
                                              onPress={()=>{this._addviewSortBy(countClickSortBy++)}}>
                                <Text style={styles.textFilter}>Auto</Text>
                                <Image style={styles.controlFilterImage}
                                       source={this.state.dropdown_sort}
                                />
                            </TouchableOpacity>
                            <View style={styles.viewContentFilterContainer}>{this.state.viewSortBy}</View>
                        </View>


                        <Text style={styles.textFilterTitle}>Category</Text>
                        <View>
                            <View>{this.state.viewCategory}</View>
                            <TouchableOpacity onPress={()=>{this._addViewDataCategory(categorySize+=categoryStepSize)}}   >
                                <View style={styles.viewContentFilteCategory}>
                                    <Text style={{textAlign:'center',flex:1}}>{this.state.loading}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#c00024',
    },
    actionBar:{
      backgroundColor:'#c00024',
      height : 40,
      marginTop:30,
      paddingLeft :10,
      paddingRight:10,
      paddingBottom:10,
      paddingTop:10,
      flexDirection:'row',
    },
    textActionBar:{
        color: '#ffffff',
        fontWeight:'700',
        flex:1,
        fontSize:16,
    },

    viewContent:{
        backgroundColor:'#fafafa',
        flex:1
    },

    viewContentFilterContainer:{
        flexDirection:'column',
        alignItems:'center',
    },
    viewContentFilter1:{
        borderRadius: 4,
        borderColor :'#cccccc',
        borderWidth:1,
        margin:8,
        flexDirection:'row',
        alignItems:'center',
        padding:8,
    },
    viewContentFilterCategory:{
        borderRadius: 4,
        borderColor :'#cccccc',
        borderWidth:1,
        marginLeft:8,
        marginRight:8,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:8,
        paddingRight:8,
        paddingTop:4,
        paddingBottom:4,
        marginTop:4,
        marginBottom:4,
    },

    viewContentFilterItem1:{
        borderRadius: 4,
        borderColor :'#cccccc',
        borderWidth:1,
        marginLeft:8,
        marginRight:8,
        marginTop:2,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:8,
        paddingRight:8,
        paddingTop:2,
        paddingBottom:2,
        flex:0
    },

    viewContentFilteCategory:{
        borderRadius: 4,
        borderColor :'#cccccc',
        borderWidth:1,
        marginLeft:8,
        marginRight:8,
        flexDirection:'row',
        alignItems:'center',
        padding:8,
    },
    textFilter:{
        color: '#0b0e08',
        fontWeight:'600',
        flex:7,
        fontSize:16,
        textAlign:'left',
    },
    textFilterTitle:{
        color: '#0b0e08',
        fontWeight:'500',
        fontSize:16,
        textAlign:'left',
        margin:8,
    },
    controlFilter:{
        flex:0,
    },
    controlFilterImage:{
        flex:0,
        marginRight:8,
        width:30,
        height:30
    },
    controlFilterDown:{
        flex:0,
        marginRight: 10
    },
    input:{
        minWidth:300,
        flexWrap:'wrap',
        height : 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal : 10,
        color:'#fff',
        marginBottom : 10,
    },
    buttonContainer:{
        backgroundColor: "#1980b9",
        paddingVertical:10,
        marginTop:15,
        marginBottom:20
    },
    loginButton:{
        color: '#ffffff',
        textAlign:'center',
        fontWeight:'700'
    },
});