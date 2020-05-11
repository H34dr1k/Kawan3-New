//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert, Picker, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import normalize from "react-native-normalize";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";



// create a component
export default class editEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            namee:"",
            deskripsi:"",
            alamat:"",
        };
    }

    showTulisan = value => {
        if (value == "Public") {
            this.setState({ tulisan: "Everyone can join this event" });
        } else {
            this.setState({ tulisan: "Only friends can join this event" });
        }
    }

    render() {
       
        return (
            <ScrollView contentContainerStyle={{ justifyContent:"center" }} style={styles.container}> 
                <View style={styles.awal}>
                    <TouchableOpacity style={{flex:2, marginRight:28}}>
                        <Image resizeMode="cover" style={{width:85, height:85, borderRadius:50,}} source={require('../src/image/contoh.jpg')} />
                    </TouchableOpacity>

                    <View style={{flex:6}}>
                        <Text style={styles.judul}>Name:</Text>
                        <TextInput
                            style={{marginTop:12}}
                            keyboardType="name"
                            placeholder="Name"
                            selectionColor={"grey"}
                            underlineColorAndroid={"transparent"}
                            value={this.state.name}
                            onChangeText={text => {
                                this.setState({ name: text });
                            }}
                        />
                        <View style={{flex:1, borderBottomColor:"black", borderBottomWidth:1, marginTop:12,}}></View>
                    </View>
                </View>

                <View style={styles.deskripsi}>
                    <Text style={styles.judul}>Description:</Text>
                    <View style={{ width: '100%', height: hp('15%'),borderRadius:6, marginTop:10, padding: 14,  backgroundColor:"#F8B814"}}>
                        <TextInput
                            keyboardType="deskripsi"
                            placeholder="Deskripsi"
                            selectionColor={"white"}
                            underlineColorAndroid={"transparent"}
                            value={this.state.deskripsi}
                            onChangeText={text => {
                                this.setState({ deskripsi: text });
                            }}
                        />
                    </View>
                </View>

                <View style={{marginTop:24}}>
                    <Text style={styles.judul}>Address:</Text>
                    <View style={{marginTop:12}}>
                        <TextInput
                            keyboardType="alamat"
                            placeholder="Alamat"
                            selectionColor={"grey"}
                            underlineColorAndroid={"transparent"}
                            value={this.state.alamat}
                            onChangeText={text => {
                                this.setState({ alamat: text });
                            }}
                        />
                        <View style={{ flex: 1, borderBottomColor: "black", borderBottomWidth: 1, marginTop: 12, }}></View>
                    </View>
                </View>

////////////////////////WAKTU
                <View style={{marginTop:24,}}>
                    <Text style={styles.judul}>Time:</Text>
                    <View>
                        <Text>Waktu</Text>
                    </View>
                </View>
////////////////////////WAKTU

                <View style={{marginTop:24}}>
                    <Text style={styles.judul}>Status:</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 14, color: '#49438D', marginBottom: 5 }}>Event Category</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Picker
                                selectedValue={this.state.eventCategory}
                                style={{ height: 50, width: 120 }}
                                onValueChange={value => { this.setState({ eventCategory: value }), this.showTulisan(value) }}
                            >
                                <Picker.Item label="Public" value="Public" />
                                <Picker.Item label="Private" value="Private" />
                            </Picker>
                            <Text style={{ fontSize: 14, color: 'grey' }}>
                                {this.state.tulisan}
                            </Text>
                        </View>
                    </View>
                </View>

                <View>
                    <TouchableOpacity 
                    onPress
                    style={{ backgroundColor:"#F8B814", justifyContent:"center", borderRadius:12, alignContent:"center", padding:16}}>
                        <Text style={{textAlign:"center", fontSize: hp('3%'),fontWeight:"bold"}}>Done!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,    
        marginTop:28,
        marginHorizontal:28,
        
    },
    awal: {
        flexDirection:"row",
        marginBottom: 42,
    },
    judul:{
        fontWeight:"bold",
        fontSize:18,
    }
});

//make this component available to the app
