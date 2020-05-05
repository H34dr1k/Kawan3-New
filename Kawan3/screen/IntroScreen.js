import React from "react";
import {
    StyleSheet,
    View,
    Button,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    StatusBar,
    Dimensions

} from "react-native";
import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import Text from "../components/customText.js";
import { AppFontLoader } from "../components/AppFontLoader.js";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import dt from "../api";

var data = new dt;
var images = data.image();

class Intro extends React.Component {
    // static navigationOptions = {
    //     title: "Intro",
    //     header: null
    // };

    constructor(props)
    {
        super(props);
        this.state = {
            notyet : false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            AsyncStorage.getItem('introScreen').then((data) => {
                if(data != null){
                    this.checkId();
                }else{
                    this.setState({ notyet: true });
                }
            });
        }, 2000);
        
    }

    checkId = () => {
        AsyncStorage.getItem('datauser').then((data) => {
            if(data == null){
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }else{
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'homeScreen' }],
                });
            }
        });
    }

    render() {
        if(!this.state.notyet){
            return (
                <AppFontLoader>
                    <View style={{marginTop: StatusBar.currentHeight, flex:1, backgroundColor:"white"}}>
                        <View style={{flex:1, alignItems: "center", justifyContent:"center"}}>
                            
                            <Image source={{ uri: images + "/image/logo.png"}} style={{width: 200, height: 200}}/>
                            <Text type="rbold" style={{color:"rgb(80,175,255)", fontSize:hp('4%')}}>Kawan</Text>
                            
                        </View>
                    </View>
                </AppFontLoader>
            );
        }else{
            return (
                <AppFontLoader>
                    <View style={styles.container}>
                        <Image
                            style={styles.img1}
                            source={{ uri: images + "/img/header.png"}}
                        />
    
                        <View style={styles.isi}>
                            <Text type="rbold" style={styles.judul}> Welcome To Our App </Text>
    
                            <Text style={styles.subjudul}>
                                Thank you for downloading our application. Hope you enjoy and like
                                it. Good luck at find your best friend here!
                            </Text>
    
                            <TouchableOpacity
                                onPress={() => this.checkId()}
                                style={styles.btnmulai}
                            >
                                <LinearGradient
                                    start={[0, 1]}
                                    end={[1, 0]}
                                    colors={["#519BD1", "#38D1E6"]}
                                    style={styles.btngradien}
                                >
                                    <Text type="rmedium" style={styles.btnmulaiisi}>
                                        Get Started
                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </AppFontLoader>
            );
        }
    }
}

export default Intro;


const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 0.07);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        flex: 1
    },
    isi: {
        flex: 1,
        alignItems: "center",
        // marginLeft:10,
        marginHorizontal: 40
    },
    img1: {
        flex: 2,
        height: hp("65%"),
        width: wp('100%'),
        // height: imageHeight,
        // resizeMode: "contain"
    },
    judul: {
        marginVertical: hp("2%"),
        letterSpacing: 1.4,
        fontSize: hp("3.5%"),
        textAlign: "center"
    },
    subjudul: {
        lineHeight: hp("2.5%"),
        letterSpacing: 0.3,
        color: "#A9A0A0",
        textAlign: "center"
    },
    btnmulai: {
        marginTop: hp("4%")
    },
    btngradien: {
        borderWidth: 0,
        borderRadius: 8,
        paddingHorizontal: 90,
        paddingVertical: 15
    },
    shadow: {},
    btnmulaiisi: {
        color: "white",
        fontSize: hp("3%"),
        textAlign: "center"
        // marginHorizontal: 100,
    }
});
