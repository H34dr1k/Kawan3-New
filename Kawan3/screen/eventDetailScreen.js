import React from "react";

import {
  Dimensions,
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
import ReadMore from 'react-native-read-more-text';
import normalize from "react-native-normalize";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import navigation from "./navigation.js";

const { height } = Dimensions.get('window');

import dt from '../api'

var data = new dt;
var api = data.api();
var image = data.image();

var dataUser = [];
var dataEvent = [];

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default class eventDetail extends React.Component {

  state = {
    screenHeight : 0,
    loaded: false,
    joined: false,
    date: '',
  }

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.load();
        })
    }

    async load(){
        var idEvent = '';

        await AsyncStorage.getItem('dataEvent').then(rs => {
            idEvent = `${rs}`
        })

        await AsyncStorage.getItem('datauser').then(rd => {
            dataUser = JSON.parse(rd);
        })

        await fetch(api + '/api/getEvent/' + idEvent + '/' + dataUser.kodeuser)
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            if(rd.indexOf('"id":') == -1 || rd.indexOf('"creator":') == -1){
                Alert.alert('Error', rd);
                return;
            }

            dataEvent = JSON.parse(rd);
        })

        var rawDate = dataEvent.datetime;

        var datetime = rawDate.split(' ');
        
        var date = datetime[0].split('-');
        var year = date[0];
        var month = months[parseInt(date[1]) - 1];
        var day = date[2];

        this.setState({ date: `${day} ${month} ${year} ${datetime[1]}` });
        // console.log(this.state.date);

        dataEvent.joined == 'yes' ? this.setState({ joined: false }) : this.setState({ joined: true })

        this.setState({ loaded: true });
        this.render;
    }

    async joinEvent(){
        var dataBaru = JSON.parse('{ }');

        await fetch(api + '/api/joinEvent/' + dataEvent.id + '/' + dataUser.kodeuser, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataBaru)
        })
        .then(rd => {
            return rd.text();
        })
        .then(rs => {
            if(rs != "berhasil"){
                Alert.alert('Error', rs);
                return;
            }
        })
        
        this.props.navigation.goBack();
    }

    async leaveEvent(){
        await Alert.alert('Leave Event', 'Are you sure you want to leave?', [
            {
                text: 'No',
                onPress: () => {
                    return;
                }
            },
            {
                text: 'Yes',
                onPress: () => {
                    this.setState({ loaded: false });
                    this.render;
                }
            }
        ]);
        
        await fetch(api + '/api/leaveEvent/' + dataEvent.id + '/' + dataUser.kodeuser, {
            method: "DELETE"
        })
        .then(rd => {
            return rd.text();
        })
        .then(rs => {
            if(rs != "berhasil"){
                Alert.alert('Error', rs);
                return;
            }
        })
        
        this.props.navigation.goBack();
    }

  onContentSizeChange = (contentWidth, contentHeight) =>{
    this.setState({screenHeight : contentHeight });
  }

  render() {
    if(!this.state.loaded){
        return (
            <View style={{ flex: 1, justifyContent: "center"}}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    else{
        const  scrollEnabled = this.state.screenHeight > height;
        let { text } = this.props;
        return (
        <SafeAreaView style={{flex:1}}>
        <StatusBar barStyle="light-content" />

        <ScrollView
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
        > 
            <View style={{flex:1, paddingHorizontal:26, marginTop: hp('2%') }}>
                {/* <Text type="rbold" style={{ fontSize: hp("4%"), marginBottom: 20, color:"#526EDD" }}>
                    { dataEvent.name }
                </Text> */}

                <View style={{flex:1, flexDirection:"row" }}>
                    <View style={{ marginRight: 15, }}>
                        <Image style={{ width: 72, height: 72}} source={{ uri : image + '/' + dataEvent.preview}} />
                    </View>
                    <Text type="rbold" style={{ fontSize: hp("4%"), marginBottom: 20, color:"#526EDD" }}>
                        { dataEvent.name }
                    </Text>
                    {/* <View style={{justifyContent:"space-around"}}>
                    <Text type="rmedium" style={{fontSize:hp("2%")}}>Pecinta Logitech</Text>
                        <Text type="rmedium" style={{ marginBottom: 2, fontSize: hp("1.5%"), color: 'rgba(0, 0, 0 ,0.5)'}}>Since 2018</Text>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5,borderRadius:5, justifyContent:"center",backgroundColor:"#526EDD"}}>
                        <Text type="rmedium" style={{color:"white", fontSize:hp("1.5%")}}>Public Community</Text>
                    </View>
                    </View> */}
                </View>

                <View style={{
                height: 1,
                marginVertical:26 ,
                backgroundColor: 'rgba(0, 0, 0 ,0.1)',
                alignSelf: 'stretch'
                }} />

            <View style={{flex:1}}>
                <View style={{flexDirection:"row"}}>
                <Text type="rmedium" style={{flex:1, fontSize: hp("3.5%"), color:"#626262", letterSpacing: 0.1}}>Description</Text>
                <View style={{ paddingHorizontal: 10, paddingVertical: 5, justifyContent: "center", borderRadius: 5,backgroundColor: "#526EDD"}}>
                    <Text type="rmedium" style={{ color: "white", fontSize: hp("1.8%") }}>
                        { dataEvent.category } Event
                    </Text>
                </View>
                </View>

                {/* <View style={{marginVertical:20, justifyContent:"center" ,alignItems:"center"}}>
                <Image style={{width:wp('86%'), height:hp('20%')}} source={require('../src/image/foto1.png')} />
                </View> */}

                <View>
                    <Text style={{lineHeight:15, fontSize:hp("1.8%")}}>
                        { dataEvent.desc }
                    </Text>
                </View>

                <TouchableOpacity style={{marginTop:20}}>
                    <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={this._renderRevealedFooter}
                    onReady={this._handleTextReady}>
                    <Text >
                        {text}
                    </Text>
                    </ReadMore>
                </TouchableOpacity>

            </View>

                <View style={{
                height: 1,
                marginVertical: 26,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                alignSelf: 'stretch'
                }} />


            <View style={{flexDirection:"row", flexWrap:"wrap", marginBottom:15}}>
                <View style={{flex:1}}>
                    <Text type="rbold" style={{ color: 'rgba(0, 0, 0 ,0.5)', fontSize:hp("2%")}}>Distance</Text>
                    <Text type="rbold" style={{ fontSize: hp("2%") }}>524 Meters</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text type="rbold" style={{ color: 'rgba(0, 0, 0 ,0.5)', fontSize: hp("2%") }}>Hosted By</Text>
                    <Text type="rbold" style={{ fontSize: hp("2%") }}>
                        { dataEvent.creatorName }
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ flex: 1 }}>
                    <Text type="rbold" style={{ color: 'rgba(0, 0, 0 ,0.5)', fontSize: hp("2%") }}>Time</Text>
                    <Text type="rbold" style={{ fontSize: hp("2%"), }}>
                        { this.state.date } 
                    </Text>
                    {/* <Text type="rbold" style={{ fontSize: hp("2%"),   }}>20.00-21.00</Text> */}
                </View>

                <View style={{ flex: 1 }}>
                    <Text type="rbold" style={{ color: 'rgba(0, 0, 0 ,0.5)', fontSize: hp("2%") }}>People joined</Text>
                    <Text type="rbold" style={{ fontSize: hp("2%") }}>
                        { dataEvent.memberCount } peoples
                    </Text>
                {/* <Text style={{marginVertical:5}}>Muka</Text> */}
                </View>
            </View>

                <View style={{
                height: 1,
                marginVertical: 26,
                backgroundColor: 'rgba(0, 0, 0 ,0.1)',
                alignSelf: 'stretch'
                }} />

            <View style={{marginBottom:26}}>
                <Text type="rbold" style={{marginBottom:10, fontSize:hp("2.5%")}}>Location</Text>

                <View style={{ padding:12 ,borderRadius:10, justifyContent: "center", backgroundColor: "#526EDD"}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{marginRight:10}}>
                    <Image style={{width:48, height:48}} source={require('../src/img/lokFrom.png')} /></View>
                    <View>
                    <Text type="rmedium" style={{color:"white"}}>From</Text>
                        <Text style={{ color: "white", fontSize:hp("2%") }}>
                            { dataEvent.alamat }
                        </Text>
                    </View>
                </View>
                </View>
            </View>

            </View>

        </ScrollView>

        {
            this.state.joined && (
                <TouchableOpacity 
                    onPress={() => this.joinEvent()}
                    style={{ padding: 15, backgroundColor:"#526EDD"}}>
                    <Text type="rbold" style={{ color: "white", textAlign: "center",fontSize:hp('3%')}}>Join Event</Text>
                </TouchableOpacity>
            )
        }

        {
            !this.state.joined && (
                <TouchableOpacity 
                    onPress={() => this.leaveEvent()}
                    style={{ padding: 15, backgroundColor:"#526EDD"}}>
                    <Text type="rbold" style={{ color: "white", textAlign: "center",fontSize:hp('3%')}}>Leave Event</Text>
                </TouchableOpacity>
            )
        }

        </SafeAreaView>
        );
    }
  }
}
_renderTruncatedFooter = (handlePress) => {
  return (
    <Text style={{ color: Colors.tintColor, marginTop: 5 }} onPress={handlePress}>
      Read more
    </Text>
  );
}

_renderRevealedFooter = (handlePress) => {
  return (
    <Text style={{ color: Colors.tintColor, marginTop: 5 }} onPress={handlePress}>
      Show less
    </Text>
  );
}