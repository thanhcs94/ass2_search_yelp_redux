import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';
import {connect} from 'react-redux'
import {fetchDataLogin} from '../../actions/loginAction'

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            client_id: "qDPlyf_EBtljgqKxPALx6Q",
            client_secret: "RlFVBx8XonMjZcNnal3e827ooycXR7Pc4JngdpbM6UmdbW61GEfiss22OMRK0p4M"
        };
    }
    render() {
        return (
            <KeyboardAvoidingView behavior = "padding" style={styles.container}>
                <StatusBar
                    barStyle = "light-content"
                />
                <TextInput
                    placeholder = "Client Id"
                    placeholderTextColor = '#cccccc'
                    returnKeyType="next"
                    autoCorrect = {false}
                    autoCapitalize = "none"
                    onSubmitEditing = {()=> this.client_secretInput.focus()}
                    onChangeText={(text) => {this.setState({client_id: text})}}
                    value={this.state.client_id}
                    style = {styles.input}>
                </TextInput>

                <TextInput
                    placeholder ="Client Secret"
                    placeholderTextColor ='#cccccc'
                    returnKeyType="go"
                    ref = {(input)=>this.client_secretInput = input}
                    onChangeText={(client_secret) => {this.setState({client_secret: client_secret})}}
                    value={this.state.client_secret}
                    style = {styles.input}>
                </TextInput>

                <TouchableOpacity style = {styles.buttonContainer} onPress = {()=> this.props.fetchDataLogin(this.state.client_id, this.state.client_secret)} >
                    <Text style ={styles.loginButton}>LOGIN</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}


function mapStateToProps (state) {
    return {

    }
}

function mapDispatchToProps (dispatch) {

    return {
        fetchDataLogin: (clientId, clientSecret) => dispatch(fetchDataLogin(clientId, clientSecret))
    }
}


const styles = StyleSheet.create({
    container: {
        padding :20,
        marginBottom:50
    },
    input:{
        minWidth:300,
        flexWrap:'wrap',
        height : 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal : 8,
        color:'#fff',
        marginBottom : 10,
        borderRadius:6,

    },
    buttonContainer:{
        backgroundColor: "#3399CC",
        paddingVertical:8,
        marginTop:15,
        marginBottom:20,
        borderRadius:3
    },
    loginButton:{
        color: '#ffffff',
        textAlign:'center',
        fontWeight:'700'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
