//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from 'native-base';

// create a component
export default class viewAllFriend extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{justifyContent:'center', alignItems:"center", flexDirection:"row"}}>
                    <View style={{flex:3}}>
                        <Image style={{width:80, height:80}} source={require("../src/image/face1.png")} />
                    </View>
                    <View style={{flex:5}}>
                        <Text style={styles.nama}>JAMES BOND</Text>
                        <Text style={styles.hobi}>Football, games, rubik, basket</Text>
                    </View>
                    <TouchableOpacity style={{flex:2,  alignItems:"flex-end"}}>
                        <Image resizeMode="contain" style={{width:25, height:25}} source={require("../src/image/iconMore.png")} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:28,
        backgroundColor:"white",
        paddingHorizontal:28,
    },
    nama: {
        fontSize:18,
        fontWeight:"bold"
    },
    hobi:{
        fontSize:12,
        color: "#A5AFA5"
    }
});

//make this component available to the app
