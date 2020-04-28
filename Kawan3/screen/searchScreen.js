import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, ImageBackground, ScrollView, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import dt from '../api';

var datauser = [];

class searchScreen extends React.Component{
    
    componentDidMount() {
        
    }

    users = () => {

    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={{ flex: 0, backgroundColor: '#4FB5D6', height: 225 }}>
                    <ImageBackground source={require('../src/image/banner3.png')} style={{ width: '100%', height: '100%' }}>
                        <View style={{ marginHorizontal: 31, marginTop: 25 }}>
                            <Text style={{ fontSize: 38, fontWeight: 'bold', color: 'white' }}>Let's Explore</Text>
                            <Text style={{ fontSize: 14, color: 'white' }}>Try to find a friend</Text>
                        </View>
                        <View style={{ marginHorizontal: 25, marginTop: 40 }}>
                            <TextInput placeholder="Try to find a hobby or friend" style={{ height: 41, paddingLeft: 40, paddingRight: 20, borderWidth: 1, borderColor: 'white', backgroundColor: 'white', borderRadius: 50 }} />
                            <Image source={require('../src/image/search-icon.png')} style={{ position: 'absolute', top: 10, left: 10 }} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 3, marginTop: hp("2%"), marginLeft: wp("4%"), marginRight: wp('4%') }}>
                    <TouchableOpacity style={{ flexDirection: "row", borderRadius: 20, backgroundColor: "#5956E5", padding: 10 }}>
                        <View style={{ flex: 1, justifyContent: "center", marginRight: wp('2%') }}>
                            <Image source={require("../src/img/picEvent.png")} />
                        </View>
    
                        <View style={{ flex: 3, flexDirection: "column", justifyContent: "space-evenly" }}>
                            <Text type="rbold" style={{ color: "white", fontSize: hp('2%') }}>KOMUNITAS GITAR</Text>
    
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../src/img/anggotaList.png")} />
                                <Text style={{ color: "white", fontSize: hp('2%'), marginLeft: wp("2%") }}>7 Anggota</Text>
                            </View>
                        </View>
    
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Image source={require("../src/img/arrow2.png")} style={{ width: wp("5%"), height: hp("5%"), resizeMode: "contain" }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default searchScreen;

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