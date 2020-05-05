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

class mostJoinedScreen extends React.Component {
    static navigationOptions = {
        title: 'mostJoinedlScreen',
        header: null
    }
    render() {
        return (
            <AppFontLoader>
                <SafeAreaView style={s.container}>
                    <StatusBar barStyle="light-content" />
                    <View style={s.tengah}>
                        <Text>Screen mostJoined</Text>
                    </View>

                </SafeAreaView>
            </AppFontLoader>
        );
    }
}

export default mostJoinedScreen;

const s = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        marginHorizontal: wp("3%")
    },
    tengah: {
        justifyContent: "center",
        alignItems: "center",
        height: hp("10%")
    }
});