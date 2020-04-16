// import React from 'react';
// import { StyleSheet, View, Button, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
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
// import Loading from './screen/LoadingScreen'
// import Login from './screen/LoginScreen'
// import SignUp1 from './screen/SignUp1'
// import SignUp2 from './screen/SignUp2'
// import homeScreen1 from './screen/homeScreen1'
// import homeScreen from './screen/homeScreen'
// import profilScreen from './screen/profilScreen'
// import communityScreen from './screen/communityScreen'
// import searchScreen from './screen/searchScreen'
// import addScreen from './screen/addScreen'
// import settingScreen from './screen/settingScreen'
// import settingPrivasi from './screen/settingPrivasi'
// import settingNotif from './screen/settingNotif'
// import settingAbout from './screen/settingAbout'
// import notifScreen from './screen/notificationScreen'
// import historyScreen from './screen/historyScreen'
// import friendDetailScreen from './screen/friendDetail'
// import communityDetail1Screen from './screen/communityDetail1'
// import navigation from './screen/navigation'

// import firebase from 'firebase';
// import { firebaseConfig } from './config';

// try {
//     firebase.initializeApp(firebaseConfig);
// } catch (err) {
//     // we skip the "already exists" message which is
//     // not an actual error when we're hot-reloading
//     if (!/already exists/.test(err.message)) {
//         console.error('Firebase initialization error', err.stack)
//     }
// }

// const AppNavigator = createStackNavigator({
//     Intro: {
//         screen: Intro
//     },
//     Loading: {
//         screen: Loading
//     },
//     Login: {
//         screen: Login
//     },
//     SignUp1: {
//         screen: SignUp1
//     },
//     SignUp2: {
//         screen: SignUp2
//     },
//     homeScreen1: {
//         screen: homeScreen1
//     },
//     Loading: {
//         screen: Loading
//     },
//     homeScreen: {
//         screen: homeScreen
//     },
//     profilScreen: {
//         screen: profilScreen
//     },
//     communityScreen: {
//         screen: communityScreen
//     },
//     searchScreen: {
//         screen: searchScreen
//     },
//     addScreen: {
//         screen: addScreen
//     },
//     settingScreen: {
//         screen: settingScreen
//     },
//     settingPrivasi: {
//         screen: settingPrivasi
//     },
//     settingNotif: {
//         screen: settingNotif
//     },
//     settingAbout: {
//         screen: settingAbout
//     },
//     notifScreen: {
//         screen: notifScreen
//     },
//     historyScreen: {
//         screen: historyScreen
//     },
//     friendDetailScreen: {
//         screen: friendDetailScreen
//     },
//     communityDetail1Screen: {
//         screen: communityDetail1Screen
//     },
//     navigation: {
//         screen: navigation
//     }
// },

//     {
//         initialRouteName: 'Intro',
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: '',
//             },
//             headerTintColor: '#000',
//             headerTitleStyle: {
//                 // textAlign: 'center',
//                 // flex: 1,
//             }
//         }
//     },


// );


// import React from "react";
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import Intro from './screen/IntroScreen'

// const screens = createStackNavigator();

// export default () => (
//     <NavigationContainer>
//         <screens.Navigator>
//             <screens.Screen name="Intro" component={Intro} />
//             <screens.Screen name="Loading" component={Loading} />
//         </screens.Navigator>
//     </NavigationContainer>
// );


// const AppNavigator = createStackNavigator(
//     {
//         Intro: IntroScreen,
//         Login: LoginScreen,
//     },
//     {
//         initialRouteName: 'Intro',
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: 'blue',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 textAlign: 'center',
//                 flex: 1,
//             }
//         }
//     },


// );

// export default createAppContainer(AppNavigator);

