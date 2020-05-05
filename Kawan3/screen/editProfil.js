import React,  {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, ActivityIndicator, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

var datauser = [];

class editProfil extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { loaded:false };
    }

    UNSAFE_componentWillMount(){
        AsyncStorage.getItem('datauser')
        .then(rd => {
            datauser = JSON.parse(rd);
            this.setState({ loaded:true });
        });
    }

    render(){
        if(!this.state.loaded){
            return(
                <View>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }else{
            return(
                <View style={{flex: 1}}>
                    <View style={{flex: 0, backgroundColor: '#49438D', height: 229, paddingTop: 26.5}}>
                        <ImageBackground source={require('../src/image/decoStar.png')} style={{width: '100%', height: '100%', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../src/image/arrowBack.png')} />
                        </TouchableOpacity>
                        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 15}}>Profile</Text>
                        </ImageBackground>
                    </View>
                    <View style={{flex: 0, alignItems: 'center', marginTop: -80}}>
                        <TouchableOpacity>
                            <Image source={require('../src/image/profilPic.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, marginHorizontal: 50, marginTop: 30}}>
                        <View>
                            <Text style={{fontSize: 16}}>Nama</Text>
                            <TextInput placeholder="Nama Anda" style={{height: 41, borderBottomWidth: 1, color: '#526EDD'}} />
                        </View>
                        <View style={{marginTop: 80}}>
                            <Text>Status</Text>
                            <TextInput placeholder="What will you do?" style={{height: 41, borderBottomWidth: 1, color: 'gray'}} />
                        </View>
                    </View>

                    <TouchableOpacity style={{ flex: 1, marginLeft:170, marginTop:80}}>
                        <View style={{ width: 80, padding: 20, height: 20, justifyContent: "center", alignContent: "center", backgroundColor: "blue" }}>
                            <Text style={{ color: "white", textAlign:"center" }}>OK</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            );
        }
    }
}

export default editProfil;