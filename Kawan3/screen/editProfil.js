import React,  {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import dt from '../api';

var dat = new dt;


var datauser = [];

class editProfil extends React.Component {
    
    constructor(props){
        super(props);
    }

    state = {
        loaded: false,
        name: '',
        desc: ''
    }

    save = () => {
        var dataBaru = JSON.parse("{ }");
        dataBaru.name = this.state.name;
        dataBaru.desc = this.state.desc;
        dataBaru.status = "profile";
        
        this.setState({loaded:false});
        this.render();

        fetch(dat.api() + "/api/user/" + datauser.kodeuser, {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataBaru)
        })
        .then(rs => {
            return rs.text();
        })
        .then(rd => {

            if(rd != "berhasil"){
                Alert.alert('Error', rd);
                return;
            }

            fetch(dat.api() + "/api/user/" + datauser.email)
            .then(rs => {
                return rs.text();
            })
            .then(rd => {
                AsyncStorage.setItem('datauser', rd);
                
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'homeScreen' }]
                })
            })
        })
    }

    UNSAFE_componentWillMount(){
        AsyncStorage.getItem('datauser')
        .then(rd => {
            datauser = JSON.parse(rd);
            this.setState({ name: datauser.name, desc: datauser.desc })
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
                            <Text style={{fontSize: 16}}>Name</Text>
                            <TextInput placeholder="Your Name" value={this.state.name} onChangeText={value => this.setState({ name: value })} style={{height: 41, borderBottomWidth: 1, color: '#526EDD'}} />
                        </View>
                        <View style={{marginTop: 80}}>
                            <Text>Description</Text>
                            <TextInput placeholder="What's on your mind?" value={this.state.desc} onChangeText={value => this.setState({ desc: value })} style={{height: 41, borderBottomWidth: 1, color: 'gray'}} />
                        </View>
                    </View>

                    <TouchableOpacity style={{ flex: 1, marginLeft:170, marginTop:80}} onPress={() => this.save()}>
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