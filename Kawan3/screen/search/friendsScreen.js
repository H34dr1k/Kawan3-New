//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import dt from '../../api'

var dat = new dt;
var api = dat.api();
var user = dat.user();
var image = dat.image();

var users = [];
var datauser = [];

// create a component
export default class friendsScreen extends Component {

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.load();
        })
    }

    async load(){
        this.setState({ loaded: false });

        await AsyncStorage.getItem('datauser').then(rd => {
            datauser = JSON.parse(rd);
        })

        await fetch(api + '/api/userBB/' + datauser.kodeuser)
        .then(rs => {
            return rs.text()
        })
        .then(rd => {
            if(rd.indexOf('"kodeuser":') == -1 || rd.indexOf('"name":') == -1 || rd.indexOf('"email":') == -1)
            Alert.alert('Error', rd);

            users = JSON.parse(rd);
            this.setState({ data: users });
        });

        this.setState({ loaded: true });
        this.render();
    }

    onSearch(value){
        const newData = users.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;

            const textData = value.toUpperCase();

            return itemData.indexOf(textData) > -1;
        })

        this.setState({ data: newData });
        // this.render;
    }

    state = {
        loaded: false,
        username: '',
        data: []
    }

    async requestFriend(user1, user2){
        // await fetch(api + '/api/rf/'+ user1 + '/' + user2, { method: 'POST' })
        // .then(rs => {
        //     return rs.text();
        // })
        // .then(rd => {
        //     if(rd == 'requested'){
        //         var newData = users.filter(item => {
        //             return item.kodeuser != user2;
        //         })
        //         users = newData;
        //         this.setState({ data: newData, username: '' });
        //     }
        // })
    }

    render() {
        if(!this.state.loaded){
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        else{
            return (
                <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                    <View style={{ marginBottom: 10 , marginHorizontal: 15 }}>
                        <Text style={{fontWeight:"bold", fontSize: 16, color: '#49438D', marginBottom: 5}}>
                            Search : 
                        </Text>

                        <TextInput 
                        onChangeText={value => this.setState({username: value}, this.onSearch(value))}
                        value={this.state.username}
                        placeholder="Search..."
                        style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />

                    </View>

                    <FlatList
                        style={{width:'100%'}}
                        data={this.state.data}
                        keyExtractor={(item) => item.key}
                        renderItem={({item}) => {
                            return(
                                <View key={item.kodeuser} style={{ marginHorizontal: 15, marginVertical: 5, backgroundColor:"#628DE7", borderRadius:10, padding:20,}} >    
                                    <View style={{flex:1, flexDirection:"row",  alignItems:"center" }}>
                                        <Image resizeMode="center" source={{ uri : user + item.picture}} style={{ marginRight: 10, width:wp('13%'), height:hp('8%'), borderRadius: 75 }} />

                                        <View>
                                            <Text style={{fontSize:hp('3%'), color:"white", fontWeight:"bold"}}>{item.name}</Text>
                                            <Text style={{color:"white"}}>{item.desc}</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                                        <TouchableOpacity onPress={() => this.requestFriend(datauser.kodeuser, item.kodeuser)}>
                                            <View style={{width:80, height:30, borderRadius:6, paddingVertical:5, paddingHorizontal:10, backgroundColor:"white", justifyContent:"center", alignItems:"center"}}>
                                                <Text style={{ color: "blue" }} > 
                                                    Add 
                                                </Text>
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
        backgroundColor: '#e5e5e5',
    },
});

//make this component available to the app
