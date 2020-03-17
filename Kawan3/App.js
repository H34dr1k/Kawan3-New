// import React from 'react';
// import { StyleSheet, View, Button, Image, ActivityIndicator, TouchableOpacity  } from 'react-native';
// import 'react-native-gesture-handler';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// // import LinearGradient from 'react-native-linear-gradient';
// // import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Font from 'expo-font';
// import Text from './components/customText.js';
// import { AppFontLoader } from './components/AppFontLoader.js';

// import Intro from './screen/IntroScreen'
// import Login from './screen/LoginScreen'


// const AppNavigator = createStackNavigator({
//   First: {screen: Intro},
//   Second: { screen: Login },
// });


// const AppNavigator = createStackNavigator(
//   {  
//     Intro : IntroScreen,
//     Login : LoginScreen,
//   },
//   {
//     initialRouteName: 'Intro',
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: 'blue',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         textAlign: 'center',
//         flex: 1,
//       }
//     }
//   },


// );

// const AppContainer = createAppContainer(AppNavigator);


// export default AppContainer;

// // export default class App extends React.Component {
// //   render() {
// //     return <AppContainer />;
// //   }
// // }





// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     alignItems:"center",
//   },
//   isi:{
//     alignItems:"center",
//     // marginLeft:10,
//     marginHorizontal:40,
//   },
//   img1: {
//     height: "60%",
//   },
//   judul : {
//     marginVertical: 25,
//     letterSpacing: 2,
//     fontSize: 27,
//     textAlign:"center",
//   },
//   subjudul : {
//     lineHeight: 19,
//     letterSpacing:0.3,
//     color: "#A9A0A0",
//     textAlign: "center",
//   },
//   btnmulai : {
//     marginTop: 80,

//   },
//   btngradien : {
//     borderWidth: 0,
//     borderRadius: 8,
//     paddingHorizontal: 90,
//     paddingVertical:15,

//   },
//   shadow : {

//   },
//   btnmulaiisi: {
//     color: 'white', 
//     fontSize: 23,
//     // marginHorizontal: 100,
//   }


// });

import React, { Component } from "react";
import Routes from "./Routes";
const App = () => <Routes />
export default App;

