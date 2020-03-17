import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import firebase from 'firebase';

class Loading extends React.Component {

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                this.props.navigation.navigate('homeScreen');
            } else {
                this.props.navigation.navigate('Login');
            }
        }.bind(this));
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Loading;