import React from 'react';

import { StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Platform, View, Button, Image, ImageBackground, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';

import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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
import { Col } from 'native-base';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, RadioWrap } from 'react-native-simple-radio-button';

import * as firebase from 'firebase';
import '@firebase/firestore';

var gender = [
    { label: "Male", value: 0},
    { label: "Female", value: 1},
];


class SignUp1 extends React.Component {

    static navigationOptions = {
        header: null,
        // headerRight: <View />,
    }

    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry: true,
            iconName: "eye-outline",
            email: "",
            pass: "",
            confPass: "",
            username: ""
        }
        this.ref = firebase.firestore().collection("Accounts");
    }

    onSignUpPress = () => {

        if(this.state.pass != this.state.confPass){
            Alert.alert("Password do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
            .then(() => {
                this.simpanUsername();
                // this.props.navigation.navigate('homeScreen');
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    componentDidMount = () => {
        this.simpanUsername();
    };

    simpanUsername = () => {
        this.ref.add({
            email: this.state.email,
            gender: "Male",
            username: this.state.username
        }).then((data) => {
            this.setState({
                email: '',
                gender: 'Male',
                username: ''
            })
        });
    };

    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? "eye-off-outline" : "eye-outline";

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }
   
    render() {

        if (Platform.OS === 'android') {
            const hasNotch = StatusBar.currentHeight > 24;
        }
        console.log('statusBarHeight: ', StatusBar.currentHeight);

        return (
             <AppFontLoader>
                <View style={s.container}>

                    <StatusBar barStyle="dark-content" barAnimation="slide"/>

                    <ImageBackground resizeMode={'cover'} style={s.img1} source={require('../src/img/header3.png')}>
                        <Text
                        onPress={() => this.props.navigation.navigate('Login')} 
                         type='rbold' style={s.judul}>Sign Up</Text>
                        <Text style={s.subjudul}>Fill the details & create your account!</Text>
                    </ImageBackground>   

                    <View style={s.form}>

                        <View>
                            <Text type='rmedium' style={s.tusername}>Username</Text>
                            <TextInput style={s.fusername}
                                placeholder='Username'
                                underlineColorAndroid={'transparent'} 
                            />
                        </View>

                        <View>
                            <Text type='rmedium' style={s.temail}>Email Address</Text>
                            <TextInput style={s.femail}
                                placeholder='Email Address'
                                underlineColorAndroid={'transparent'}
                                value={this.state.email}
                                onChangeText={(text) => {this.setState({email: text}) }}
                            />
                        </View>

                        <View>
                            <Text type='rmedium' style={s.tpw}>Password</Text>
                            <View style={s.fpw}>
                                <TextInput style={{ flex: 1 }}
                                    placeholder='Password'
                                    secureTextEntry={this.state.secureTextEntry}
                                    value={this.state.pass}
                                    onChangeText={(text) => {this.setState({pass: text}) }}/>
                                <TouchableOpacity style={{}} onPress={this.onIconPress}>
                                    <Icon name={this.state.iconName} style={{ paddingTop: 0, justifyContent: "center" }} size={wp('8%')} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <Text type='rmedium' style={s.tcpw}> Confirm Password</Text>
                            <View style={s.fpw}>
                                <TextInput style={{ flex: 1 }}
                                    placeholder='Confirm your password'
                                    secureTextEntry={this.state.secureTextEntry}
                                    value={this.state.confPass}
                                    onChangeText={(text) => {this.setState({confPass: text}) }}/>
                                <TouchableOpacity style={{}} onPress={this.onIconPress}>
                                    <Icon name={this.state.iconName} style={{ paddingTop: 0, justifyContent: "center" }} size={wp('8%')} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* <View>
                            <Text type='rmedium' style={s.tcpw}>Phone Number</Text>
                            <View style={s.fpw}>
                                <TextInput 
                                    placeholder='Confirm your password'
                                    secureTextEntry={this.state.secureTextEntry}
                                ></TextInput>
                            </View>
                        </View> */}

                        <View style={s.gender}>
                            <RadioForm
                                style={{width:wp('35%'), height:hp('10%')}}
                                radio_props={gender}
                                initial={''} //Atur posisi default
                                // onPress={(value) => {ToastAndroid.show(value.toString(), ToastAndroid.SHORT )}}
                                onPress={(value) => {}}
                                buttonSize={15}
                                buttonOuterSize={25}
                                selectedButtonColor={'#38D1E6'}
                                selectedLabelColor={'#38D1E6'}
                                labelStyle={{ fontSize: hp('2%'), marginRight:wp('10%')}}
                                formHorizontal={true}
                                buttonColor={'#C8C8C8'}
                                buttonWrapStyle={{ borderWidth:1 }}
                                labelWrapStyle={{}}
                            />
                        </View>
                    </View>

                    <View style={s.continue}>
                        <TouchableOpacity
                                onPress={this.onSignUpPress}
                                style={s.btnlogin}>

                                <LinearGradient start={[0, 1]} end={[1, 0]} colors={['#519BD1', '#38D1E6']} style={s.btngradien}>
                                    <Text type="rmedium" style={s.btnloginisi}>Continue</Text>
                                </LinearGradient>

                            </TouchableOpacity>
                    </View>

                    


                    
                </View>
            </AppFontLoader>
        );
    }
}

export default SignUp1;

const s = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        marginTop: StatusBar.currentHeight,
        margin: -10,
    },
    img1: {
        // height: hp('30%'),
        width: wp('100%'),
        resizeMode:'contain',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    judul: {
        marginTop: hp('1%'),
        letterSpacing: 1,
        fontSize: hp('6%'),
        color: '#fff',
        marginBottom: normalize(10),
    },
    subjudul: {
        width: '80%',
        textAlign: "center",
        color: '#fff',
        lineHeight: normalize(25),
    },  
    form : {
        flex: 2,
        width: wp('100%'),
        paddingHorizontal: normalize(45),
        marginTop: hp('1%'),
        justifyContent:'space-evenly',
        flexDirection: 'column',
    },  
    wrap1: {
        marginTop: hp('-5%'),
    },
    tusername: {
        fontSize: hp('2%'),
        backgroundColor: '#fff',
        zIndex: 1,
        width: '30%',   
        textAlign: "center",
        paddingHorizontal: 5,
        marginLeft: 10,
        marginBottom: hp('-1.3%'),
    },
    fusername: {
        borderWidth: 1,
        padding: 15,
        fontSize: normalize(15),
        borderRadius: 8,
        height: hp(7.5)
    },
    tpw: {
        fontSize: hp('2%'),
        backgroundColor: '#fff',
        zIndex: 1,
        width: '30%',
        textAlign: "center",
        paddingHorizontal: 5,
        marginLeft: 10,
        marginBottom: hp('-1.3%'),
    },
    tcpw: {
        fontSize: hp('2%'),
        backgroundColor: '#fff',
        zIndex: 1,
        width: '50%',
        textAlign: "center",
        paddingHorizontal: 5,
        marginLeft: 10,
        marginBottom: hp('-1.3%'),
    },
    fpw: {
        borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: hp('1.6%'),
        borderRadius: 8,
        flexDirection: 'row',
        height: hp(7.5),
        alignItems:"center",
    },
    temail: {
        fontSize: hp('2%'),
        backgroundColor: '#fff',
        zIndex: 1,
        width: '40%',
        textAlign: "center",
        paddingHorizontal: 5,
        marginLeft: 10,
        marginBottom: hp('-1.3%'),
    },
    femail: {
        borderWidth: 1,
        padding: 15,
        fontSize: normalize(15),
        borderRadius: 8,
    },
    gender: {
        marginTop: hp('2%'),
    },  
    continue : {
        flex: 0.5,
        width: wp('100%'),
        paddingHorizontal: wp('12%'),
    },  
    btnlogin: {
        marginTop: hp('-2%'),
    },
    btngradien: {
        padding: hp('2%'),
        borderRadius: 8,
    },
    btnloginisi: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: hp('3.2%'),
        color: '#fff',
    },
});
