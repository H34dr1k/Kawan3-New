//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert, FlatList, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';

import { getBlogs } from './CRUD(percobaan)'
import { connect } from 'react-redux'
import _ from 'lodash';

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

import dt from '../api'

var dat = new dt;
var api = dat.api();
var image = dat.image();

var dataUser = [];
var events = [];

// create a component
class personalEventScreen extends Component {

    state = {
        loaded: false
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.setState({ loaded: false });
            this.load();
        })
    }

    async delete(id){
        this.setState({ loaded: false });
        this.render();

        await fetch(api + '/api/event/' + id, {
            method: "DELETE"
        })
        .then(rd => {
            return rd.text()
        })
        .then(rs => {
            if(rs != "berhasil"){
                Alert.alert('Error', rs);
                return;
            }
            // alert(rs);
            this.load();
        });
    }

    async load() {
        await AsyncStorage.getItem('datauser')
        .then(rd => {
            dataUser = JSON.parse(rd);
        });

        await fetch(api + "/api/event/creator/" + dataUser.kodeuser)
        .then(rd => {
            return rd.text()
        })
        .then(rs => {
            if(rs.indexOf('[{"id":') == -1){
                Alert.alert('Error', rs);
                return;
            }
            events = JSON.parse(rs);
        });
        this.setState({ loaded: true });
        this.render();
    }

    render() {
        if(!this.state.loaded){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <FlatList
                        style={{width:'100%'}}
                        data={events}
                        keyExtractor={(item) => item.key}
                        renderItem={({item}) => {
                            return(
                                <View style={{ marginHorizontal: 26, marginVertical: 10, backgroundColor:"#628DE7", borderRadius:10, padding:20,}} key={item.id} >    
                                    <View style={{ flexDirection:"row" }}>
                                        <Image source={{ uri : image + item.profile}} style={{ marginRight: 10, width:wp('10%'), height:hp('5%'), borderRadius: 45 }} />

                                        <View>
                                            <Text type="rbold" style={{fontSize:hp('3%'), color:"white"}}>{item.name}</Text>
                                            <Text style={{color:"white"}}>{item.desc}</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                                        <TouchableOpacity onPress={() => {
                                            AsyncStorage.setItem('editEvent', JSON.stringify(item)).then(rs => {
                                                this.props.navigation.navigate('Edit Event');
                                            });
                                        }}>
                                            <View style={{marginRight:20}}>
                                                <Text style={{ color: "lightgrey" }} >Edit</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.delete(item.id)} >
                                            <View>
                                                <Text  style={{ color: "lightgrey" }} >Delete</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});


function mapStateToProps(state){

    const listOfBlogs = _.map(state.blogsList.blogsList, (val, key) => {
        return{
            ...val,
            key:key
        }
    })

    return{
        listOfBlogs
    }
}

export default connect(mapStateToProps, {getBlogs })(personalEventScreen);

//make this component available to the app
