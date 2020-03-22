import React from "react";

import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StatusBarStyle,
    Platform,
   View, Text,
    Button,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    ToastAndroid
} from "react-native";

import "react-native-gesture-handler";


import { Container } from "native-base";
import MapContainer  from "./MapContainer";

class findMapScreen extends React.Component{
    componentDidMount() {
        this.props.getCurrentLocation();
    }
    render(){

        const region = {
            latitude: -0.021250,
            longitude: 109.336929,
            latitudeDelta: 0.0922,
            longitudeDelta:0.0421,
        }
        return(
            <Container>
                <MapContainer region={region} />
            </Container>
        );
    }
}

export default findMapScreen;