import React from "react";
import { StyleSheet, View, Button, Image, Text, ActivityIndicator, TouchableOpacity,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Intro from './screen/IntroScreen'
import Loading from './screen/LoadingScreen'
import Login from './screen/LoginScreen'
import SignUp1 from './screen/SignUp1'
import SignUp2 from './screen/SignUp2'

import { homeScreen1 } from './screen/homeScreen1'
import homeScreen from './screen/homeScreen'
import eventDetail from './screen/eventDetailScreen'
import myEvent from './screen/myEventScreen'
import profilScreen from './screen/profilScreen'
import editProfilScreen from './screen/editProfil'

import communityScreen from './screen/communityScreen'
import nearYouScreen from './screen/nearYouScreen'
import trendingScreen from './screen/trendingScreen'
import mostJoinedScreen from './screen/mostJoinedScreen'

import { searchScreen } from './screen/searchScreen'
import addScreen from './screen/addScreen'
import settingScreen from './screen/settingScreen'
import settingPrivasi from './screen/settingPrivasi'
import settingNotif from './screen/settingNotif'
import settingAbout from './screen/settingAbout'
import notifScreen from './screen/notificationScreen'
import History from './screen/historyScreen'
import friendDetailScreen from './screen/friendDetail'
import communityDetail1Screen from './screen/communityDetail1'
import communityFront from './screen/communityFront'

import Home from './screen/MAP/routes/Home/components/Home'
import { MapContainer } from './screen/MAP/routes/Home/components/MapContainer/index'

import createComm from './screen/createComm'
import createComm2 from './screen/createComm2'
import createEvent from './screen/createEvent'
import createEvent2 from './screen/createEvent2'
import travelFriend from './screen/travelFriend'
import editProfil from './screen/editProfil'
import personalEventScreen from './screen/personalEvent'

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk';
import reducers from './screen/CRUD(percobaan)/reducers'

import mapScreen from './screen/mapScreen'
// import Home from './screen/MAP/routes/Home/components/Home'


import navigation from './screen/navigation'

import normalize from "react-native-normalize";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";





const screens = createStackNavigator();
const Tabs = createBottomTabNavigator();
const introStack = createStackNavigator();
const homeStack = createStackNavigator();
const addStack = createStackNavigator();
const searchStack = createStackNavigator();
const profilStack = createStackNavigator();
const editProfilStack = createStackNavigator();
const communityStack = createStackNavigator();
const communitys = createStackNavigator();
const tabScreen = createStackNavigator();
const topTabScreen1 = createMaterialTopTabNavigator();


function editProfilStackScreen({ navigation, route}) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: true })
    } else {
        navigation.setOptions({ tabBarVisible: false })
    }

    return (
        <editProfil.Navigator>

            <editProfil.Screen name="editProfil" options={{ headerShown: false }} component={editProfilScreen} />
            <editProfil.Screen name="profilScreen" options={{
                headerShown: false,
                tabBarVisible: false,
            }} component={profilScreen} />


        </editProfil.Navigator>
    )
}

function introStackScreen({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: true })
    } else {
        navigation.setOptions({ tabBarVisible: false })
    }

    return (
        <introStack.Navigator>

            <introStack.Screen name="intro" options={{ headerShown: false }} component={Intro} />
            <introStack.Screen name="Loading" options={{
                headerShown: false,
            }} component={Loading} />
            <introStack.Screen name="Login" options={{
                headerShown: false,
            }} component={Login} />
            <introStack.Screen name="homeScreen" options={{
                headerShown: false,
                tabBarVisible: false,
            }} component={TabScreen} />


        </introStack.Navigator>
    )
}


