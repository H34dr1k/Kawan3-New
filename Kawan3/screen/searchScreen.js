import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

import normalize from "react-native-normalize";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

export const searchScreen = ({ }) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0, backgroundColor: '#4FB5D6', height: 273, paddingTop: 26.5 }}>
                <ImageBackground source={require('../src/image/banner3.png')} style={{ width: '100%', height: '100%' }}>
                    <TouchableOpacity>
                        <Image source={require('../src/image/arrowBack.png')} />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 31 }}>
                        <Text style={{ fontSize: 38, fontWeight: 'bold', color: 'white' }}>Let's Explore</Text>
                        <Text style={{ fontSize: 14, color: 'white' }}>Try to find a friend</Text>
                    </View>
                    <View style={{ marginHorizontal: 31, marginTop: 40 }}>
                        <TextInput placeholder="Try to find a hobby or friend" style={{ height: 41, paddingLeft: 40, paddingRight: 20, borderWidth: 1, borderColor: 'white', backgroundColor: 'white', borderRadius: 50 }} />
                        <Image source={require('../src/image/search-icon.png')} style={{ position: 'absolute', top: 10, left: 10 }} />
                    </View>
                </ImageBackground>
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
                
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
            </View>
        </View>
    );

}
