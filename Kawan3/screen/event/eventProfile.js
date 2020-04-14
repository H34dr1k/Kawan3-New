//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';

// create a component
export default class eventProfile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>eventProfile</Text>
                <ScrollView>
                    <View style={s.eventImg}>
                        <Image source={require('../../src/image/face2.png')} />
                    </View>

                    <Text style={s.eventName}>Seminar Logitech</Text>
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    eventImg: {
        width: '90%',
        height: '100%'
    },
    eventName: {
        letterSpacing: 0.2,
        fontWeight: "bold",
        fontSize:"14",
        color:"#526EDD"
    }
});

//make this component available to the app
