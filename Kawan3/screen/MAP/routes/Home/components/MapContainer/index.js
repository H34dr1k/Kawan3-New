import React from "react";
import { Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { View } from "native-base";
import MapView from "react-native-maps";

export const MapContainer = ({ region }) => {
    return (
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
            >
                <MapView.Marker 
                    coordinate={region}
                    pinColor="blue"
                />
            </MapView>
        </View>
    );


}

export default MapContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});