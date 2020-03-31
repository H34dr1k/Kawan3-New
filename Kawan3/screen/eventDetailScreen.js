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
  Alert,
  AsyncStorage
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
import navigation from "./navigation.js";

export default class eventDetail extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{}}>
          <TouchableOpacity>
            <Text>Event Detail Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
