import React from "react";

import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StatusBarStyle,
    Platform,
    View,
    Button,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    ToastAndroid
} from "react-native";

import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import Text from "../components/customText.js";
import { AppFontLoader } from "../components/AppFontLoader.js";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Directions } from "react-native-gesture-handler";

import normalize from "react-native-normalize";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { notifications } from "expo";
import * as Permissions from "expo-permissions";
import firebase from "firebase";

class communityDetail1Screen extends React.Component {
    static navigationOptions = {
        title: "historyfScreen",
        header: null
    };



    render() {
        return (
            <AppFontLoader>
                <SafeAreaView style={s.container}>
                    <StatusBar barStyle="light-content"/>

                    <View style={s.atas}>
                        <View style={s.atas1}>
                            <View
                                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
                            >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("homeScreen")} style={{ flex: 1 }}>
                                    <Image source={require("../src/img/back.png")}></Image>
                                </TouchableOpacity>

                                <View style={{ flex: 8, }}>
                                    <Text type="rbold" style={s.atas1}>Community</Text>
                                </View>


                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Image style={{ width: wp('6.5%'), resizeMode: 'contain', height: hp('6.5%'), }} source={require("../src/img/info.png")}></Image>
                                </View>
                            </View>


                        </View>


                        <View style={{ flex: 1, flexDirection: "row", paddingVertical: hp('8%') }}>
                            <View style={{ flex: 1, alignItems: "flex-start" }}>
                                <Image source={require("../src/img/profil.png")}></Image>
                            </View>

                            <View style={{ flex: 3, flexDirection: "column", }}>
                                <Text style={{ fontSize: hp('3%'), color: "#4FBFD7" }} type="rbold">KOMUNITAS GITAR</Text>
                                <Text type="rmedium" >Leader: James Bond</Text>
                                <TouchableOpacity style={{ backgroundColor: "red", borderRadius: 20, width: wp('20%'), height: hp('3.5%'), alignItems: "center", justifyContent: "center" }}>
                                    <Text type="rmedium" style={{ color: "white" }}>Joined</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>



                    <View style={{ flex: 3, alignItems: "center" }}>



                    </View>


                </SafeAreaView>
            </AppFontLoader >
        );
    }
}

export default communityDetail1Screen;

const s = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        marginHorizontal: wp("3%"),
        marginVertical: hp('5%')
    },
    atas: {
        paddingHorizontal: wp('5%'),
        flexDirection: "column",
        paddingVertical: hp('3%'),
    },
    atas1: {
        flexDirection: "row",
        flex: 0.5,
        alignItems: "center",
        alignSelf: "flex-start",
        height: hp("10%")
    },
    atas1: {
        fontSize: hp("3%")
    },
    notifikasi: {
        flex: 4
    },
    notif1: {
        backgroundColor: "#4FBFD7",
        flexDirection: "row",
        alignItems: "center",
        height: hp("16%"),
        borderRadius: 15,
        marginBottom: hp("2%")
    },
    notif2: {
        backgroundColor: "#6C63FF",
        flexDirection: "row",
        alignItems: "center",
        height: hp("16%"),
        borderRadius: 15,
        marginBottom: hp("2%"),
        color: "#fff"
    }
});
