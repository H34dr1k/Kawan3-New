import React from 'react';

import { BackHandler, AsyncStorage, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Platform, View, Button, Image, ImageBackground, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';

import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';

import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import Text from '../components/customText.js';
import { AppFontLoader } from '../components/AppFontLoader.js';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Directions } from 'react-native-gesture-handler';

import navigation from 'react-navigation';
import normalize from 'react-native-normalize';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { Col } from 'native-base';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, RadioWrap } from 'react-native-simple-radio-button';

import dt from '../api';

var gender = [
    { label: "Male", value: 0},
    { label: "Female", value: 1},
];

var datauser = [];

var data = new dt();

var images = data.image();

const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email));
}

class SignUp1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          secureTextEntry: true,
          secureTextEntry2: true,
          iconName: "eye-outline",
          iconName2: "eye-outline",
          email: "",
          pass: "",
          confPass: "",
          username: "",
          gender: 0
        };
    }

    componentDidMount(){
        fetch(data.api() + "/api/user")
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            datauser = JSON.parse(rd);
        });
    }

    onSignUpPress = () => {
        if(this.state.username == "" || this.state.email == "" || this.state.pass == "" || this.state.confPass == ""){
            Alert.alert("Error", "Please, fill all the field");
            return;
        }

        if(!validate(this.state.email)){
            Alert.alert("Error", "Invalid email address");
            return;
        }

        if(this.state.pass.length < 6){
            Alert.alert("Error", "Password must be filled with 6 characters or numbers");
            return;
        }

        if(this.state.pass != this.state.confPass){
            Alert.alert("Password do not match");
            return;
        }

        for (let i = 0; i < datauser.length; i++) {
            if(datauser[i].name == this.state.username){
                Alert.alert("Error", "This username have been used by another account");
                return;
            }
        }

        for (let i = 0; i < datauser.length; i++) {
            if(datauser[i].email == this.state.email){
                Alert.alert("Error", "This email have been used by another account");
                return;
            }
        }

        var lastId = datauser[datauser.length - 1].kodeuser;
        var newIdNumber = parseInt(lastId.substring(1)) + 1;
        var newId = "U" + newIdNumber.toString().padStart(4, '0');

        var gender = "";
        if(this.state.gender == 0){
            gender = "Male";
        }else{
            gender = "Female";
        }

        // var dataSetting = 
        //     "{" +
        //         "\"kodeuser\":\"" + newId + "\"" +
        //     "}";
        // var a = JSON.parse(dataSetting);

        var dataSetting = JSON.parse("{ }");
        dataSetting.kodeuser = newId;

        fetch(data.api() + "/api/setting", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataSetting)
        })
        .then((rs) => {
            return rs.text();
        })
        .then((rd) => {
            if(rd.indexOf('U', 0)){
                Alert.alert('Error', rd);
                return;
            }

            var dataSignUp = JSON.parse("{ }");
            dataSignUp.kodeuser = newId;
            dataSignUp.name = this.state.username;
            dataSignUp.email = this.state.email;
            dataSignUp.password = this.state.pass;
            dataSignUp.gender = gender;
            dataSignUp.loggedIn = 0;
            dataSignUp.desc = "";
            dataSignUp.hobby = "";
            dataSignUp.setting = rd;

            // var dataSignUp = 
            //     "{"+
            //         "\"kodeuser\":\"" + newId + "\", " +
            //         "\"name\":\"" + this.state.username + "\", " +
            //         "\"email\":\"" + this.state.email + "\", "+
            //         "\"password\":\"" + this.state.pass + "\", "+
            //         "\"gender\":\"" + gender + "\", "+
            //         "\"loggedIn\":0, "+
            //         "\"desc\":\"\", "+
            //         "\"hobby\":\"\", "+
            //         "\"setting\":" + rd + ""+
            //     "}";
            // var t = JSON.parse(dataSignUp);
            
            fetch(data.api() + "/api/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSignUp)
            }).then(rs => { return rs.text() })
            .then(rd => {
                Alert.alert("Success", "You've successfully signed up. Login to continue");
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ names: 'Login' }]
                });
            });
        });
    }

    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? "eye-off-outline" : "eye-outline";

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }

    onIconPress2 = () => {
        let iconName2 = (this.state.secureTextEntry2) ? "eye-off-outline" : "eye-outline";

        this.setState({
            secureTextEntry2: !this.state.secureTextEntry2,
            iconName2: iconName2
        })   
    }
   
    render() {

        // if (Platform.OS === 'android') {
        //     const hasNotch = StatusBar.currentHeight > 24;
        // }
        // console.log('statusBarHeight: ', StatusBar.currentHeight);

        return (
             <AppFontLoader>
                <View style={s.container}>

                    <StatusBar barStyle="light-content" />

                    <ImageBackground resizeMode={'cover'} style={s.img1} source={{ uri: images + "/img/header3.png"}}>
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
                                onChangeText={value => this.setState({ username: value })}
                            />
                        </View>

                        <View>
                            <Text type='rmedium' style={s.temail}>Email Address</Text>
                            <TextInput style={s.femail}
                                placeholder='Email Address'
                                keyboardType="email-address"
                                underlineColorAndroid={'transparent'}
                                value={this.state.email}
                                onChangeText={(text) => {this.setState({email: text})}}
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
                                    secureTextEntry={this.state.secureTextEntry2}
                                    value={this.state.confPass}
                                    onChangeText={(text) => {this.setState({confPass: text}) }}/>
                                <TouchableOpacity style={{}} onPress={this.onIconPress2}>
                                    <Icon name={this.state.iconName2} style={{ paddingTop: 0, justifyContent: "center" }} size={wp('8%')} color="black" />
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
                                initial={0} //Atur posisi default
                                onPress={(value) => {this.setState({ gender: value })}}
                                buttonSize={14.5}
                                buttonOuterSize={25}
                                selectedButtonColor={'#38D1E6'}
                                selectedLabelColor={'#38D1E6'}
                                labelStyle={{ fontSize: hp('2%'), marginRight:wp('10%')}}
                                formHorizontal={true}
                                buttonColor={'#C8C8C8'}
                                buttonWrapStyle={{ borderWidth:1 }}
                            />
                        </View>
                    </View>

                    <View style={s.continue}>
                        <TouchableOpacity
                                onPress={() => this.onSignUpPress()}
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
        // marginTop: StatusBar.currentHeight,
        margin: -10,
        backgroundColor:"white"
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
