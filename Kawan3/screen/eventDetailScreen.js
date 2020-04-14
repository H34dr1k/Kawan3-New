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

export default class eventDetail extends React.Component {

  

  state = {
    screenHeight :0,
  }

  onContentSizeChange = (contentWidth, contentHeight) =>{
    this.setState({screenHeight : contentHeight });
  }

  render() {

    const  scrollEnabled = this.state.screenHeight > height;
    let { text } = this.props;
    return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
      > 
        <View style={{flex:1, paddingHorizontal:26, marginTop:StatusBar.currentHeight}}>
            <Text type="rbold" style={{ fontSize: hp("4%"), marginBottom: 20, color:"#526EDD" }}>Seminar Logitech</Text>

          <View style={{flex:1, flexDirection:"row"}}>
            <View style={{marginRight:15}}><Image source={require('../src/img/logoevent.png')} /></View>
            <View style={{justifyContent:"space-around"}}>
              <Text type="rmedium" style={{fontSize:hp("2%")}}>Pecinta Logitech</Text>
                <Text type="rmedium" style={{ marginBottom: 2, fontSize: hp("1.5%"), color: 'rgba(0, 0, 0 ,0.5)'}}>Since 2018</Text>
              <View style={{ paddingHorizontal: 10, paddingVertical: 5,borderRadius:5, justifyContent:"center",backgroundColor:"#526EDD"}}>
                <Text type="rmedium" style={{color:"white", fontSize:hp("1.5%")}}>Public Community</Text>
              </View>
            </View>
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
                  <Text type="rmedium" style={{ color: "white", fontSize: hp("1.8%") }}>Public Event</Text>
              </View>
            </View>

            <View style={{marginVertical:20}}>
              <Image source={require('../src/image/foto1.png')} />
            </View>

            <View>
                <Text style={{lineHeight:15, fontSize:hp("1.8%")}}>Logitech International S.A. (biasa disebut Logitech atau ditulis Logi saja) adalah perusahaan produsen perlengkapan komputer pribadi dan tablet global yang berkantor pusat di Lausanne, Swiss.</Text>
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
              backgroundColor: 'rgba(0, 0, 0 ,0.1)',
              alignSelf: 'stretch'
            }} />


          <View style={{flexDirection:"row", flexWrap:"wrap", marginBottom:15}}>
            <View style={{flex:1}}>
                <Text type="rbold" style={{ color: 'rgba(0, 0, 0 ,0.5)', fontSize:hp("2%")}}>Distance</Text>
                <Text type="rbold" style={{ fontSize: hp("2%") }}>524 Meters</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text type="rbold" style={{ color: 'rgba(0, 0, 0 ,0.5)', fontSize: hp("2%") }}>Hosted By</Text>
                <Text type="rbold" style={{ fontSize: hp("2%"), color:"#526EDD", textDecorationLine:"underline"}}>Hendrik Krisma</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <View style={{ flex: 1 }}>
                <Text type="rbold" style={{ color: 'rgba(0, 0, 0 ,0.5)', fontSize: hp("2%") }}>Time</Text>
                <Text type="rbold" style={{ fontSize: hp("2%"), }}>Tuesday, 1 April 2019</Text>
                <Text type="rbold" style={{ fontSize: hp("2%"),   }}>20.00-21.00</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text type="rbold" style={{ color: 'rgba(0, 0, 0 ,0.5)', fontSize: hp("2%") }}>People joined</Text>
                <Text type="rbold" style={{ fontSize: hp("2%") }}>212 peoples</Text>
              <Text style={{marginVertical:5}}>Muka</Text>
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
                <View style={{marginRight:10}}><Image source={require('../src/img/lokFrom.png')} /></View>
                <View>
                  <Text type="rmedium" style={{color:"white"}}>From</Text>
                    <Text style={{ color: "white", fontSize:hp("2%") }}>Jl. Tanjung Pura No.3, Pontianak</Text>
                </View>
              </View>
            </View>
          </View>

        </View>

      </ScrollView>

      <TouchableOpacity style={{ padding: 15, backgroundColor:"#526EDD"}}>
        <Text type="rbold" style={{ color: "white", textAlign: "center",fontSize:hp('3%')}}>Join Event</Text>
      </TouchableOpacity>

    </SafeAreaView>
    );
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