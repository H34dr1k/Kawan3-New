import React from 'react';

import { StyleSheet, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Platform, View, Button, Image, ImageBackground, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid, AppRegistry } from 'react-native';
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
import CodeInput from 'react-native-confirmation-code-input';

class SignUp2 extends React.Component {

    _onFulfill(code) {
        // TODO: call API to check code here
        // If code does not match, clear input with: this.refs.codeInputRef1.clear()
        if (code == 'HENDR') {
            alert(
                'Confirmation Code',
                'Successful!',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } else {
            alert(
                'Confirmation Code',
                'Code not match!',
                [{ text: 'OK' }],
                { cancelable: false }
            );

            this.refs.codeInputRef1.clear();
        }
    }

    static navigationOptions = {
        header: null,
        // headerRight: <View />,
    }
    render() {

        if (Platform.OS === 'android') {
            const hasNotch = StatusBar.currentHeight > 24;
        }
        console.log('statusBarHeight: ', StatusBar.currentHeight);

        return (
            <AppFontLoader>
                <View style={s.container}>

                    <StatusBar barStyle="dark-content" barAnimation="slide" />

                    <ImageBackground resizeMode={'cover'} style={s.img1} source={require('../src/img/header4.png')}>
                        <Text
                           
                            type='rbold' style={s.judul}>Sign Up</Text>
                        <Text style={s.subjudul}>Confirm your email to create your account!</Text>
                    </ImageBackground>

                    <View style={s.confirm}>

                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: 'center'}}>
                            <Text type='rmedium' style={{ textAlign: 'center', fontSize:hp('2.5%')}}>We have send the code to your email, please check it!</Text>
                        </View>

                        <View style={{justifyContent:"center",alignItems:'center', flex:0.5}}>
                            <CodeInput
                                
                                ref="codeInputRef1"
                                secureTextEntry
                                className={'border-b'}
                                space={10}
                                size={40}
                                inputPosition='left'
                                inactiveColor='#38D1E6'
                                activeColor='black'
                                onFulfill={(code) => this._onFulfill(code)}
                            />
                        </View>

                        <View style={{ justifyContent: "center", alignItems: 'center'}}>
                            <Text type='rmedium' style={{fontSize: hp('2.5%') }}>Haven't receive the code?</Text>
                            <TouchableOpacity style={{marginTop:hp('0.5%')}}>
                                <Text style={{ color: '#519BD1', borderBottomWidth: 1, borderBottomColor:'#519BD1' }}>We send you another one</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={s.create}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('homeScreen')}
                            style={s.btnCreate}>

                            <LinearGradient start={[0, 1]} end={[1, 0]} colors={['#519BD1', '#38D1E6']} style={s.btngradien}>
                                <Text type="rmedium" style={s.btnCreateisi}>Create Account</Text>
                            </LinearGradient>

                        </TouchableOpacity>     
                    </View>

                    

                   



                </View>
            </AppFontLoader>
        );
    }
}

export default SignUp2;

const s = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        marginTop: StatusBar.currentHeight,
        margin: -10,
    },
    img1 : {
        width: wp('100%'),
        resizeMode: 'contain',
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
    confirm: {
        flex: 1,
        width: wp('100%'),
        paddingHorizontal: normalize(45),
        marginTop: hp('1%'),
        flexDirection: 'column',
    },      
    tEmail: {
        fontSize: hp('2%'),
        backgroundColor: '#fff',
        zIndex: 1,
        width: '40%',
        textAlign: "center",
        paddingHorizontal: 5,
        marginLeft: 10,
        marginBottom: hp('-1.3%'),
    },
    fEmail: {
        borderWidth: 1,
        padding: 15,
        fontSize: normalize(15),
        borderRadius: 8,
        height: hp(7.5)
    },
    create: {
        flex: 1,
        width: wp('100%'),
        paddingHorizontal: wp('12%'),
        justifyContent:'center'
        
    },
    btnCreate: {
        marginTop: hp('-2%'),
    },
    btngradien: {
        padding: hp('2%'),
        borderRadius: 8,
    },
    btnCreateisi: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: hp('3.2%'),
        color: '#fff',
    },
});
