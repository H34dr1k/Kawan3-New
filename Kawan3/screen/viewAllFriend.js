//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, FlatList, AsyncStorage } from 'react-native';
import { Button } from 'native-base';

import dt from '../api';

var data = new dt;
var api = data.api();
var user = data.user();

var datauser = [];
var friends = [];

export default class viewAllFriend extends Component {

    state = {
        loaded: false,
        emptyFriend: false
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.setState({ loaded: false });
            this.load();
        });
    }

    async load(){
        friends = [];
        
        await AsyncStorage.getItem('datauser')
        .then(rd => {
            datauser = JSON.parse(rd);
        });

        await fetch(api + '/api/getFriends/' + datauser.kodeuser)
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            rd == "[]" ? this.setState({ emptyFriend: true }) : this.setState({ emptyFriend: false });
            if(rd == "[]"){
                return;
            }
            else if(rd.indexOf('"kodeuser":') == -1 || rd.indexOf('"name":') == -1){
                Alert.alert('Error', rd);
                return;
            }

            friends = JSON.parse(rd);
        })

        this.setState({ loaded: true });
        this.render();
    }

    render() {
        if (!this.state.loaded){
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
        else{
            return (
                <View style={styles.container}>
                    {
                        this.state.emptyFriend && (
                            <Text style={{ color: 'grey', textAlign: 'center' }}>
                                You don't have friend. But don't be so sad about it :)
                            </Text>
                        )
                    }

                    <FlatList 
                        style={{width:'100%'}}
                        data={friends}
                        keyExtractor={item => item.key}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity key={item.key} style={{justifyContent:'center', alignItems:"center", flexDirection:"row"}} >
                                    <View style={{flex:3}}>
                                        <Image style={{width:80, height:80}} source={{ uri: user + item.picture }} />
                                    </View>
                                    <View style={{flex:5}}>
                                        <Text style={styles.nama}>
                                            { item.name }
                                        </Text>
                                        {/* <Text style={styles.hobi}>Football, games, rubik, basket</Text> */}
                                    </View>
                                    <TouchableOpacity style={{flex:2,  alignItems:"flex-end"}}>
                                        <Image resizeMode="contain" style={{width:25, height:25}} source={require("../src/image/iconMore.png")} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            );
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:28,
        backgroundColor:"white",
        paddingHorizontal:28,
    },
    nama: {
        fontSize:18,
        fontWeight:"bold"
    },
    hobi:{
        fontSize:12,
        color: "#A5AFA5"
    }
});

//make this component available to the app
