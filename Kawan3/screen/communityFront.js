import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import Text from "../components/customText.js";
import { AppFontLoader } from "../components/AppFontLoader.js";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

const topTabScreen1 = createMaterialTopTabNavigator();
    function communityTopTabs({ navigation, route }) {
            return (
                
            <topTabScreen1.Navigator
                name="Community"
                style={{ marginTop: StatusBar.currentHeight }}
            >
                <topTabScreen1.Screen name="nearYouScreen" component={nearYou} />
                <topTabScreen1.Screen
                name="trendingScreen"
                options={{}}
                component={trendingScreen}
                />
                <topTabScreen1.Screen
                name="mostJoinedScreen"
                options={{}}
                component={mostJoinedScreen}
                />
            </topTabScreen1.Navigator>
            );
            }

export default communityTopTabs;