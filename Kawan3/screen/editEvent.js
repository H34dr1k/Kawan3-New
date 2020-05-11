//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, Alert, Picker, Button, AsyncStorage } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import normalize from "react-native-normalize";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import dt from '../api'

var dat = new dt;
var image = dat.image();

var fullDate = new Date();
var eventData = [];

// create a component
export default class editEvent extends Component {

    state = {
        name:"",
        deskripsi:"",
        category:'Public',
        alamat:'',
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

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.load();
            this.render();
        })
    }

    async load(){
        await AsyncStorage.getItem('editEvent').then(rs => {
            eventData = JSON.parse(rs);
        });

        this.setState({ 
            loaded: true,
            name: eventData.name,
            deskripsi: eventData.desc,
            alamat: eventData.alamat,
            category: eventData.category
        })
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
        if (value == "Public") {
            this.setState({ tulisan: "Everyone can join this event" });
        } else {
            this.setState({ tulisan: "Only friends can join this event" });
        }
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

    async submit(){
        var response = "";

        var dataBaru = JSON.parse("{ }");
        dataBaru.name = this.state.name;
        dataBaru.desc = this.state.deskripsi;
        dataBaru.category = this.state.category;
        dataBaru.alamat = this.state.alamat;
        dataBaru.datetime = this.finalDate("full");
        // console.log(dataBaru);

        await fetch(dat.api() + "/api/event/" + eventData.id,
        {
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
            response = rd;
        })

        if(response != 'berhasil'){
            Alert.alert('Error', response);
            return;
        }
        // console.log(response);

        this.setState({
            name:"",
            deskripsi:"",
            alamat:"",
            category:'Public',
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

    render() {
        if(!this.state.loaded){
            return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        else{
            return (
                <ScrollView contentContainerStyle={{ justifyContent:"center" }} style={styles.container}> 
                    <View style={styles.awal}>
                        <TouchableOpacity style={{flex:2, marginRight:28}}>
                            <Image resizeMode="cover" style={{width:85, height:85, borderRadius:50,}} source={{ uri: image + eventData.preview }} />
                        </TouchableOpacity>

                        <View style={{flex:6}}>
                            <Text style={styles.judul}>Name:</Text>
                            <TextInput
                                style={{marginTop:12}}
                                keyboardType="default"
                                placeholder="Name of the Event"
                                selectionColor={"grey"}
                                underlineColorAndroid={"transparent"}
                                value={this.state.name}
                                onChangeText={text => {
                                    this.setState({ name: text });
                                }}
                            />
                            <View style={{flex:1, borderBottomColor:"black", borderBottomWidth:1, marginTop:12,}}></View>
                        </View>
                    </View>

                    <View style={styles.deskripsi}>
                        <Text style={styles.judul}>Description:</Text>
                        <View>
                            <TextInput
                                keyboardType="default"
                                placeholder="What's the Description"
                                selectionColor={"white"}
                                underlineColorAndroid={"transparent"}
                                value={this.state.deskripsi}
                                onChangeText={text => {
                                    this.setState({ deskripsi: text });
                                }}
                                style={{ width: '100%', height: hp('15%'), backgroundColor: 'transparent', borderBottomColor: 'black', borderBottomWidth: 1 }}
                            />
                        </View>
                    </View>

                    <View style={{marginTop:24}}>
                        <Text style={styles.judul}>Address:</Text>
                        <View style={{marginTop:12}}>
                            <TextInput
                                keyboardType="default"
                                placeholder="Location of the Event"
                                selectionColor={"grey"}
                                underlineColorAndroid={"transparent"}
                                value={this.state.alamat}
                                onChangeText={text => {
                                    this.setState({ alamat: text });
                                }}
                            />
                            <View style={{ flex: 1, borderBottomColor: "black", borderBottomWidth: 1, marginTop: 12, }}></View>
                        </View>
                    </View>

                    <View style={{ marginTop: 24, display: "flex", flexDirection: "row"}}>
                        <View style={{ display: "flex", flexDirection: "row", marginRight: wp("20%")}}>
                            <Text style={styles.judul}>
                                Date :
                            </Text>

                            <TouchableOpacity onPress={v => this.setState({ showDate: v })}>
                                <Text style={{fontSize: 18, color: 'grey', marginLeft: 5}}>
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
                            <Text style={styles.judul}>
                                Time :
                            </Text>

                            <TouchableOpacity onPress={v => this.setState({ showTime: v })}>
                                <Text style={{fontSize: 18, color: 'grey', marginLeft: 5}}>
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

                    <View style={{marginTop:24}}>
                        <Text style={styles.judul}>Category:</Text>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Picker
                                    selectedValue={this.state.category}
                                    style={{ height: 50, width: 120 }}
                                    onValueChange={value => { this.setState({ category: value }), this.showTulisan(value) }}
                                >
                                    <Picker.Item label="Public" value="Public" />
                                    <Picker.Item label="Private" value="Private" />
                                </Picker>
                                <Text style={{ fontSize: 14, color: 'grey' }}>
                                    {this.state.tulisan}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity 
                        style={{ backgroundColor:"#F8B814", justifyContent:"center", borderRadius:12, alignContent:"center", padding:16, marginTop: hp('8%') }}
                        onPress={() => this.submit()}>
                            <Text style={{textAlign:"center", fontSize: hp('3%'),fontWeight:"bold"}}>Done!</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,    
        marginTop:28,
        marginHorizontal:28,
    },
    awal: {
        flexDirection:"row",
        marginBottom: 42,
    },
    judul:{
        fontWeight:"bold",
        fontSize:18,
    }
});

//make this component available to the app