function homeStackScreen({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    } else {
        navigation.setOptions({ tabBarVisible: true })
    }

    return (
      <homeStack.Navigator>
        <homeStack.Screen
          name="Home"
          options={({ route, navigation }) => ({
            title: route.name,
            headerStyle: {
              backgroundColor: "#E5E5E5",
              elevation: 0
            },
            headerTintColor: "#526EDD",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: hp("3%")
            },
            headerRight: () => (
              // <Button
              //     onPress={() => navigation.navigate('historyScreen')}
              //     title="Info"
              //     color="#00cc00"
              // />
              <View
                style={{ flexDirection: "row",
            marginTop: StatusBar.currentHeight, marginHorizontal: wp("4%") }}
              >
                <TouchableOpacity onPress={() => navigation.push("My Event")}>
                  <Image
                    resizeMode="contain"
                    style={{ marginRight: 13 }}
                    source={require("./src/img/MyEvent.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("History")}
                >
                  <Image
                    source={require("./src/image/History.png")}
                    style={{ marginRight: 13 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.push("Notification")}
                >
                  <Image source={require("./src/image/Notif.png")} />
                </TouchableOpacity>
              </View>
            )
          })}
          component={homeScreen}
        />

        <homeStack.Screen
          name="History"
          options={({ route }) => ({
            title: route.name,

            headerBackImage: () => (
              <Image
                resizeMode="contain"
                style={{ width: 24 }}
                source={require("./src/img/left-arrows.png")}
              />
            ),
            headerStyle: {
              backgroundColor: "white",
              elevation: 0
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: hp("3%")
            }
          })}
          component={History}
        />
        <homeStack.Screen
          name="Notification"
          options={({ route }) => ({
            title: route.name,
            tabBarVisible: false,
            headerStyle: {
              backgroundColor: "#E5E5E5",
              elevation: 0
            },
            headerTintColor: "red",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: hp("3%")
            }
          })}
          component={notifScreen}
        />

        <homeStack.Screen
          name="My Event"
          options={({ route }) => ({
            title: route.name,
            tabBarVisible: false,
            headerStyle: {
              backgroundColor: "#E5E5E5",
              elevation: 0
            },
            headerTintColor: "grey",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: hp("3%")
            }
          })}
          component={myEvent}
        />
        <homeStack.Screen
          name="Event Detail"
          options={({ route }) => ({
            title: route.name,
            tabBarVisible: false,
            headerStyle: {
              backgroundColor: "#E5E5E5",
              elevation: 0
            },
            headerTintColor: "grey",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: hp("3%")
            }
          })}
          component={eventDetail}
        />

        <homeStack.Screen
          name="Map"
          options={({ navigation, route }) => ({
            title: route.name
          })}
          component={Home}
        />
      </homeStack.Navigator>
    );
}

function profilStackScreen({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    } else {
        navigation.setOptions({ tabBarVisible: true })
    }

    return (
        <profilStack.Navigator>
            <profilStack.Screen name="Profile"  options={({ route, navigation }) => ({
                title: route.name,
                headerTransparent:true,
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    borderBottomWidth:0,
                },
                headerTintColor: '#526EDD',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: hp('3%'),
                    color:'white',
                }, headerRight: () => (

                    // <Button
                    //     onPress={() => navigation.navigate('historyScreen')}
                    //     title="Info"
                    //     color="#00cc00"
                    // />
                    <View style={{ flexDirection: 'row',}}>
                        <TouchableOpacity onPress={() => navigation.navigate("settingScreen")} >
                            
                        <Image source={require('./src/image/btnSetting.png')}
                                style={{marginTop:hp('1.5%'), marginRight:wp('1.5%')}}
                            />
                        </TouchableOpacity>
                    </View>

                ),
            })} component={profilScreen} />
            <profilStack.Screen name="settingScreen" options={{ headerShown: false }} component={settingScreen} />
            <profilStack.Screen name="settingAbout" options={{ headerShown: false }} component={settingAbout} />
            <profilStack.Screen name="settingNotif" options={{ headerShown: false }} component={settingNotif} />
            <profilStack.Screen name="settingPrivasi" options={{ headerShown: false }} component={settingPrivasi} />
            <profilStack.Screen name="editProfil" options={{ headerShown: false }} component={editProfil} />

        </profilStack.Navigator>
    )
}

function addStackScreen({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    } else {
        navigation.setOptions({ tabBarVisible: true })
    }

    return (
        <addStack.Navigator>
           

        <addStack.Screen name="addScreen"  options={{ headerShown: false }}
        
         component={addScreen} />

        <addStack.Screen name="createComm"  options={{ headerShown: false }} component={createComm} />
        <addStack.Screen name="createComm2"  options={{ headerShown: false }} component={createComm2} />
        <addStack.Screen name="Create Event" options={({ route }) => ({
          title: route.name,
          tabBarVisible: false,
          headerStyle: {
            backgroundColor: "#628DE7",
            elevation: 0
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: hp("3%")
          }
        })} component={createEvent} />
        <addStack.Screen name="Create a Event" options={({ route }) => ({
          title: route.name,
          tabBarVisible: false,
          headerStyle: {
            backgroundColor: "#628DE7",
            elevation: 0
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: hp("3%")
          }
        })} component={createEvent2} />


        <addStack.Screen name="My Event" options={({ route }) => ({
          title: route.name,
          tabBarVisible: false,
          headerStyle: {
            backgroundColor: "#628DE7",
            elevation: 0
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: hp("3%")
          }
        })} component={personalEventScreen} />

        <addStack.Screen name="travelFriend"  options={{ headerShown: false }} component={travelFriend} />

        </addStack.Navigator>
    )
}

