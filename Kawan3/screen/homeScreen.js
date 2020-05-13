import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
  AppState,
  AsyncStorage,
  StatusBar,
  BackHandler,
  ActivityIndicator
} from "react-native";
import { createAppContainer } from "react-navigation";

import "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as firebase from 'firebase';
import homeScreen1 from "./homeScreen1";
import dt from "../api";

var datauser = [];
var events = [];

var dat = new dt;
var api = dat.api();
var images = dat.image();
var user = dat.user();

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var fullDay = "";

var day = days[new Date().getDay()];
var date = new Date().getDate();
var month = months[new Date().getMonth()];
var year = new Date().getFullYear();

fullDay = day + ", " + date + " " + month + " " + year;

export default class homeScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = { loaded : false }
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.setState({ loaded: false });
            this.load();
        });
    }

    async load(){
        await AsyncStorage.getItem("datauser").then((t) => {
            datauser = JSON.parse(t);
        });

        await fetch(api + '/api/eventRec/' + datauser.kodeuser)
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            // console.log(rd);
            if(rd == "[]"){
                this.setState({ loaded:true });
                this.render();
                return;
            }
            if(rd.indexOf('"id":') == -1 && rd.indexOf('"name":') == -1 && rd.indexOf('"desc":') == -1){
                Alert.alert('Error', rd);
                return;
            }
            events = JSON.parse(rd);
            // console.log(events);
        })
        
        this.setState({ loaded:true });
        this.render();
    }

    async joinEvent(id){
        var dataBaru = JSON.parse('{ }');
        dataBaru.idEvent = id;
        dataBaru.attendees = datauser.kodeuser;

        await fetch(api + '/api/joinEvent/' + id + '/' + datauser.kodeuser, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataBaru)
        })
        .then(rd => {
            return rd.text();
        })
        .then(rs => {
            if(rs != "berhasil"){
                Alert.alert('Error', rs);
                return;
            }
        })
            
        this.setState({ loaded: false });
        this.load();
    }
    
    render() {
        if(!this.state.loaded){
            return (
                <View style={{ flex:1, alignItems: "center", justifyContent:"center"}}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }else{
            return (
                <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
                    <StatusBar barStyle="light-content"></StatusBar>
                    <ScrollView>
                    
                    <View style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        backgroundColor: '#E5E5E5',}}>

                        <Text style={{ fontWeight: 'bold', fontSize: hp('3%'), color: '#526EDD', marginTop: hp('2%'), marginLeft: wp('5%') }}>
                            Home
                        </Text>
                        <View style={{ flexDirection: "row", marginTop: StatusBar.currentHeight, marginHorizontal: wp("4%") }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push("My Event")}>
                            <Image
                                resizeMode="contain"
                                style={{ marginRight: 13, width:48, height:48 }}
                                source={require("../src/img/MyEvent.png")}
                            />
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("History")}
                            >
                            <Image
                                source={require("../src/image/History.png")}
                                style={{ marginRight: 13, width: 48, height: 48 }}
                            />
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => this.props.navigation.push("Notification")}
                            >
                            
                            <Image 
                                style={{ width: 48, height: 48}}
                            source={require("../src/image/Notif.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{
                        flex: 0,
                        flexDirection: "row",
                        marginTop: 20,
                        borderRadius: 15,
                        marginHorizontal: 17,
                        backgroundColor: "#50A5D3",
                        }}
                    >
                        {/* <View style={{ borderRadius: '50%', overflow: 'hidden', width:wp('12%'), height:hp('12%') }} > */}
                            <Image
                            source={{ uri: user + datauser.picture }}
                            resizeMode="center"
                            style={{marginLeft:15, width:wp('12%'), height:hp('12%'), borderRadius: 75 }}
                            />
                        {/* </View> */}
                        <View style={{ marginLeft: 15, marginTop: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                                Hello, { datauser.name }!
                            </Text> 
                            <Text style={{ fontSize: 18, marginTop: 5, color: "white" }}>
                                { fullDay }
                            </Text> 
                            <Text style={{ fontSize: 16, marginTop: 5, color: "#f0f0f0" }}>
                                { datauser.desc }
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0, marginHorizontal: 17, marginTop: 30 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
                        Event you might like
                        </Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: "row" }}>
                            {
                                eventList = events.map(item => (
                                    <View
                                        style={{
                                        marginRight: 18,
                                        height: 230,
                                        width: 183,
                                        backgroundColor: "white",
                                        borderRadius: 15,
                                        alignItems: "center",
                                        justifyContent: "center"
                                        }}
                                        key={item.id}>

                                        <View style={{ alignItems: "center", paddingTop: 10 }}>
                                            <Image style={{width:wp('20%'), height:wp('20%')}} source={{ uri: images + "/image/Event1.png"}} />
                                            <Text>
                                                { item.name }
                                            </Text>
                                        </View>
                                        <View
                                        style={{
                                            flexDirection: "row",
                                            flex: 0,
                                            justifyContent: "center"
                                        }}>
                                            <Image resizeMode="contain" style={{ width: wp('3%'), height: wp('3%') }} source={{ uri: images + "/image/Sign.png"}} />
                                            <Text style={{ fontSize: 11, color: "gray" }}>
                                                { item.alamat }
                                            </Text>
                                        </View>

                                        <View
                                        style={{
                                            flexDirection: "row",
                                            marginHorizontal: 10,
                                            marginTop: 4
                                        }}>
                                            {/* <View style={{ flex: 1, height: 40, width: 80 }}>
                                                <Text style={{ color: "gray", fontSize: 11 }}>
                                                    Distance
                                                </Text>

                                                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                                                    524 meters
                                                </Text>
                                            </View> */}
                                            <View style={{ flex: 1, height: 40, width: 80, flexDirection: "row", justifyContent:'center' }}>
                                                <Text style={{ color: "gray", fontSize: 12, marginRight: wp('0.5%') }}>
                                                    Member : 
                                                </Text>
                                                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                                                    { item.memberCount } Member
                                                </Text>
                                            </View>

                                        </View>
                                        <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => this.joinEvent(item.id)}
                                                style={{
                                                width: 70,
                                                height: 30,
                                                backgroundColor: "#50A5D3",
                                                marginRight: 18,
                                                borderRadius: 4
                                                }}>

                                                <Text
                                                style={{
                                                    textAlign: "center",
                                                    marginTop: 5,
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                    color: "white"
                                                }}>
                                                    Join Now
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity>
                                                <Text style={{ fontSize: 11, color: "gray", marginRight: 10 }}>
                                                    View More
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 17, marginTop: 40 }}>
                        <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 15
                        }}
                        >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            May You Like Community
                        </Text>
                        <TouchableOpacity>
                            <Text style={{ color: "#526EDD", fontWeight: "bold" }}>
                            Show All
                            </Text>
                        </TouchableOpacity>
                        </View>
                        <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                        >
                        <View
                            style={{
                            height: 103,
                            width: 55,
                            backgroundColor: "#576EC9",
                            borderRadius: 50,
                            marginRight: 10,
                            justifyContent: "center",
                            alignItems: "center"
                            }}
                        >
                            <TouchableOpacity>
                            <Image resizeMode="contain" style={{ width: wp('9%'), height: wp('9%') }} source={{ uri: images + "/image/btnAdd.png"}} />
                            </TouchableOpacity>
                            <Image resizeMode="contain" style={{ width: wp('20%'), height: wp('20%') }} source={{ uri: images + "/image/book1.png"}} />
                        </View>
                        <View
                            style={{
                            height: 103,
                            width: 55,
                            backgroundColor: "#576EC9",
                            borderRadius: 50,
                            marginRight: 10,
                            justifyContent: "center",
                            alignItems: "center"
                            }}
                        >
                            <TouchableOpacity>
                            <Image resizeMode="contain" style={{ width: wp('9%'), height: wp('9%') }} source={{ uri: images + "/image/btnAdd.png"}} />
                            </TouchableOpacity>
                            <Image  resizeMode="contain" style={{ width: wp('20%'), height: wp('20%') }} source={{ uri: images + "/image/gitar1.png"}} />
                        </View>
                        <View
                            style={{
                            height: 103,
                            width: 55,
                            backgroundColor: "#576EC9",
                            borderRadius: 50,
                            marginRight: 10,
                            justifyContent: "center",
                            alignItems: "center"
                            }}
                        >
                            <TouchableOpacity>
                            <Image resizeMode="contain" style={{ width: wp('9%'), height: wp('9%') }} source={{ uri: images + "/image/btnAdd.png"}} />
                            </TouchableOpacity>
                            <Image  resizeMode="contain" style={{ width: wp('20%'), height: wp('20%') }} source={{ uri: images + "/image/brain1.png"}} />
                        </View>
                        <View
                            style={{
                            height: 103,
                            width: 55,
                            backgroundColor: "#576EC9",
                            borderRadius: 50,
                            marginRight: 10,
                            justifyContent: "center",
                            alignItems: "center"
                            }}
                        >
                            <TouchableOpacity>
                            <Image resizeMode="contain" style={{ width: wp('9%'), height: wp('9%') }} source={{ uri: images + "/image/btnAdd.png"}} />
                            </TouchableOpacity>
                            <Image resizeMode="contain" style={{ width: wp('20%'), height: wp('20%') }} source={{ uri: images + "/image/blood1.png"}} />
                        </View>
                        <TouchableOpacity>
                            <Image style={{ width: wp('20%'), height: wp('20%') }} source={{ uri: images + "/image/btnNext.png"}} />
                        </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

const s = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        flex: 1
    }
})