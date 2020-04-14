//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Button, FlatList, TouchableHighlight } from 'react-native';

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

// create a component
class personalEventScreen extends Component {

    componentDidMount(){
        this.props.getBlogs()
    }

    render() {
        console.log('personalEvent.js', this.props.listOfBlogs)
        return (
            <View style={styles.container}>
                <Text>personalEventScreen</Text>
                <FlatList
                    style={{width:'100%'}}
                    data={this.props.listOfBlogs}
                    keyExtractor={(item) => item.key}
                    renderItem={({item}) => {
                        return(
                            <View style={{ marginHorizontal: 26, marginVertical: 20, backgroundColor:"#628DE7", borderRadius:10, padding:20,}}>
                                
                                <Text type="rbold" style={{fontSize:hp('3%'), color:"white"}}>{item.eventName}</Text>
                                <Text style={{color:"white"}}>{item.eventDescription}</Text>

                                <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate}>
                                        <View style={{marginRight:20}}>
                                            <Text>Edit</Text>
                                        </View>
                                    </TouchableHighlight>

                                    <TouchableHighlight>
                                        <View>
                                            <Text>Delete</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        )
                    }}
                />

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
