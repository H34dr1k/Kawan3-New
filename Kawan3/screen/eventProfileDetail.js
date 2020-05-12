//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewBase } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
// create a component
export default class eventProfileDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.atas}>
                    <Image resizeMode="contain" style={{width:140, height:140}} source={require('../src/image/fireworks5.png')} />
                    <Text style={styles.judul}>Seminar Logitech</Text>

                    <TouchableOpacity style={styles.joined}>
                        <Text style={{fontWeight:"bold",fontSize:40, letterSpacing:0.7}}>232</Text>
                        <Text style={{fontSize:14, color:"white",}} >People Joined</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.informasi}>
                    <View style={styles.margin28}>
                        <Text style={styles.title}>Description</Text>
                        <Text style={{fontSize:12, color:"grey", lineHeight:16,marginTop:10}}>Ayo bersama sama kita menonton pesta kembang api bersama dengan kawan-kawan. Ayo kita berkenalan dan menjalin hubungan sosialisme yang sinergis satu sama lain tapi sopan santun.</Text>
                    </View>

                    <View style={styles.margin28}>
                        <Text style={styles.title}>Information</Text>
                        <View style={styles.grid}>
                            <View style={styles.center}>
                                <View style={{ flex: 1 }}><Image resizeMode="contain" style={styles.icon} source={require('../src/img/maps.png')} /></View>
                                <View style={{ flex: 3 }}>
                                    <Text style={styles.subtitle}>Distance</Text>
                                    <Text style={styles.subcontent} style={{color:"grey"}}> --Progres--</Text>
                                </View> 
                            </View>
                            

                            <View style={styles.center}>
                                <View style={{ flex: 1 }}><Image resizeMode="contain" style={styles.icon} source={require('../src/img/clock.png')} /></View>
                                <View style={{ flex: 3 }}>
                                    <Text style={styles.subtitle}>Time</Text>
                                    <Text style={styles.subcontent}>20.00 - 21.00</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{marginTop:40}}>
                        <Text style={styles.title}>Location</Text>
                        <View style={{ flex: 1, flexDirection: "row", marginTop: 12}}>
                            <View style={{ flex: 1 }}><Image resizeMode="contain" style={{width:40, height:40}} source={require('../src/img/logoDest.png')} /></View>
                            <View style={{ flex: 5 }}>
                                <Text style={{ fontWeight: "bold", letterSpacing: 0.6, fontSize: 16 }}>Jl. Gajahmada No 5, Pontianak</Text>
                                <Text style={styles.subtitle}>Pontianak, Kalimantan Barat, Indonesia</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    margin28:{
        marginBottom:28,
    },
    container: {
        flex: 1,
        paddingHorizontal:28,
        paddingTop:28,
        backgroundColor: 'white',
    },
    atas:{
        justifyContent:"center",
        alignItems:"center",
        marginBottom:28,
    },
    judul:{
        color:"#526EDD",
        fontSize:24,
        fontWeight:"bold",
        letterSpacing: 0.6,
        marginVertical:20,
    },
    joined:{
        width: wp('90%') -48,
        height: 90,
        paddingVertical:20,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#F8B814",
        borderRadius:12,
    },
    title:{
        fontWeight:"bold",
        fontSize:18,
        letterSpacing:0.6
    },
    grid:{
        flex:1,
        flexDirection:"row",
        marginTop:14,
    },
    icon:{
        width:20,
        height:20,
    },
    center:{
        flex:1,
        flexDirection:"row"
    },
    icon:{
        width:25,
        height:25
    },
    subtitle:{
        color:"grey",
        fontSize:12,
        marginBottom:7
    },
    subcontent:{
        fontWeight:"bold",
        letterSpacing:1,
        fontSize:18
    }
});

//make this component available to the app
