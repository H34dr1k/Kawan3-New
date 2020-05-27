import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, SafeAreaView, StatusBar, FlatList, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

import Text from "../components/customText.js";
import { AppFontLoader } from "../components/AppFontLoader.js";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Directions } from "react-native-gesture-handler";

import normalize from "react-native-normalize";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import firebase from "firebase";

import dt from '../api'

var dat = new dt;
var api = dat.api();
var image = dat.image();
var user = dat.image();

var dataUser = [];

var community = [];

class communityScreen extends React.Component {

    static navigationOptions = {
        title: 'communitylScreen',
        header: null
    }

    state = {
        loaded: false,
        emptyComm: false
    }

    componentDidMount(){
        this.load();
        this.props.navigation.addListener('focus', () => {
            this.load();
        });
    }

    async load(){
        community = [];

        await AsyncStorage.getItem('datauser').then(rd => {
            dataUser = JSON.parse(rd);
        })

        await fetch(api + '/api/commNotCreator/' + dataUser.kodeuser)
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            rd == '[]' ? this.setState({ emptyComm: true }) : this.setState({ emptyComm: false });
            if(rd == '[]'){
                this.setState({ loaded: true });
                this.render();
                return;
            }

            if(rd.indexOf('"id":') == -1){
                Alert.alert('Error', rd);
                return;
            }

            community = JSON.parse(rd);
        })

        await this.distance();

        this.setState({ loaded: true });
        this.render();
    }

    distance(){
        const lat1 = dataUser.latitude;
        const lon1 = dataUser.longitude;
        for (let i = 0; i < community.length; i++) {
            const lat2 = community[i].latitude;
            const lon2 = community[i].longitude;

            const R = 6371e3; // metres
            const φ1 = lat1 * Math.PI/180; // φ, λ in radians
            const φ2 = lat2 * Math.PI/180;
            const Δφ = (lat2-lat1) * Math.PI/180;
            const Δλ = (lon2-lon1) * Math.PI/180;

            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            const d = R * c; // in metres

            const e = Math.round((d/1000) * 100) / 100; // in kilometres

            community[i].distance = e;
        };
    }

    render() {
        if(!this.state.loaded){
            return(
                <View style={{ flex: 1 }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }else{
            return (
                <AppFontLoader>
                    <SafeAreaView style={s.container}>
                        <StatusBar barStyle="light-content" />
                        {/* <View style={s.atas}>
                            <View
                                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
                            >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("homeScreen")}>
                                    <Image source={require("../src/img/back.png")}></Image>
                                </TouchableOpacity>
    
                                <Text type="rbold" style={s.atas1}>
                                    Community
                  </Text>
                            </View>
                            <Image style={{ marginRight: wp('4%') }} source={require("../src/img/more.png")}></Image>
                        </View> */}
    
                        {/* <View style={{ flex: 1 }}>
    
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                <TouchableOpacity style={{ borderRadius: 20, backgroundColor: "#F7B815", paddingHorizontal: wp('1%'), paddingVertical: hp('0.5%'), width: wp("25%"), }}>
                                    <Text type="rbold" style={{ textAlign: "center", fontSize: hp("2%") }}>Near You</Text>
                                </TouchableOpacity>
    
                                <TouchableOpacity style={{ width: wp("25%"), }}>
                                    <Text type="rbold" style={{ textAlign: "center", color: "#A5AFA5", fontSize: hp("2%") }}>Trending</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: wp("25%"), }}>
                                    <Text type="rbold" style={{ textAlign: "center", color: "#A5AFA5", fontSize: hp("2%") }}>Most Joined</Text>
                                </TouchableOpacity>
    
                            </View>
                        </View> */}
    
                        <View style={{ flex: 3, marginTop: hp("-1.250%") }}>
                            {
                                this.state.emptyComm && (
                                    <View>
                                        <Text style={{ color: 'grey', textAlign: 'center' }} >
                                            There's no nearby community you can join...
                                        </Text>
                                    </View>
                                )
                            }
                            <FlatList
                            style={{width:'100%'}}
                            keyExtractor={item => item.key}
                            data={community}
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity key={item.key} style={{ flexDirection: "row", borderRadius: 20, backgroundColor: "#5956E5", padding: 10 }}
                                        onPress={() => {
                                            // AsyncStorage.setItem('comm', item.id);
                                            // this.props.navigation.navigate("communityDetail1Screen");

                                            Alert.alert('Join Community', 'Do you want to join this communiy?', [
                                                {
                                                    text: 'No'
                                                },
                                                {
                                                    text: 'Yes',
                                                    onPress: async () => {
                                                        await fetch(api + '/api/joinComm/' + item.id + '/' + dataUser.kodeuser, { method: "POST" })
                                                        .then(rd => {
                                                            return rd.text();
                                                        })
                                                        .then(rs => {
                                                            if(rs != "berhasil"){
                                                                Alert.alert('Error', rs);
                                                                return;
                                                            }

                                                            Alert.alert('Success!', 'You have successfully joined this community!');
                                                        })

                                                        this.setState({ loaded: false });
                                                        this.load();
                                                    }
                                                }
                                            ]);
                                        }}
                                    >
                                        <View style={{ flex: 1, justifyContent: "center", marginRight: wp('2%') }}>
                                            <Image style={{width:80, height:80}} source={{ uri: image + item.profile}} />
                                        </View>
    
                                        <View style={{ flex: 3, flexDirection: "column", justifyContent: "space-evenly" }}>
                                            <Text type="rbold" style={{ color: "white", fontSize: hp('2%') }}>
                                                { item.name }
                                            </Text>
    
                                            <View style={{ flexDirection: "row" }}>
                                                {/* <Image resizeMode="contain" style={{ width: wp('12%'), height: hp('4%') }} source={require("../src/img/anggotaList.png")} /> */}
                                                <Text style={{ color: "white", fontSize: hp('2%'), marginRight: wp("2%") }}>
                                                    { item.memberCount } Members
                                                </Text>
                                                <Text style={{ color: "white", fontSize: hp('2%'), marginRight: wp("2%") }}>
                                                    { item.distance } KM away
                                                </Text>
                                            </View>
                                        </View>
    
                                        <View style={{ flex: 1, justifyContent: "center" }}>
                                            <Image source={require("../src/img/arrow2.png")} style={{ width: wp("5%"), height: hp("5%"), resizeMode: "contain" }} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}/>
                        </View>
    
    
                    </SafeAreaView>
                </AppFontLoader>
            );
        }
    }
}

export default communityScreen;

const s = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        marginHorizontal: wp("3%")
    },
    atas: {
        flexDirection: "row",
        flex: 0.5,
        alignItems: "center",
        alignSelf: "flex-start",
        height: hp("10%")
    },
    atas1: {
        fontSize: hp("3%")
    }
});