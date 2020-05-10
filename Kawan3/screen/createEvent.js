import React,  {Component, useState} from 'react';
import {View, Modal, Text, Image,Button, TouchableOpacity, ImageBackground, ScrollView, TextInput, StyleSheet, AsyncStorage, ActivityIndicator, Alert, Picker} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DateTimePicker from '@react-native-community/datetimepicker';

import {postBlogs} from './CRUD(percobaan)'
import {connect} from 'react-redux'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import dt from '../api'

var memberset = [
    { label: "Invite Only", value: 0 },
    { label: "Public", value: 1 },
    { label: "Closed", value: 2 }
];

var dat = new dt;
var dataUser = [];

var fullDate = new Date();

class createEvent extends React.Component {
    static navigationOptions= {
        title: 'createEvent',
        header: null
    }

    onChangeDate = (event, selectedData) => {
        if(selectedData !== undefined){
            this.setState({ 
                year: selectedData.getFullYear(),
                month: selectedData.getMonth() + 1,
                date: selectedData.getDate(),
                showDate: false
            });
        }
    }

    onChangeTime = (event, selectedData) => {
        if(selectedData !== undefined){
            this.setState({ 
                hour: selectedData.getHours(),
                minute: selectedData.getMinutes(),
                showTime: false
            });
        }
    }

    showTulisan = value => {
        if(value == "Public"){
            this.setState({ tulisan: "Everyone can join this event" });
        }else{
            this.setState({ tulisan: "Only friends can join this event" });
        }
    }
    
    state = {
        eventName:"",
        eventDescription:"",
        eventCategory:'Public',
        loaded: false,
        showDate: false,
        showTime: false,
        tulisan: "Everyone can join",
        showTulisan: false,
        year: fullDate.getFullYear(),
        month: fullDate.getMonth() + 1,
        date: fullDate.getDate(),
        hour: fullDate.getHours(),
        minute: fullDate.getMinutes()
    }

    finalDate(status) {
        var year = this.state.year;
        var month = this.state.month;
        var date = this.state.date;
        var hour = this.state.hour;
        var minute = this.state.minute;

        var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        if(status == "justDate"){
            return date + " " + months[month] + " " + year;
        }
        else if(status == "justTime"){
            if(minute.toString()[1] === undefined){
                minute = "0" + minute;
            }
            if(hour.toString()[1] === undefined){
                hour = "0" + hour;
            }
            return hour + ":" + minute;
        }
        else if(status == "fullDouble"){
            return new Date(year, month - 1, date, hour, minute);
        }
        else{
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":00";
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('datauser').then( t =>{
            dataUser = JSON.parse(t);
            this.setState({ loaded: true });
            this.render;
        });
    }

    async submit(){
        var response = "";

        var dataBaru = JSON.parse("{ }");
        dataBaru.name = this.state.eventName;
        dataBaru.desc = this.state.eventDescription;
        dataBaru.category = this.state.eventCategory;
        dataBaru.datetime = this.finalDate("full");
        dataBaru.creator = dataUser.kodeuser;
        console.log(dataBaru);

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

        if(response != 'berhasil'){
            Alert.alert('Error', response);
            return;
        }
        console.log(response);

        this.setState({
            eventName:"",
            eventDescription:"",
            eventCategory:'Public',
            loaded: false,
            showDate: false,
            showTime: false,
            tulisan: "Everyone can join",
            showTulisan: false,
            year: fullDate.getFullYear(),
            month: fullDate.getMonth() + 1,
            date: fullDate.getDate(),
            hour: fullDate.getHours(),
            minute: fullDate.getMinutes()
        })
        
        this.props.navigation.navigate('My Event')
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
                    <View style={{ marginTop: 20, display: "flex", flexDirection: "row"}}>
                        <View style={{ display: "flex", flexDirection: "row", marginRight: wp("20%")}}>
                            <Text style={{fontSize: 14, color: '#49438D', marginRight: 3}}>
                                Date :
                            </Text>

                            <TouchableOpacity onPress={v => this.setState({ showDate: v })}>
                                <Text style={{fontSize: 14, color: 'grey'}}>
                                    {this.finalDate('justDate')}
                                </Text>
                            </TouchableOpacity>
                            {
                                this.state.showDate && (
                                    <DateTimePicker
                                        minimumDate={new Date()}
                                        mode="date"
                                        value={this.finalDate('fullDouble')}
                                        onChange={this.onChangeDate}
                                    />
                                )
                            }
                        </View>
                        <View style={{ display: "flex", flexDirection: "row"}}>
                            <Text style={{fontSize: 14, color: '#49438D', marginRight: 3}}>
                                Time :
                            </Text>

                            <TouchableOpacity onPress={v => this.setState({ showTime: v })}>
                                <Text style={{fontSize: 14, color: 'grey'}}>
                                    {this.finalDate('justTime')}
                                </Text>
                            </TouchableOpacity>
                            {
                                this.state.showTime && (
                                    <DateTimePicker
                                        minimumDate={new Date()}
                                        mode="time"
                                        is24Hour={true}
                                        display="spinner"
                                        value={this.finalDate('fullDouble')}
                                        onChange={this.onChangeTime}
                                    />
                                )
                            }
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Event Category</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Picker
                                selectedValue={this.state.eventCategory}
                                style={{ height: 50, width: 120 }}
                                onValueChange={value => {this.setState({ eventCategory: value }), this.showTulisan(value)}}
                            >
                                <Picker.Item label="Public" value="Public" />
                                <Picker.Item label="Private" value="Private" />
                            </Picker>
                            <Text style={{fontSize: 14, color: 'grey'}}>
                                { this.state.tulisan }
                            </Text>
                        </View>
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