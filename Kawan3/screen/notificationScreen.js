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

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import firebase from "firebase";

class notifScreen extends React.Component {
  static navigationOptions = {
    title: "notifScreen",
    header: null
  };

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user

    // Stop here if the user did not grant permissions
    if (status !== "granted") {
      alert("No notification permissions!");
      return;
    }
    try {
      // Get the token that identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      forebase
        .database()
        .ref("users/" + this.currentUser.uid + "/push_token")
        .set(token);
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    (this.currentUser = await firebase.auth()), this.currentUser;
    await this.registerForPushNotificationsAsync();
  }

  sendPushNoticiation = () => {
    let response = fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: {
        to: "ExponentPushToken[]",
        sound: "default",
        titlel: "Demo",
        body: "Demo notification"
      }
    });
  };

  render() {
    return (
      <AppFontLoader>
        <SafeAreaView style={s.container}>
          <StatusBar barStyle="dark-content" barAnimation="slide" />

          <View style={s.notifikasi}>
            <TouchableOpacity
              style={s.notif1}
              onPress={() => this.sendPushNoticiation()}
            >
              <Image
                source={require("../src/img/face1.png")}
                style={{
                  width: wp("20%"),
                  height: hp("20%"),
                  flex: 1,
                  marginHorizontal: wp("3%"),
                  resizeMode: "contain"
                }}
              ></Image>
              <View style={{ flex: 3, paddingRight: wp("1%") }}>
                <Text
                  type="rbold"
                  style={{ fontSize: hp("2.5%"), color: "#FFF" }}
                >
                  Hendrik krisma
                </Text>
                <Text
                  type="rbold"
                  style={{ fontSize: hp("2%"), color: "#FFF" }}
                >
                  has sent you a request to meet up!
                </Text>
                <Text
                  type="rlights"
                  style={{ color: "#FFF", marginBottom: hp("1%") }}
                >
                  5 mins ago
                </Text>
                <Text
                  type="rbold"
                  style={{
                    backgroundColor: "#fff",
                    textAlign: "center",
                    color: "#4FBFD7",
                    width: wp("18%"),
                    borderRadius: 30
                  }}
                >
                  Friends
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={s.notif2}>
              <Image
                source={require("../src/img/fireworks1.png")}
                style={{
                  width: wp("20%"),
                  height: hp("20%"),
                  flex: 1,
                  marginHorizontal: wp("3%"),
                  resizeMode: "contain"
                }}
              ></Image>
              <View style={{ flex: 3, paddingRight: wp("1%") }}>
                <Text
                  type="rbold"
                  style={{ fontSize: hp("2.5%"), color: "#FFF" }}
                >
                  2 days left until the event begin!
                </Text>
                {/* <Text type='rbold' style={{ fontSize: hp('2%'), color: '#FFF' }}>until the event begin!</Text> */}
                <Text
                  type="rlights"
                  style={{ color: "#FFF", marginBottom: hp("1%") }}
                >
                  5 mins ago
                </Text>
                <Text
                  type="rbold"
                  style={{
                    backgroundColor: "#fff",
                    textAlign: "center",
                    color: "#6C63FF",
                    width: wp("18%"),
                    borderRadius: 30
                  }}
                >
                  Events
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </AppFontLoader>
    );
  }
}

export default notifScreen;

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
