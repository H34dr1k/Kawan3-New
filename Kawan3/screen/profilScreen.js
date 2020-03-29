import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

import * as firebase from 'firebase';

export default class profilScreen extends React.Component {
    static navigationOptions = {
        title: 'profilScreen',
        header: null
    }


    // constructor(props) {
    //     super(props);
    //     this.ref = firebase.firestore().collection("Accounts")
    //     this.state = {
    //         name: "",
    //         email: "",
    //         gender: ""
    //     }
    // }

    // onLogOutPress = () => {
    //     firebase.auth().signOut()
    //         .then(() => {
    //             this.props.navigation.navigate('Login');
    //         });
    // }

    // UNSAFE_componentWillMount = () => {
    //     var email = firebase.auth().currentUser.email
    //     var e = "";
    //     var n = "";
    //     var g = "";

    //     this.ref.get().then(ss => {
    //         ss.docs.forEach(doc => {
    //             if (email == doc.get("email")) {
    //                 e = doc.get("email");
    //                 n = doc.get("username");
    //                 g = doc.get("gender");
    //             }
    //         });

    //         this.setState({
    //             "email": e,
    //             "name": n,
    //             "gender": g
    //         })
    //     });
    // }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 0, backgroundColor: '#49438D', height: 229, paddingTop: 26.5 }}>
                        <ImageBackground source={require('../src/image/decoStar.png')} style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 24, marginHorizontal: 26, fontWeight: 'bold', color: 'white', marginTop: 15 }}>Profile</Text>
                            <View style={{ marginLeft: 150, marginTop: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('settingScreen')}>
                                    <Image source={require('../src/image/btnSetting.png')} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#F0F0F0', borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -45 }}>
                        <View style={{ marginHorizontal: 26, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ marginTop: 33, width: 80, height: 28, backgroundColor: '#F84B14', borderRadius: 7 }}
                                onPress={this.onLogOutPress}>
                                <Text style={{ marginTop: 3, textAlign: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>Log Out</Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: -80 }}>
                                <Image source={require('../src/image/profilPic.png')} style={{ width: 150, height: 150 }} />
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfil')} style={{ width: 80, height: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8B814', marginTop: 33, borderRadius: 7, flexDirection: 'row' }}>
                                    <Image source={require('../src/image/iconEdit.png')} style={{ marginRight: 8 }} />
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 26, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#526EDD', textAlign: 'center' }}>{/*this.state.name*/}</Text>
                                <Text style={{ fontSize: 13, color: 'gray', textAlign: 'center' }}>I like progamming and playing football</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: '#E8E8E8', marginTop: 20, marginBottom: 15 }}></View>
                    <View style={{ marginHorizontal: 26 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#526EDD', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Friends</Text>
                            <TouchableOpacity>
                                <Text style={{ color: '#FBB429', fontWeight: 'bold', fontSize: 12, marginTop: 5 }}>Show All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <TouchableOpacity>
                                    <Image source={require('../src/image/Friend1.png')} style={{ marginRight: 10 }} />
                                </TouchableOpacity>
                                <Text style={{ color: 'gray' }}>Lisa</Text>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image source={require('../src/image/Friend2.png')} style={{ marginRight: 10 }} />
                                </TouchableOpacity>
                                <Text style={{ color: 'gray' }}>John</Text>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image source={require('../src/image/Friend3.png')} style={{ marginRight: 10 }} />
                                </TouchableOpacity>
                                <Text style={{ color: 'gray' }}>Shion</Text>
                            </View>
                            <View style={{ width: 45, height: 45, backgroundColor: '#628DE7', borderRadius: 50 }}>
                                <TouchableOpacity>
                                    <Text style={{ textAlign: 'center', marginTop: 8, fontWeight: 'bold', color: 'white', fontSize: 20 }}>+5</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: '#E8E8E8', marginTop: 20, marginBottom: 15 }}></View>
                    <View style={{marginHorizontal: 26}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: '#526EDD', fontSize: 18, fontWeight: 'bold', marginBottom: 15}}>My Hobby</Text>
                            <TouchableOpacity>
                                <Text style={{color: '#FBB429', fontWeight: 'bold', fontSize: 12, marginTop: 5}}>More</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity>
                                <View style={{width: 100, height: 25, backgroundColor: 'lightgreen', borderRadius: 14, marginRight: 10}}>
                                    <Text style={{color: 'white', textAlign: 'center', justifyContent: 'center'}}>Football</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{width: 100, height: 25, backgroundColor: 'lightblue', borderRadius: 14}}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>Progamming</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                <View style={{borderWidth: 1, borderColor: '#E8E8E8', marginTop: 20, marginBottom: 15}}></View>
                    <View style={{ marginHorizontal: 26 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#526EDD', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Community</Text>
                            <TouchableOpacity>
                                <Text style={{ color: '#FBB429', fontWeight: 'bold', fontSize: 12, marginTop: 5 }}>Show All</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                            <View style={{ marginBottom: 20, marginRight: 15, width: 235, height: 96, borderRadius: 10, backgroundColor: '#E5E5E5', flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={require('../src/image/Community1.png')} style={{ margin: 10 }} />
                                </View>
                                <View style={{ flex: 2 }}>
                                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>KOMUNITAS KARATE</Text>
                                        <Image source={require('../src/image/Check1.png')} />
                                    </View>
                                    <View style={{ width: 51, height: 19, backgroundColor: '#21D348', borderRadius: 19 }}>
                                        <Text style={{ color: 'white', fontSize: 11, textAlign: 'center' }}>37 Chat</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray', fontSize: 12 }}>16 Anggota</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Image source={require('../src/image/Arrow.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ width: 235, height: 96, borderRadius: 10, backgroundColor: '#E5E5E5', flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={require('../src/image/Community2.png')} style={{ margin: 10 }} />
                                </View>
                                <View style={{ flex: 2 }}>
                                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>POINT BLANK</Text>
                                        <Image source={require('../src/image/Check1.png')} />
                                    </View>
                                    <View style={{ width: 51, height: 19, backgroundColor: '#21D348', borderRadius: 19 }}>
                                        <Text style={{ color: 'white', fontSize: 11, textAlign: 'center' }}>37 Chat</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray', fontSize: 12 }}>16 Anggota</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Image source={require('../src/image/Arrow.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>

            </View>
        );
    }
}