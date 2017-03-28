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
    Image,
    ListView,
    TouchableOpacity,
    TextInput,
    RefreshControl,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
const token = "sSdedQPhuRc8W-dn6p7e1Mlr6SmoJhLp2FHhUAHFHmHtRF7KYl2AjtEd9x7vOg4Hv9X0q54fUGH-9Dmz9VpQzqgSzmiFDYpYXARgZHiqkkkH9DsFdNUi4n2ciOTYWHYx";
class SearchSample extends Component {
    constructor(props){
        super(props);
        tempParams = "",
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1, r2) => r1!==r2
            }),
            data:'',
            text:'',
            refreshing: false,
            params : '',
        }
    }

    _onRefresh() {
        console.log("REFRESH _onRefresh")
        this.setState({refreshing: true});
        this.getMoviesFromApiAsync().then(() => {
            this.setState({refreshing: false});
        });
    }
    /*this function will call first */
    componentDidMount(){
        this.getMoviesFromApiAsync()
    }

    _getMiles(i) {
        return (i*0.000621371192).toFixed(1);;
    }

//https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed
//&attributes=deals&radius=5&sort_by=review_count&categories=Delis,alias,delis
//&attributes=deals&radius=40000&sort_by=review_count&categories=
//&attributes=deals&radius=40000&sort_by=review_count&categories=sandwiches,delis,grocery
    //https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972&attributes=deals&radius=40000&sort_by=review_count&categories=airlines
    getMoviesFromApiAsync() {
        /** check is login*/
        const request = new Request('https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972'+tempParams , {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
                'Authorization': 'Bearer '+token,
            }),
        });

        return fetch(request)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading: false, jsonData: responseJson});
                console.log(responseJson);
                console.log("Update data source: "+ this.state.dataSource.getRowCount());
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.businesses)
                });
                data = responseJson.businesses;
                console.log("Update data source: "+ this.state.dataSource.getRowCount());
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    filterSearch(text){
        console.log(text);
        const newData = data.filter(function(item){
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }


    renderRow(property){
        var category = "";
        var temp = "";
        for(var i=0;i< property.categories.length;i++){
            if(i !==  (property.categories.length-1)){ temp = ", ";}else {temp=""}

            category+= property.categories[i].title+ temp;
        }
        return(
            <TouchableOpacity onPress={()=>{this.props.onClickDetail(property.id)}}>
                <View style={styles.containerItem}>
                    <View style ={styles.viewBanner}>
                        <Image style={styles.photoBanner} source={{uri:property.image_url}} />
                    </View>

                    <View style = {styles.viewInfor}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text numberOfLines ={3} style = {styles.title}>{property.name}</Text>
                            <Text style = {[styles.textsmall, {marginLeft: 16}]}>{this._getMiles(property.distance)+"mi"}</Text>
                        </View>


                        <View style={{flexDirection:'row', alignItems:'center', marginTop:8}}>
                            <Text style = {styles.textsmall}>{"Rating : "+property.rating}</Text>
                            <Text style = {[styles.textsmall, {marginLeft: 16}]}>{property.review_count+" Reviews"}</Text>
                        </View>

                        <Text numberOfLines ={1} style = {[styles.textsmall, {fontWeight:'700', marginTop:8, marginRight:8}]}>
                            {property.location.address1 +", "+property.location.city}
                            </Text>

                        <Text style = {[styles.textsmall, {marginTop:8, textAlign:'left'}]}>
                            {category}
                            </Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    componentWillReceiveProps(props){

    }


    render() {

        /** check is login*/
        const {dataSetting} = this.props;
        console.log("REFRESHHHHHHHHHHHHHHHHHHHHH :"+ JSON.stringify(dataSetting))
        if(dataSetting.isRefresh){
            const {dataSetting} = this.props;
            tempParams ="";
            if(dataSetting.radius >1)
                tempParams += "&radius="+dataSetting.radius;

            if(!dataSetting.sort_by !=='')
                tempParams += "&sort_by="+dataSetting.sort_by;

            if(!dataSetting.categories !=='')
                tempParams += "&categories="+dataSetting.categories;

            if(dataSetting.attributes)
                tempParams+="&attributes=deals"
            console.log("REFRESH PAR :"+tempParams);
            //"attributes":false,"radius":"8046.7","sort_by":"review_count","categories":"abruzzese, absinthebars"
            this.getMoviesFromApiAsync();
            dataSetting.isRefresh = false;
        }

        if(this.state.dataSource.getRowCount() === 0){
            var rows = <View style={styles.containerLoading}>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={{height: 80}}
                    size="large"/>
                <Text style ={{fontWeight:'500'}}>Waiting for Happiness</Text>

            </View>
        }else {
            var rows =
                <ListView
                    refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
                    style = {styles.listView}
                    removeClippedSubviews={false}
                    dataSource = {this.state.dataSource}
                    renderRow  = {this.renderRow.bind(this)}
                    // use bind this to send context :  if not , props is not define in render row
                />
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle = "light-content"/>

                <View style={styles.actionBar}>
                    <TouchableOpacity onPress={()=>{this.props.onClickFilter()}}>
                        <View style={styles.actionBarFilter}>
                            <Text style={styles.textActionBar}>Filter</Text>
                        </View>
                    </TouchableOpacity>
                    <TextInput style={styles.input}
                               placeholder={'Restaurants'}
                               value = {this.state.text}
                               onChangeText={(text)=>this.filterSearch(text)}
                    />
                </View>

                {rows}
            </View>

        );
    }
}

// End of your component
const mapStateToProps = (state) => {
    console.log(" mapStateToProps DATA SETTING " + JSON.stringify(state.saveSetting))
    //{"isRefresh":true,"attributes":false,"radius":"8046.7","sort_by":"review_count","categories":"abruzzese, absinthebars"}
    return {
        dataSetting: state.saveSetting
        // attributes: state.saveSetting.attributes,
        // radius: state.saveSetting.radius,
        // sort_by: state.saveSetting.sort_by,
        // categories: state.saveSetting.categories
    }

}

// Maping storage of Redux to props of your component
export default connect(mapStateToProps)(SearchSample);


const  styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#c00024',
    },
    containerLoading:{
        flex:1,
        backgroundColor:'#fafafa',
        justifyContent:'center',
        alignItems:'center',
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
        justifyContent:'center',
        padding:5,
    },
    textActionBar:{
        color: '#ffffff',
        fontWeight:'700',
        textAlign:'left',
        alignItems:'center',
        justifyContent:'center',
        fontSize:16,
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
    },
    listView:{
        padding:8,
        backgroundColor:'#fafafa'
    },
    boderView:{
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        height:40,
        borderColor:'#E4E4E4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchView:{
        paddingLeft: 16,
        fontSize: 18,
        height:30,
    },

    containerItem:{
        flex: 1,
        flexDirection: 'row',
        marginTop:8,
        marginBottom:8,
        marginBottom: 1,
        paddingBottom:8,
        borderBottomWidth: 0.9,
        borderColor:'#cccccc',

    },

    viewBanner:{

    },
    viewInfor:{
        flexDirection:'column',
        marginLeft:10,
        marginRight:16,
    },
    photoBanner:{
        width:80,
        height:80,
        borderRadius:4,
        marginTop:4
    },
    title:{
        //fontFamily: 'Cochin',
        fontSize: 16,
        fontWeight: 'bold',

    },
    textsmall:{
        fontSize: 13,
        color:'#151515',
        textAlign:'right',
        alignItems:'flex-end',
        justifyContent:'flex-end'

    },
    description:{
        marginTop:8,
    }

});
