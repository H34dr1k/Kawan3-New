//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
export default class eventScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>eventScreen</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
    },
});

//make this component available to the app
