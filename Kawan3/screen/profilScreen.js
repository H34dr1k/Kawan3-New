import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView,StatusBar, BackHandler, AsyncStorage, ActivityIndicator, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import FacePile from "react-native-face-pile";

import * as firebase from 'firebase';

import normalize from "react-native-normalize";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { useIsFocused } from "@react-navigation/native";

import * as IP from 'expo-image-picker';

import dt from '../api';

var data = new dt;
var image = data.image();
var api = data.api();
var user = data.user();

var datauser = [];

var events = [];
var joinedEvent = [];
var friends = [];

var FACES = [];

export default class profilScreen extends React.Component {

    static navigationOptions = {
        title: 'profilScreen',
        header: null
    }

    state = {
        loaded: false,
        emptyEvent: false,
        emptyFriend: false
    }

    componentDidMount(){
        this.setState({ loaded: false });
        this.load();
        this.props.navigation.addListener('focus', () => {
            this.setState({ loaded: false });
            this.load();
        });
    }

    async load(){
        joinedEvent = [];
        friends = [];
        
        await AsyncStorage.getItem('datauser')
        .then(rd => {
            datauser = JSON.parse(rd);
        });

        await fetch(api + '/api/joinedEvent/' + datauser.kodeuser)
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            rd == "[]" ? this.setState({ emptyEvent: true }) : this.setState({ emptyEvent: false });
            if(rd == "[]"){
                return;
            }
            else if(rd.indexOf('[{"id":') == -1){
                Alert.alert('Error', rd);
                return;
            }
            
            joinedEvent = JSON.parse(rd);
        })

        await fetch(api + '/api/getFriends/' + datauser.kodeuser)
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            rd == "[]" ? this.setState({ emptyFriend: true }) : this.setState({ emptyFriend: false });
            if(rd == "[]"){
                return;
            }
            else if(rd.indexOf('"kodeuser":') == -1 || rd.indexOf('"name":') == -1){
                Alert.alert('Error', rd);
                return;
            }

            friends = JSON.parse(rd);
        })

        this.loadFaces();
        // console.log(FACES);
        // return;

        this.setState({ loaded: true });
        this.render();
    }
    
    loadFaces(){
        FACES = [];
        for (let i = 0; i < friends.length; i++) {
            FACES.push({
                id : 'face' + i,
                imageUrl : `${user + friends[i].picture}`
            });
        }
        console.log(FACES);
    }

    imagePress = async () => {
        try{
            let result = await IP.launchImageLibraryAsync({
                mediaTypes: IP.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
            if(!result.cancelled){
                Alert.alert('Image URI', result.uri);
            }
        }catch{

        }
    }

    async onLogOutPress() {
        var dataBaru = JSON.parse("{ }");
        dataBaru.loggedIn = 0;
        dataBaru.status = "logout";

        fetch(api + "/api/user/" + datauser.kodeuser, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataBaru)
        })
        .then(rd => {
            return rd.text();
        })
        .then(a => {
            AsyncStorage.removeItem('datauser');
        });
        
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    async showDetail(idEvent){
        console.log('before');
        await AsyncStorage.setItem('dataEvent', `${idEvent}`);
        this.props.navigation.navigate('Event Detail');
    }

    renderDesc(desc){
        if(desc.length > 15){
            var a = "";
            for (let i = 0; i < 15; i++) {
                a += desc[i];
            }
            a += "...";

            return a
        }
        return desc
    }

    render() {
        // const FACES = [
        //   {
        //     id: 0,
        //     imageUrl:
        //       "https://s3.amazonaws.com/uifaces/faces/twitter/vista/128.jpg"
        //   },
        //   {
        //     id: 1,
        //     imageUrl:
        //       "http://www.yojackets.com/wp-content/uploads/2016/04/Civil-War-Scarlet-Witch-Red-Coat-1.jpg"
        //   },
        //   {
        //     id: 2,
        //     imageUrl:
        //       "https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg"
        //   },
        //   {
        //     id: 3,
        //     imageUrl:
        //       "https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg"
        //   },
        //   {
        //     id: 4,
        //     imageUrl:
        //       "https://pbs.twimg.com/profile_images/885357926373654528/4tGgnF71_bigger.jpg"
        //   }
        // ];

        if(!this.state.loaded){
            return (
                <View style={{ flex:1, alignItems: "center", justifyContent:"center"}}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
        else{
            const { navigate } = this.props.navigation;
            return (
                <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" barAnimation="slide"></StatusBar>
                    <ScrollView>
                        <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between',
                            backgroundColor: '#49438D',}}>
                                
                                
                            <Text style={{ fontWeight: 'bold', fontSize: hp('3%'), color: 'white', marginTop: hp('2%'), marginLeft: wp('5%') }}>
                                Profile
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("settingScreen")} >
                                <Image source={require('../src/image/btnSetting.png')}
                                    style={{marginTop:hp('1.5%'), marginRight:wp('1.5%')}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0, backgroundColor: '#49438D', height: 229, paddingTop: 26.5, }}>
                            <ImageBackground source={require('../src/image/decoStar.png')} style={{flex:1, width: '100%', height: '100%', flexDirection: 'row', paddingHorizontal:wp('2%')  }} />
                        </View>
                        <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#F0F0F0', borderTopLeftRadius: 35, borderTopRightRadius: 35, marginTop: -105 }}>
                            <View style={{flex:1, marginHorizontal: 26, flexDirection: 'row' }}>


                                <View style={{flex:1,width:'100%'}}>
                                    <TouchableOpacity
                                        style={{ marginTop: 33, height: 28, width: '100%', backgroundColor: '#F84B14', borderRadius: 7 }}
                                    onPress={() => this.onLogOutPress() }>
                                    <Text style={{ marginTop: 5, textAlign: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>Log Out</Text>
                                    </TouchableOpacity>
                            </View>

                            

                                <View style={{flex:2,alignItems:"center",marginTop:-75}}>
                                    <TouchableOpacity onPress={() => this.imagePress()}>
                                        <Image source={{ uri : user + datauser.picture }} resizeMode='center' style={{ width: 150, height: 150, borderRadius: 75 }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 1,width:'100%' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfil')} style={{ height: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8B814', marginTop: 33, borderRadius: 7, flexDirection: 'row' }}>
                                    <Image style={{width:10, height:10}} style={{marginLeft: -7}} source={require('../src/image/iconEdit.png')} />
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Edit</Text>
                                </TouchableOpacity>
                                </View>
                            
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 26, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#526EDD', textAlign: 'center' }}>{ datauser.name }</Text>
            <Text style={{ fontSize: 13, color: 'gray', textAlign: 'center' }}>{ datauser.desc }</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#E8E8E8', marginTop: 20, marginBottom: 15 }}></View>
                        <View style={{ marginHorizontal: 26 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#526EDD', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Friends</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('All Friends')}>
                                    <Text style={{ color: '#FBB429', fontWeight: 'bold', fontSize: 12, marginTop: 5 }}>Show All</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                
                                {
                                    this.state.emptyFriend && (
                                        <View>
                                            <Text style={{ color: 'grey' }} >
                                                You don't have friend. But don't be so sad about it :)
                                            </Text>
                                        </View>
                                    )
                                }

                                <FacePile numFaces={FACES.length} faces={FACES} circleSize={25}/>
                                {/* <View>
                                    <TouchableOpacity>
                                        <Image source={require('../src/image/Friend1.png')} style={{ marginRight: 10 }} />
                                    </TouchableOpacity>
                                    <Text style={{ color: 'gray' }}>Lisa</Text>
                                </View>
                                <View>
                                    <TouchableOpacity>
                                        <Image source={require('../src/image/Friend2.png')} style={{ marginRight: 10 }} />
                                    </TouchableOpacity>
                                    <Text style={{ color: 'gray' }}>John</Text>
                                </View>
                                <View>
                                    <TouchableOpacity>
                                        <Image source={require('../src/image/Friend3.png')} style={{ marginRight: 10 }} />
                                    </TouchableOpacity>
                                    <Text style={{ color: 'gray' }}>Shion</Text>
                                </View>
                                <View style={{ width: 45, height: 45, backgroundColor: '#628DE7', borderRadius: 50 }}>
                                    <TouchableOpacity>
                                        <Text style={{ textAlign: 'center', marginTop: 8, fontWeight: 'bold', color: 'white', fontSize: 20 }}>+5</Text>
                                    </TouchableOpacity>
                                </View> */}
                            </View>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#E8E8E8', marginTop: 20, marginBottom: 15 }}></View>
                        <View style={{marginHorizontal: 26}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{color: '#526EDD', fontSize: 18, fontWeight: 'bold', marginBottom: 15}}>My Hobby</Text>
                                <TouchableOpacity>
                                    <Text style={{color: '#FBB429', fontWeight: 'bold', fontSize: 12, marginTop: 5}}>More</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity>
                                    <View style={{width: 100, height: 25, backgroundColor: 'lightgreen', borderRadius: 14, marginRight: 10}}>
                                        <Text style={{color: 'white', textAlign: 'center', justifyContent: 'center'}}>Football</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={{width: 100, height: 25, backgroundColor: 'lightblue', borderRadius: 14}}>
                                        <Text style={{color: 'white', textAlign: 'center'}}>Progamming</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    <View style={{borderWidth: 1, borderColor: '#E8E8E8', marginTop: 20, marginBottom: 15}}></View>
                        <View style={{ marginHorizontal: 26 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#526EDD', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Community</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: '#FBB429', fontWeight: 'bold', fontSize: 12, marginTop: 5 }}>Show All</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                                <View style={{ marginBottom: 20, marginRight: 15, width: 235, height: 96, borderRadius: 10, backgroundColor: '#E5E5E5', flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Image source={require('../src/image/Community1.png')} style={{ margin: 10, width:wp('10%'), height:hp('5%') }} />
                                    </View>
                                    <View style={{ flex: 2 }}>
                                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>KOMUNITAS KARATE</Text>
                                            
                                        </View>
                                        <View style={{ width: 51, height: 19, backgroundColor: '#21D348', borderRadius: 19 }}>
                                            <Text style={{ color: 'white', fontSize: 11, textAlign: 'center' }}>37 Chat</Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ color: 'gray', fontSize: 12 }}>16 Anggota</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity>
                                            <Image style={{ width: wp('2%'), height: hp('2%')}} source={require('../src/image/Arrow.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ width: 235, height: 96, borderRadius: 10, backgroundColor: '#E5E5E5', flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Image source={require('../src/image/Community2.png')} style={{ margin: 10, width: wp('10%'), height: hp('5%') }} />
                                    </View>
                                    <View style={{ flex: 2 }}>
                                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>POINT BLANK</Text>
                                            
                                        </View>
                                        <View style={{ width: 51, height: 19, backgroundColor: '#21D348', borderRadius: 19 }}>
                                            <Text style={{ color: 'white', fontSize: 11, textAlign: 'center' }}>37 Chat</Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ color: 'gray', fontSize: 12 }}>16 Anggota</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity>
                                            <Image style={{ width: wp('2%'), height: hp('2%') }} source={require('../src/image/Arrow.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{borderWidth: 1, borderColor: '#E8E8E8', marginTop: 20, marginBottom: 15}}></View>
                        <View style={{ marginHorizontal: 26 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#526EDD', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Joined Events</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Joined Event')  }>
                                    <Text style={{ color: '#FBB429', fontWeight: 'bold', fontSize: 12, marginTop: 5 }}>Show All</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row'  }}>
                                {
                                    this.state.emptyEvent && (
                                        <View>
                                            <Text style={{ color: 'grey' }} >
                                                You haven't joined any event yet...
                                            </Text>
                                        </View>
                                    )
                                }

                                {
                                    eventList = joinedEvent.map(eventData => (
                                        <TouchableOpacity 
                                            onPress={() => this.showDetail(eventData.id) }
                                            key={eventData.id}>
                                            <View style={{ marginBottom: 20, marginRight: 15, width: 235, height: 80, borderRadius: 10, backgroundColor: '#E5E5E5', flexDirection: 'row' }}>
                                                <View style={{ flex: 1, alignSelf: 'center' }}>
                                                    <Image source={{ uri : image + eventData.profile}} style={{ margin: 10, width:wp('10%'), height:hp('5%'), borderRadius: 45 }} />
                                                </View>
                                                <View style={{ flex: 2 }}>
                                                    <View style={{ marginTop: 15 }}>
                                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                                            { eventData.name }
                                                        </Text>
                                                    </View>
                                                    {/* <View style={{ width: 51, height: 19, backgroundColor: '#21D348', borderRadius: 19 }}>
                                                        <Text style={{ color: 'white', fontSize: 11, textAlign: 'center' }}>37 Chat</Text>
                                                    </View> */}
                                                    <View style={{ marginTop: 2 }}>
                                                        <Text style={{ color: 'gray', fontSize: 12 }}>
                                                            { this.renderDesc(eventData.desc) }
                                                        </Text>
                                                    </View>
                                                    <View style={{ marginTop: 3 }}>
                                                        <Text style={{ color: 'gray', fontSize: 12 }}>
                                                            { eventData.memberCount } Attendees
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image style={{ width: wp('2%') + 2, height: hp('2%')}} source={{ uri: image + '/image/Arrow.png'}} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                        </View>
                        {/* <View style={{borderWidth: 1, borderColor: '#E8E8E8', marginTop: 20, marginBottom: 15}}></View>
                        <View style={{ marginHorizontal: 26 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#526EDD', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>My Events</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('My Event')  }>
                                    <Text style={{ color: '#FBB429', fontWeight: 'bold', fontSize: 12, marginTop: 5 }}>Show All</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row'  }}>
                                {
                                    eventList = events.map(eventData => (
                                        <TouchableOpacity key={eventData.id}>
                                            <View style={{ marginBottom: 20, marginRight: 15, width: 235, height: 80, borderRadius: 10, backgroundColor: '#E5E5E5', flexDirection: 'row' }}>
                                                <View style={{ flex: 1, alignSelf: 'center' }}>
                                                    <Image source={{ uri : image + eventData.profile}} style={{ margin: 10, width:wp('10%'), height:hp('5%'), borderRadius: 45 }} />
                                                </View>
                                                <View style={{ flex: 2 }}>
                                                    <View style={{ marginTop: 15 }}>
                                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                                            { eventData.name }
                                                        </Text>
                                                    </View>
                                                    {/* <View style={{ width: 51, height: 19, backgroundColor: '#21D348', borderRadius: 19 }}>
                                                        <Text style={{ color: 'white', fontSize: 11, textAlign: 'center' }}>37 Chat</Text>
                                                    </View> 
                                                    <View style={{ marginTop: 2 }}>
                                                        <Text style={{ color: 'gray', fontSize: 12 }}>
                                                            { this.renderDesc(eventData.desc) }
                                                        </Text>
                                                    </View>
                                                    <View style={{ marginTop: 3 }}>
                                                        <Text style={{ color: 'gray', fontSize: 12 }}>
                                                            { eventData.memberCount } Member
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image style={{ width: wp('2%') + 2, height: hp('2%')}} source={{ uri: image + '/image/Arrow.png'}} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                        </View> */}
                    </ScrollView>

                </View>
            );
        }
    }
}
