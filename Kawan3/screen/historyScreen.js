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
    ToastAndroid,
    AsyncStorage,
    Alert
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

import dt from '../api';

var dat = new dt;
var api = dat.api();
var image = dat.image();

var dataUser = [];
var dataHistory = [];

export default class History extends React.Component {
    // registerForPushNotificationsAsync = async () => {
    //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //     // only asks if permissions have not already been determined, because
    //     // iOS won't necessarily prompt the user a second time.
    //     // On Android, permissions are granted on app installation, so
    //     // `askAsync` will never prompt the user

    //     // Stop here if the user did not grant permissions
    //     if (status !== "granted") {
    //         alert("No notification permissions!");
    //         return;
    //     }
    //     try {
    //         // Get the token that identifies this device
    //         let token = await Notifications.getExpoPushTokenAsync();

    //         // POST the token to your backend server from where you can retrieve it to send push notifications.
    //         forebase
    //             .database()
    //             .ref("users/" + this.currentUser.uid + "/push_token")
    //             .set(token);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    state = {
        loaded: false,
        emptyEvent: false
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.load();
        })
        // (this.currentUser = await firebase.auth()), this.currentUser;
        // await this.registerForPushNotificationsAsync();
    }

    async load(){
        dataHistory = [];

        await AsyncStorage.getItem('datauser').then(rd => {
            dataUser = JSON.parse(rd);
        });

        await fetch(api + '/api/eventHistory/' + dataUser.kodeuser)
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            if(rd == "[]"){
                this.setState({ loaded: true, emptyEvent: true});
                this.render;
                return;
            }

            if(rd.indexOf('"id":') == -1 || rd.indexOf('"name":') == -1 || rd.indexOf('"creator":') == -1){
                Alert.alert('Error', rd);
                return;
            }

            dataHistory = JSON.parse(rd);
            this.setState({ loaded: true, emptyEvent: false });
            this.render;
        });
    }

    // sendPushNoticiation = () => {
    //     let response = fetch("https://exp.host/--/api/v2/push/send", {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: {
    //             to: "ExponentPushToken[]",
    //             sound: "default",
    //             titlel: "Demo",
    //             body: "Demo notification"
    //         }
    //     });
    // };

    render() {
        if(!this.state.loaded){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        else{
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
                                    History
                  </Text>
                            </View>
                            <Image style={{}} source={require("../src/img/filter.png")}></Image>
                        </View> */}
    
                        {
                            this.state.emptyEvent && (
                                <View style={{ flex: 3, alignItems: "center" }}>
    
                                    <TouchableOpacity style={{ borderRadius: 20, backgroundColor: "#F7B815", paddingHorizontal: wp('1%'), paddingVertical: hp('0.5%'), width: wp("15%"), }}>
                                        <Text type="rbold" style={{ color: "white", textAlign: "center", alignItems: "center", fontSize: hp('2%') }}>All</Text>
                                    </TouchableOpacity>
    
    
                                    <View style={{ marginTop: hp('15%') }}>
                                        <Image
                                            source={require("../src/img/historykosong.png")} style={{ width: wp("100%"), height: hp("35%"), resizeMode: "contain" }}>
                                        </Image>
    
                                        <View style={{ paddingHorizontal: hp("6%") }}>
    
    
                                            <Text style={{ color: "#526EDD", textAlign: "center", fontSize: hp("4%") }}>Ayo Ikuti <Text type="rbold">event</Text></Text>
                                            <Text style={{ textAlign: "center", color: "#7E8CC1", fontSize: hp("2%"), letterSpacing: 0.5 }}>Ikutlah sebuah event dan cari teman biar hidup makin seru!</Text>
                                        </View>
                                    </View>
    
                                </View>
                            )
    
                        }
    
    
                    </SafeAreaView>
                </AppFontLoader>
            );
        }
    }
}


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
