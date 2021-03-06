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
  AsyncStorage,
  Dimensions
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

import dt from "../api"

var dat = new dt;
var api = dat.api();

export default class myEvent extends React.Component {

    state = {
        
    }

    async componentDidMount(){
        await fetch(api + "/api/event")
        .then(rs => {
            return rs.text()
        })
        .then(rd => {
            console.log(rd)
        })
    }

    render(){
        const { width, height } = Dimensions.get('window');
        return(
            <View style={{flex:1, flexWrap:"wrap", marginHorizontal:26}}>             
                <View style={{flex:1}}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Event Detail')}
                        style={{ flexDirection: "row", paddingHorizontal: 26, width: '100%', height: '25%', marginTop: StatusBar.currentHeight, backgroundColor: "white", depth: 15, borderWidth: 2, borderRadius: 10, borderColor: 'grey' }}>
                        <View style={{ flex: 2, flexDirection: 'column', flexWrap: "wrap", justifyContent: "center" }}>
                            <View style={{ width: '140%', height: '50%', marginBottom:10 }}>
                                <Image
                                    resizeMode="cover"
                                    style={{
                                        borderRadius: 10,
                                        elevation: 5,
                                        height: '100%',
                                        width: '100%'
                                    }}
                                    source={require('../src/image/contoh.jpg')} />
                            </View>
                            <View style={{ alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                                <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require('../src/img/group.png')} />
                                <Text>232 joined</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}></View>

                        <View style={{ flex: 5, flexDirection: 'column', marginTop: 26 }}>
                            <View style={{ justifyContent: "center", }}>
                                <Text type="rbold" style={{ fontSize: 20, }}>Seminar Logitech</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, marginBottom: 10 }}>
                                <View style={{ justifyContent: "center" }}>
                                    <View style={{ backgroundColor: "purple", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10, justifyContent: "flex-start" }}><Text style={{ color: "white", fontSize: hp('1.5%'), }} type="rbold" >Public</Text></View>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <View style={{ backgroundColor: "white", elevation: 2, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10 }}><Text style={{ color: "purple", fontSize: hp('1.5%') }} type="rbold" >Coming Soon</Text></View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
                                    <View style={{ flexDirection: "row", marginBottom: hp('1%'), }}>

                                        <Image style={{ width: 20, height: 20, marginRight: 10, }} source={require('../src/img/clock.png')} />
                                        <Text type="rmedium" style={{ color: "orange", fontSize: hp('2%') }}>Time</Text>
                                    </View>

                                    <View style={{ flex: 3 }}>
                                        <Text type="rmedium" style={{ fontSize: hp('1.5%') }} >1 April 2019, 20.00 - 21.00</Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
                                    <View style={{ flexDirection: "row", marginBottom: hp('1%'), }}>

                                        <Image style={{ width: 20, height: 20, marginRight: 10, }} source={require('../src/img/maps.png')} />
                                        <Text type="rmedium" style={{ color: "orange", fontSize: hp('2%') }}>Location</Text>
                                    </View>

                                    <View style={{ flex: 3 }}>
                                        <Text type="rmedium" style={{ fontSize: hp('1.5%') }}>Jl. Gajahmada No5, Pontianak</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Event Detail')}

                        style={{ flexDirection: "row", paddingHorizontal: 26, width: '100%', height: '25%', marginTop: StatusBar.currentHeight, backgroundColor: "white", depth: 15, borderWidth: 2, borderRadius: 10, borderColor: 'grey' }}>
                        <View style={{ flex: 2, flexDirection: 'column', flexWrap: "wrap", justifyContent: "center" }}>
                            <View style={{ width: '140%', height: '50%', marginBottom: 10 }}>
                                <Image
                                    resizeMode="cover"
                                    style={{
                                        borderRadius: 10,
                                        elevation: 5,
                                        height: '100%',
                                        width: '100%'
                                    }}
                                    source={require('../src/image/contoh.jpg')} />
                            </View>
                            <View style={{ alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                                <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require('../src/img/group.png')} />
                                <Text>232 joined</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}></View>

                        <View style={{ flex: 5, flexDirection: 'column', marginTop: 26 }}>
                            <View style={{ justifyContent: "center", }}>
                                <Text type="rbold" style={{ fontSize: 20, }}>Seminar Logitech</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, marginBottom: 10 }}>
                                <View style={{ justifyContent: "center" }}>
                                    <View style={{ backgroundColor: "purple", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10, justifyContent: "flex-start" }}><Text style={{ color: "white", fontSize: hp('1.5%'), }} type="rbold" >Public</Text></View>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <View style={{ backgroundColor: "white", elevation: 2, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10 }}><Text style={{ color: "purple", fontSize: hp('1.5%') }} type="rbold" >Coming Soon</Text></View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
                                    <View style={{ flexDirection: "row", marginBottom: hp('1%'), }}>

                                        <Image style={{ width: 20, height: 20, marginRight: 10, }} source={require('../src/img/clock.png')} />
                                        <Text type="rmedium" style={{ color: "orange", fontSize: hp('2%') }}>Time</Text>
                                    </View>

                                    <View style={{ flex: 3 }}>
                                        <Text type="rmedium" style={{ fontSize: hp('1.5%') }} >1 April 2019, 20.00 - 21.00</Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
                                    <View style={{ flexDirection: "row", marginBottom: hp('1%'), }}>

                                        <Image style={{ width: 20, height: 20, marginRight: 10, }} source={require('../src/img/maps.png')} />
                                        <Text type="rmedium" style={{ color: "orange", fontSize: hp('2%') }}>Location</Text>
                                    </View>

                                    <View style={{ flex: 3 }}>
                                        <Text type="rmedium" style={{ fontSize: hp('1.5%') }}>Jl. Gajahmada No5, Pontianak</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>

                    </View>
            </View>
        );
    }
}