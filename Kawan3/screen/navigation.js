import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    Alert,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { createAppContainer } from "react-navigation";

import "react-native-gesture-handler";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as firebase from 'firebase';

import profilScreen from './profilScreen'
import communityScreen from './communityScreen'
import searchScreen from './searchScreen'
import addScreen from './addScreen'
import homeScreen from "./homeScreen";
import notifScreen from './notificationScreen'
import historyScreen from './historyScreen'
import settingScreen from './settingScreen'
import settingPrivasi from './settingPrivasi'
import settingNotif from './settingNotif'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

class navigation extends React.Component {

    createHomeStack = () =>
        <Stack.Navigator
            options={{
                header: null,
            }}
        >
            <Drawer.Screen name="Bottom Tabs" children={this.createBottomTabs} />
            <Drawer.Screen name="HISTORY" component={historyScreen} />
        </Stack.Navigator>

    createTopTabs = () => {
        return <MaterialTopTabs.Navigator>
            <MaterialTopTabs.Screen name="home" component={homeScreen1} />
            <MaterialTopTabs.Screen name="Community" component={communityScreen} />
            <MaterialTopTabs.Screen name="Profil" component={profilScreen} />
        </MaterialTopTabs.Navigator>
    }

    createBottomTabs = () => {
        return <MaterialBottomTabs.Navigator
            options={{
                header: null,
            }}
        >
            <MaterialBottomTabs.Screen name="home" component={homeScreen} />
            <MaterialBottomTabs.Screen name="Community" component={communityScreen} />
            <MaterialBottomTabs.Screen name="Profil" component={profilScreen} />
            <MaterialBottomTabs.Screen name="search" component={searchScreen} />

        </MaterialBottomTabs.Navigator>
    }

    navTab = () => {
        return <Tab.Navigator>
            <Tab.Screen name="notif" component={settingNotif} />
            <Tab.Screen name="privasi" component={settingPrivasi} />
        </Tab.Navigator>
    }

    render() {

        return (

            <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
                <NavigationContainer options={{
                    header: null,
                }}>
                    <Drawer.Navigator>
                        <Drawer.Screen name="Home" children={this.createHomeStack} />
                        <Drawer.Screen name="Community" component={this.navTab} />
                        <Drawer.Screen name="Profil" component={profilScreen} />
                        <Drawer.Screen name="Add" component={addScreen} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </View>
        );

    }
}

export default navigation;