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
  ToastAndroid,
  AsyncStorage,
  Alert
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
import { Directions, FlatList } from "react-native-gesture-handler";

import normalize from "react-native-normalize";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import firebase from "firebase";

import dt from '../api'

var dat = new dt;
var api = dat.api();
var image = dat.image();
var user = dat.user();

var datauser = [];
var notif = [];

class notifScreen extends React.Component {
    static navigationOptions = {
        title: "notifScreen",
        header: null
    };

    state = {
        loaded: false,
        emptyNotif: false
    }

    componentDidMount() {
        this.props.navigation.addListener('focus',() => {
            this.load();
        })
    }

    async load(){
        notif = [];
        await AsyncStorage.getItem('datauser').then(rd => {
            datauser = JSON.parse(rd);
        });

        await fetch(api + '/api/r/' + datauser.kodeuser)
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            if(rd == "[]"){
                this.setState({ loaded: true, emptyNotif: true });
                this.render;
                return;
            }

            if(rd.indexOf('"kodeuser":') == -1 || rd.indexOf('"name":') == -1 || rd.indexOf('"email":') == -1){
                Alert.alert("Error", rd);
                return;
            }

            notif = JSON.parse(rd);
            this.setState({ loaded: true, emptyNotif: false });
            this.render;
        })
    }

    async askRequest(name, user2){
        await Alert.alert('Friend Request', `Do you want to accept friend request from ${name}`, [
            {
                text: 'Block User',
                onPress: async () => {
                    this.setState({ loaded: false, emptyNotif: false });
                    this.render;

                    await fetch(api + '/api/rblock/' + datauser.kodeuser + '/' + user2, { method: "PUT" })
                    .then(rs => {
                        return rs.text();
                    })
                    .then(rd => {
                        if(rd != 'berhasil'){
                            Alert.alert('Error', rd);
                            return;
                        }
                    });
                    
                    Alert.alert('Success!', 'This user has been blocked');
                    this.load();
                }
            },
            {
                text: 'No',
                onPress: async () => {
                    this.setState({ loaded: false, emptyNotif: false });
                    this.render;

                    await fetch(api + '/api/rdelete/' + datauser.kodeuser + '/' + user2, { method: "DELETE" })
                    .then(rs => {
                        return rs.text();
                    })
                    .then(rd => {
                        if(rd != 'berhasil'){
                            Alert.alert('Error', rd);
                            return;
                        }
                    });
                    
                    Alert.alert('Success!', "This request have been denied");
                    this.load();
                }
            },
            {
                text: 'Yes',
                onPress: async () => {
                    this.setState({ loaded: false, emptyNotif: false });
                    this.render;

                    await fetch(api + '/api/raccept/' + datauser.kodeuser + '/' + user2, { method: "PUT" })
                    .then(rs => {
                        return rs.text();
                    })
                    .then(rd => {
                        if(rd != 'berhasil'){
                            Alert.alert('Error', rd);
                            return;
                        }
                    });
                    
                    Alert.alert('Success!', 'You are a friend with this user now');
                    this.load();
                }
            }
        ])
    }

    render() {
        if(!this.state.loaded){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        else{
            return (
                <AppFontLoader>
                  <SafeAreaView style={s.container}>
                      <StatusBar barStyle="light-content" />
          
                      <View style={s.notifikasi}>
                          {
                              this.state.emptyNotif && (
                                  <View>
                                      <Text style={{ color: 'grey', textAlign: 'center' }}>
                                          No new notification for now...
                                      </Text>
                                  </View>
                              )
                          }
          
                          <FlatList 
                              style={{width:'100%'}}
                              data={notif}
                              keyExtractor={item => item.key}
                              renderItem={({item}) => {
                                  return (
                                      
                                        <TouchableOpacity
                                        style={s.notif1}
                                        onPress={() => this.askRequest(item.name, item.kodeuser)}>
                                        
                                            <Image
                                            source={{ uri: user + item.picture }}
                                            style={{
                                                width: wp("20%"),
                                                height: hp("20%"),
                                                flex: 1,
                                                marginHorizontal: wp("3%"),
                                                resizeMode: "contain",
                                                borderRadius: 75
                                            }}/>
            
                                            <View style={{ flex: 3, paddingRight: wp("1%") }}>
                                                <Text
                                                    type="rbold"
                                                    style={{ fontSize: hp("2.5%"), color: "#FFF" }}
                                                >
                                                    { item.name }
                                                </Text>
                                                <Text
                                                    type="rbold"
                                                    style={{ fontSize: hp("2%"), color: "#FFF" }}
                                                >
                                                    has sent you a request to become your friend!
                                                </Text>
                                                {/* <Text
                                                    type="rlights"
                                                    style={{ color: "#FFF", marginBottom: hp("1%") }}
                                                >
                                                    5 mins ago
                                                </Text> */}
                                                {/* <Text
                                                    type="rbold"
                                                    style={{
                                                    backgroundColor: "#fff",
                                                    textAlign: "center",
                                                    color: "#4FBFD7",
                                                    width: wp("18%"),
                                                    borderRadius: 30
                                                    }}
                                                >
                                                    Friends
                                                </Text> */}
                                          </View>
                                  </TouchableOpacity>
                                  )
                              }}
                          />
          
                      {/* <TouchableOpacity style={s.notif2}>
                        <Image
                          source={require("../src/img/fireworks1.png")}
                          style={{
                            width: wp("20%"),
                            height: hp("20%"),
                            flex: 1,
                            marginHorizontal: wp("3%"),
                            resizeMode: "contain"
                          }}
                        ></Image>
                        <View style={{ flex: 3, paddingRight: wp("1%") }}>
                          <Text
                            type="rbold"
                            style={{ fontSize: hp("2.5%"), color: "#FFF" }}
                          >
                            2 days left until the event begin!
                          </Text>
                          {/* <Text type='rbold' style={{ fontSize: hp('2%'), color: '#FFF' }}>until the event begin!</Text> 
                          <Text
                            type="rlights"
                            style={{ color: "#FFF", marginBottom: hp("1%") }}
                          >
                            5 mins ago
                          </Text>
                          <Text
                            type="rbold"
                            style={{
                              backgroundColor: "#fff",
                              textAlign: "center",
                              color: "#6C63FF",
                              width: wp("18%"),
                              borderRadius: 30
                            }}
                          >
                            Events
                          </Text>
                        </View>
                      </TouchableOpacity> */}
                    </View>
                  </SafeAreaView>
                </AppFontLoader>
            );
        }
    }
}

export default notifScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginHorizontal: wp("3%")
  },
  atas: {
    flexDirection: "row",
    flex: 0.5,
    alignItems: "center",
    alignSelf: "flex-start",
    height: hp("10%")
  },
  atas1: {
    fontSize: hp("3%")
  },
  notifikasi: {
    flex: 4
  },
  notif1: {
    backgroundColor: "#4FBFD7",
    flexDirection: "row",
    alignItems: "center",
    height: hp("16%"),
    borderRadius: 15,
    marginBottom: hp("2%")
  },
  notif2: {
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    alignItems: "center",
    height: hp("16%"),
    borderRadius: 15,
    marginBottom: hp("2%"),
    color: "#fff"
  }
});