function nearYou({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    } else {
        navigation.setOptions({ tabBarVisible: true })
    }

    return (
        <communityStack.Navigator >
            <communityStack.Screen name="nearYouScreen" options={{ headerShown:false}} component={nearYouScreen} />
            <communityStack.Screen name="communityDetail1Screen" options={{ }} component={communityDetail1Screen} />
        </communityStack.Navigator>
    )
}

function communityFronts({ navigation,route }) {
    return(
        <communitys.Navigator>
            <communitys.Screen name="Community" component={communityFront} />
        </communitys.Navigator>
    );
}


function communityTopTabs({ navigation, route }) {
    return (
        
      <topTabScreen1.Navigator
        name="Community"
        
      >
        <topTabScreen1.Screen name="nearYouScreen" component={nearYou} />
        <topTabScreen1.Screen
          name="trendingScreen"
          options={{}}
          component={trendingScreen}
        />
        <topTabScreen1.Screen
          name="mostJoinedScreen"
          options={{}}
          component={mostJoinedScreen}
        />
      </topTabScreen1.Navigator>
    );
}

function TabScreen({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    } else {
        navigation.setOptions({ tabBarVisible: true })
    }

    return (
        <Tabs.Navigator
            
            initialRouteName="Home"

            activeColor='cyan'
            inactiveColor='black'
            barStyle={{ backgroundColor: 'white' }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? require('./src/img/home.png')
                            : require('./src/img/home-run.png');
                    } else if (route.name === 'Search') {
                        iconName = focused
                            ? require('./src/img/search-black.png')
                            : require('./src/img/search.png');
                    } else if (route.name === 'Add') {
                        iconName = focused
                            ? require('./src/img/plus.png')
                            : require('./src/img/plus-normal.png');
                    } else if (route.name === 'Community') {
                        iconName = focused
                            ? require('./src/img/team.png')
                            : require('./src/img/group.png');
                    } else if (route.name === 'Profile') {
                        iconName = focused
                            ? require('./src/img/user.png')
                            : require('./src/img/user-normal.png');
                    }

                    // You can return any component that you like here!
                    return <Image source={iconName} style={{ width: 25, height: 25, }} resizeMode="contain" />
                },
            })}
            tabBarOptions={{
                activeColor: 'cyan',
                inactiveColor: 'black',
            }}

        >
            <Tabs.Screen options={{ headerShown: false, }} name="Home" component={homeStackScreen} />

            <Tabs.Screen options={{ headerShown: false }} name="Search" component={searchStackScreen} />

            <Tabs.Screen options={{ headerShown: false }} name="Add" component={addStackScreen} />

            <Tabs.Screen name="Community" component={communityTopTabs} />


            <Tabs.Screen options={{ headerShown: false }} name="Profile" component={profilStackScreen} />

        </Tabs.Navigator>
    )


}

// const homeStackScreen = (navigation, route) => (

// )

const searchStackScreen = () => (
    <searchStack.Navigator>
        <searchStack.Screen name="searchScreen" options={{ headerShown: false }} component={searchScreen} />

        {/* <searchStack.Screen name="hobbySmallScreen" options={{ headerShown: false }} /> */}
    </searchStack.Navigator>
)

const state = createStore(reducers, {}, applyMiddleware(ReduxThunk))

export default (navigation, route) => (
   

  <Provider store={state}>
    <NavigationContainer>

        <screens.Navigator>
            <screens.Screen options={{ headerShown: false }} name="Intro" component={introStackScreen} />
            <screens.Screen options={{
                title: route.name,
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} name="Community" component={communityFronts} />
            <screens.Screen options={{ headerShown: false }} name="SignUp1" component={SignUp1} />
            <screens.Screen options={{ headerShown: false }} name="SignUp2" component={SignUp2} />
            <screens.Screen options={{ headerShown: false }} name="Login" component={Login} />


        </screens.Navigator>
    </NavigationContainer>
  </Provider>
);

