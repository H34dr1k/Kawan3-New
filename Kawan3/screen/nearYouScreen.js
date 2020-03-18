import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
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

class communityScreen extends React.Component {
    static navigationOptions = {
        title: 'communitylScreen',
        header: null
    }
    render() {
        return (
            <AppFontLoader>
                <SafeAreaView style={s.container}>
                    <StatusBar barStyle="dark-content" barAnimation="slide" />
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
                        <TouchableOpacity style={{ flexDirection: "row", borderRadius: 20, backgroundColor: "#5956E5", padding: 10 }}
                            onPress={() => this.props.navigation.navigate("communityDetail1Screen")}
                        >
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


                </SafeAreaView>
            </AppFontLoader>
        );
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