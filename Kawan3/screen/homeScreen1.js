import React from 'react';

import { StyleSheet, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Platform, View, Button, Image, ImageBackground, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';

import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';

import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import Text from '../components/customText.js';
import { AppFontLoader } from '../components/AppFontLoader.js';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Directions } from 'react-native-gesture-handler';

import normalize from 'react-native-normalize';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();




class homeScreen1 extends React.Component {


    render() {
        return (
            <AppFontLoader>
                <SafeAreaView style={s.container}>
                    <View>
                        <StatusBar barStyle="dark-content" barAnimation="slide" />
                        <Text style={{ fontSize: hp('4%') }}>New Screen</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Bottom Tabs')}>
                            <Text>Bottom </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </AppFontLoader>
        );
    }
}

export default homeScreen1;

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }


});