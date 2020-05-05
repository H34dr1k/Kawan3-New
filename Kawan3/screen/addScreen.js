import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, BackHandler, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

export default class addScreen extends React.Component {
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={{ flex: 1, height: 229, backgroundColor: '#3F3D56'}}>
                    <ImageBackground source={require('../src/image/banner2.png')} style={{ width: '115%', height: '115%' }}>
                        <Image source={require('../src/image/banner1.png')} />
                    </ImageBackground>
                </View>

                <View style={{ flex: 1, width: '100%', height: '100%',paddingHorizontal:50 ,backgroundColor: '#EFEEEE', borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: 0, paddingTop:5, }}>                 
                    <View style={{ marginTop: 15, marginBottom:15 }}>
                        <Text style={{ textAlign:"center", fontSize: 28, fontWeight: 'bold', color: '#526EDD' }}>Create something today!</Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 14, color: 'grey' }}>Choose what do you want to create and do something awesome.</Text>
                    </View>

                    
                    <View style={{ width: '100%', height: 50, backgroundColor: '#526EDD', marginBottom: 15, borderRadius: 10, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} onPress={()=> this.props.navigation.navigate("createComm")} >
                            <Image source={require('../src/image/comm1.png')}  style={{width:42, height:42}}/>
                            <Text style={{ fontSize: 18, color: 'white', marginLeft: 15, fontWeight: 'bold' }}>Create a Community</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', height: 50, backgroundColor: '#F8B814', marginBottom: 15, borderRadius: 10, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={()=> this.props.navigation.navigate("Create Event")} >
                            <Image source={require('../src/image/comm2.png')} style={{ width: 42, height: 42, marginLeft: -45 }} />
                            <Text style={{ fontSize: 18, color: 'white', marginLeft: 15, fontWeight: 'bold' }}>Create a Event</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', height: 50, backgroundColor: '#49438D', marginBottom: 15, borderRadius: 10, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={()=> this.props.navigation.navigate("travelFriend")} >
                            <Image source={require('../src/image/comm3.png')} style={{ width: 42, height: 42, marginLeft: -60 }} />
                            <Text style={{ fontSize: 18, color: 'white', marginLeft: 15, fontWeight: 'bold' }}>Travel Friend</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
        );
    }
}




