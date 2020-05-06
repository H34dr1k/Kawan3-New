import React,  {Component} from 'react';
import {View, Modal,Text, Image,Button, TouchableOpacity, ImageBackground, ScrollView, TextInput, StyleSheet, AsyncStorage, ActivityIndicator, Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DateTimePicker from '@react-native-community/datetimepicker';

import {postBlogs} from './CRUD(percobaan)'
import {connect} from 'react-redux'

import dt from '../api'
import { Date } from 'core-js';
import { DatePicker } from 'native-base';

var memberset = [
    { label: "Invite Only", value: 0 },
    { label: "Public", value: 1 },
    { label: "Closed", value: 2 }
];

var dat = new dt;
var dataUser = [];

class createEvent extends React.Component {
    static navigationOptions= {
        title: 'createEvent',
        header: null
    }
    
    state = {
        eventName:"",
        eventDescription:"",
        loaded: false
    }

    componentDidMount() {
        AsyncStorage.getItem('datauser').then( t =>{
            dataUser = JSON.parse(t);
            this.setState({ loaded: true });
            this.render;
        });
    }

    async submit(){
        // alert('a');
        console.log('Before');

        // var response = [];
        var response = "";

        var dataBaru = JSON.parse("{ }");
        dataBaru.name = this.state.eventName;
        dataBaru.desc = this.state.eventDescription;
        dataBaru.desc = this.state.date;
        dataBaru.creator = datauser.kodeuser;

        await fetch(dat.api() + "/api/event",
        {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataBaru)
        })
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            response = rd;
        })

        console.log("After");
        if(response != 'berhasil'){
            Alert.alert('Error', response);
            return;
        }
        console.log(response);
        // console.log(a);
        // if(a != 'berhasil'){
        //     Alert.alert('Error', a);
        //     return;
        // }

        // this.setState({
        //     eventName:'',
        //     eventDescription:''
        // })
        
        // this.props.navigation.navigate('My Event')
    }

    render(){
        if(!this.state.loaded){
            return(
                <View style={style.container}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }else{
        return(


            <View style={{flex: 1, backgroundColor: '#EFEEEE'}}>
                {/* <View style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flex: 0,flexDirection: 'row', height: 102, width: '100%', backgroundColor: '#628DE7', paddingTop: 26.5}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('addScreen')}>
                        <Image source={require('../src/image/arrowBack.png')} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 24, color: 'white'}}>Create a</Text>
                        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>Event</Text>
                    </View>
                </View>  */}
                 <View style={{flex: 1, marginHorizontal: 26, marginTop: 20}}>
                    <Text style={{fontSize: 18, color: '#628DE7', fontWeight: 'bold'}}>Step 1</Text>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Location</Text>
                        <TextInput
                        
                        placeholder="Choose the location" style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Event Name</Text>
                        <TextInput 
                        onChangeText={eventName => this.setState({eventName})}
                        value={this.state.eventName}
                        placeholder="Name of the Event"
                        style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />
                    </View>
                    <View stle={{ marginTop: 20 }}>
                        <DateTimePicker>
                            
                        </DateTimePicker>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Event Description</Text>
                        <TextInput 
                            onChangeText={eventDescription => this.setState({eventDescription})}
                            value={this.state.eventDescription}
                            multiline={true} placeholder="What's the description" style={{height: 200, backgroundColor: 'white', paddingLeft: 13, paddingRight: 15, paddingTop: 13, borderRadius: 5}} 
                            textAlignVertical="top" />
                    </View>
                </View>

                <Button title="Submit" onPress={a => this.submit()}>
                </Button>

                {/* <View style={{marginHorizontal: 26}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Create a Event')} style={{width: '100%', height: 56, backgroundColor: '#49438D', borderRadius: 15}}>
                    <ImageBackground source={require('../src/image/decoStar.png')} style={{width: '95%', height: '100%'}}>
                        <Text style={{fontSize: 18, color: 'white', textAlign: 'center', marginTop: 15}}>Continue</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                </View> */}

                
            </View>
        );
        }
    }
}

const style = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});
export default connect(null, {postBlogs})(createEvent);