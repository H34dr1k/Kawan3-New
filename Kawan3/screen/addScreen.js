import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

export default class addScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, height: 229, backgroundColor: '#3F3D56', marginTop: 26.5 }}>
                    <ImageBackground source={require('../src/image/banner2.png')} style={{ width: '115%', height: '115%' }}>
                        <Image source={require('../src/image/banner1.png')} />
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#EFEEEE', borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -45 }}>
                    <View style={{ borderWidth: 1.5, width: 47, borderColor: 'gray', marginTop: 10, marginLeft: 160 }}></View>
                    <View style={{ marginTop: 15, marginHorizontal: 50 }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#526EDD' }}>Choose What You Want To Create</Text>
                    </View>
                    <View style={{ marginHorizontal: 50, marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, color: '#D2D3D7' }}>Choose what do you want to create and do something awesome.</Text>
                    </View>
                    <View style={{ marginLeft: 50, width: 270, height: 50, backgroundColor: '#526EDD', marginBottom: 15, borderRadius: 10, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} onPress={()=> this.props.navigation.navigate("createComm")} >
                            <Image source={require('../src/image/comm1.png')} />
                            <Text style={{ fontSize: 18, color: 'white', marginLeft: 15, fontWeight: 'bold' }}>Create a Community</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 50, width: 270, height: 50, backgroundColor: '#F8B814', marginBottom: 15, borderRadius: 10, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={()=> this.props.navigation.navigate("createEvent")} >
                            <Image source={require('../src/image/comm2.png')} style={{ marginLeft: -45 }} />
                            <Text style={{ fontSize: 18, color: 'white', marginLeft: 15, fontWeight: 'bold' }}>Create a Event</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 50, width: 270, height: 50, backgroundColor: '#49438D', marginBottom: 15, borderRadius: 10, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={()=> this.props.navigation.navigate("travelFriend")} >
                            <Image source={require('../src/image/comm3.png')} style={{ marginLeft: -60 }} />
                            <Text style={{ fontSize: 18, color: 'white', marginLeft: 15, fontWeight: 'bold' }}>Travel Friend</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
        );
    }
}




