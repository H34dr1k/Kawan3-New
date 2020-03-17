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
import { StyleSheet, View, Button, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Intro from './screen/IntroScreen'
import Loading from './screen/LoadingScreen'
import Login from './screen/LoginScreen'
import SignUp1 from './screen/SignUp1'
import SignUp2 from './screen/SignUp2'
import { homeScreen1 } from './screen/homeScreen1'
import { homeScreen } from './screen/homeScreen'
import profilScreen from './screen/profilScreen'
import communityScreen from './screen/communityScreen'
import { searchScreen } from './screen/searchScreen'
import addScreen from './screen/addScreen'
import settingScreen from './screen/settingScreen'
import settingPrivasi from './screen/settingPrivasi'
import settingNotif from './screen/settingNotif'
import settingAbout from './screen/settingAbout'
import notifScreen from './screen/notificationScreen'
import historyScreen from './screen/historyScreen'
import friendDetailScreen from './screen/friendDetail'
import communityDetail1Screen from './screen/communityDetail1'
import navigation from './screen/navigation'

import firebase from 'firebase';
import { firebaseConfig } from './config';



try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}


const screens = createStackNavigator();
const Tabs = createBottomTabNavigator();
const introStack = createStackNavigator();
const homeStack = createStackNavigator();
const addStack = createStackNavigator();
const searchStack = createStackNavigator();
const profilStack = createStackNavigator();
const communityStack = createStackNavigator();
const tabScreen = createStackNavigator();

function introStackScreen({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    } else {
        navigation.setOptions({ tabBarVisible: true })
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

            <homeStack.Screen name="homeScreen" options={{ headerShown: false }} component={homeScreen} />
            <homeStack.Screen name="historyScreen" options={{
                headerShown: false,
            }} component={historyScreen} />
            <homeStack.Screen name="notifScreen" options={{
                headerShown: false,
            }} component={notifScreen} />


        </homeStack.Navigator>
    )
}

function profilStackScreen({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    } else {
        navigation.setOptions({ tabBarVisible: true })
    }

    return (
        <profilStack.Navigator>

            <profilStack.Screen name="profilScreen" options={{ headerShown: false }} component={profilScreen} />
            <profilStack.Screen name="settingScreen" options={{ headerShown: false }} component={settingScreen} />
            <profilStack.Screen name="settingAbout" options={{ headerShown: false }} component={settingAbout} />
            <profilStack.Screen name="settingNotif" options={{ headerShown: false }} component={settingNotif} />
            <profilStack.Screen name="settingPrivasi" options={{ headerShown: false }} component={settingPrivasi} />


        </profilStack.Navigator>
    )
}

function communityStackScreen({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    } else {
        navigation.setOptions({ tabBarVisible: true })
    }

    return (
        <communityStack.Navigator>

            <communityStack.Screen name="communityScreen" options={{ headerShown: false }} component={communityScreen} />

        </communityStack.Navigator>
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

            <addStack.Screen name="addScreen" options={{ headerShown: false }} component={addScreen} />

        </addStack.Navigator>
    )
}

function TabScreen({ navigation, route }) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    } else {
        navigation.setOptions({ tabBarVisible: true })
    }

    return (
        <Tabs.Navigator
            options={{ tabBarVisible: false }}
            initialRouteName="homeScreen"
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
                    } else if (route.name === 'Profil') {
                        iconName = focused
                            ? require('./src/img/user.png')
                            : require('./src/img/user-normal.png');
                    }

                    // You can return any component that you like here!
                    return <Image source={iconName} style={{ width: 25, height: 25 }} resizeMode="contain" />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'cyan',
                inactiveTintColor: 'black',
            }}

        >
            <Tabs.Screen options={{ headerShown: false }} name="Home" component={homeStackScreen} />

            <Tabs.Screen options={{ headerShown: false }} name="Search" component={searchStackScreen} />

            <Tabs.Screen options={{ headerShown: false }} name="Add" component={addStackScreen} />

            <Tabs.Screen options={{ headerShown: false }} name="Community" component={communityStackScreen} />


            <Tabs.Screen options={{ headerShown: false }} name="Profil" component={profilStackScreen} />

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

export default (navigation, route) => (
    <NavigationContainer>

        <screens.Navigator>
            <screens.Screen options={{ headerShown: false }} name="Intro" component={introStackScreen} />
            <screens.Screen options={{ headerShown: false }} name="SignUp1" component={SignUp1} />
            <screens.Screen options={{ headerShown: false }} name="SignUp2" component={SignUp2} />
            <screens.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <screens.Screen options={{ headerShown: false }} name="TabScreen" component={TabScreen} />

        </screens.Navigator>
    </NavigationContainer>
);

