import React from "react";

import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StatusBarStyle,
    Platform,
    View,
    Button,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Alert,
  AsyncStorage
} from "react-native";

import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import Text from "../components/customText.js";
import { AppFontLoader } from "../components/AppFontLoader.js";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Directions } from "react-native-gesture-handler";

import normalize from "react-native-normalize";
import {
    heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

import dt from "../api";

var dat = new dt;

class Login extends React.Component {
    componentWillUnmount() {
        this.props.navigation.navigate("Intro");
    }

    static navigationOptions = {
        header: null
        // headerRight: <View />,
    };

    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry: true,
            iconName: "eye-outline",
            email: "",
            pass: ""
        };
    }

    onIconPress = () => {
        let iconName = this.state.secureTextEntry
        ? "eye-off-outline"
        : "eye-outline";

        this.setState({
        secureTextEntry: !this.state.secureTextEntry,
        iconName: iconName
        });
    };

    onEndEditing = () => {
        this.setState({
        backgroundColor: "green"
        });
    };

    onBlur = () => {
        this.setState({
        backgroundColor: "#ededed"
        });
    };

    onLoginPress = () => {
        if(this.state.email == "" || this.state.pass == ""){
            Alert.alert('Error', 'Isi semua field terlebih dahulu');
            return;
        }
        
        fetch(dat.api() + "/api/user/" + this.state.email)
        .then((rs) => {
            return rs.text();
        })
        .then((rd) => {
            if(rd == ""){
                Alert.alert("Wrong Email!", "Can't find the email");
                return;
            }
            // alert(rd);
            var data = JSON.parse(rd);
            
            if(data.password != this.state.pass){
                Alert.alert("Wrong Password!", "Your Password is wrong! Please, check it again");
                return;
            }
            AsyncStorage.setItem('datauser', JSON.stringify(data));
            this.props.navigation.navigate('homeScreen');
        });
    };

  onForgotPass = () => { };

  render() {
    if (Platform.OS === "android") {
      const hasNotch = StatusBar.currentHeight > 24;
    }
    console.log("statusBarHeight: ", StatusBar.currentHeight);

        return (
        <AppFontLoader>
            <View style={s.container}>
            <StatusBar barStyle="dark-content" barAnimation="slide" />

            <ImageBackground
                style={s.img1}
                source={require("../src/img/header2.png")}
            >
                <Text type="rbold" style={s.judul}>
                    Log In
                </Text>
                <Text style={s.subjudul}>
                    Enter your email and password to log in 
                </Text>
            </ImageBackground>

            <View style={s.login}>
                <View style={s.wrap1}>
                    <Text type="rmedium" style={s.temail}>
                        Email Address
                    </Text>
                    <TextInput
                        style={s.femail}
                        placeholder="Email Address"
                        selectionColor={"red"}
                        underlineColorAndroid={"transparent"}
                        value={this.state.email}
                        onChangeText={text => {
                        this.setState({ email: text });
                        }}
                    />

                <Text type="rmedium" style={s.tpw}>
                    Password
                </Text>
                <View style={s.fpw}>
                    <TextInput
                    style={{ flex: 1 }}
                    placeholder="Password"
                    secureTextEntry={this.state.secureTextEntry}
                    value={this.state.pass}
                    onChangeText={text => {
                        this.setState({ pass: text });
                    }}
                    />
                    <TouchableOpacity onPress={this.onIconPress}>
                    <Icon
                        name={this.state.iconName}
                        style={{ paddingTop: hp("-1%"), justifyContent: "center" }}
                        size={wp("8%")}
                        color="black"
                    />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this.onForgotPass}>
                    <Text
                    type="rmedium"
                    style={{
                        textAlign: "right",
                        marginTop: normalize(10),
                        color: "#38D1E6"
                    }}
                    >
                    Forgot Password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.onLoginPress} style={s.btnlogin}>
                    <LinearGradient
                    start={[0, 1]}
                    end={[1, 0]}
                    colors={["#519BD1", "#38D1E6"]}
                    style={s.btngradien}
                    >
                    <Text type="rmedium" style={s.btnloginisi}>
                        LOGIN
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
            </View>

            <View style={s.login2}>
                <TouchableOpacity>
                    <Text
                        style={{
                        textAlign: "center",
                        fontSize: hp("2%"),
                        color: "#C8C8C8",
                        letterSpacing: 0.5,
                        marginTop: hp("2%")
                        }}
                    >
                        Don't have an account?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignUp1")}
                >
                <Text
                    type="rbold"
                    style={{
                    textAlign: "center",
                    color: "#38D1E6",
                    letterSpacing: 1,
                    marginTop: normalize(5),
                    fontSize: hp("3.5%"),
                    textDecorationLine: "underline"
                    }}
                >
                    SIGN UP
                </Text>
                </TouchableOpacity>
            </View>
            </View>
        </AppFontLoader>
        );
    }
}

const s = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    marginTop: StatusBar.currentHeight,
    margin: -10,
    backgroundColor:"white"
  },
  img1: {
    height: hp("33.4%"),
    width: wp("100%"),
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  // header : {
  //     justifyContent: "center",
  //     alignItems: "center",
  // },
  judul: {
    letterSpacing: 1,
    fontSize: hp("6%"),
    color: "#fff",
    marginBottom: normalize(10)
  },
  subjudul: {
    width: "80%",
    textAlign: "center",
    color: "#fff",
    lineHeight: normalize(25)
  },
  login: {
    flex: 1.2,
    width: wp("100%"),
    paddingHorizontal: normalize(45)
    // backgroundColor: 'red',
  },
  wrap1: {
    marginTop: normalize(30)
  },
  temail: {
    fontSize: hp("2%"),
    backgroundColor: "#fff",
    zIndex: 1,
    width: "40%",
    textAlign: "center",
    paddingHorizontal: 5,
    marginLeft: 10,
    marginBottom: hp("-1.3%")
  },
  femail: {
    borderWidth: 1,
    padding: 15,
    fontSize: normalize(15),
    borderRadius: 8,
    marginBottom: normalize(15),
    height: hp(7.5)
  },
  tpw: {
    fontSize: hp("2%"),
    backgroundColor: "#fff",
    zIndex: 1,
    width: "30%",
    textAlign: "center",
    paddingHorizontal: 5,
    marginLeft: 10,
    marginBottom: hp("-1.3%")
  },
  fpw: {
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: hp("1.6%"),
    borderRadius: 8,
    flexDirection: "row",
    height: hp(7.5),
    alignItems: "center"
  },
  btnlogin: {
    marginTop: hp("3%")
  },
  btngradien: {
    padding: hp("2%"),
    borderRadius: 8
  },
  btnloginisi: {
    textAlign: "center",
    letterSpacing: 1,
    fontSize: hp("3.2%"),
    color: "#fff"
  },
  login2: {
    flex: 0.8,
    width: wp("100%"),
    paddingHorizontal: normalize(10),
    marginTop: hp("1%")
    // backgroundColor: 'blue',
  }
});
export default Login;
