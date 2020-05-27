//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Image, Picker } from 'react-native';
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
        this.load();
        this.props.navigation.addListener('focus', () => {
            this.load();
        })
    }

    async load(){
        users = [];

        this.setState({ loaded: false });

        await AsyncStorage.getItem('datauser').then(rd => {
            datauser = JSON.parse(rd);
        })

        await fetch(api + '/api/userBB/' + datauser.kodeuser)
        .then(rs => {
            return rs.text()
        })
        .then(rd => {
            if(rd == "[]"){
                this.setState({ loaded: true, emptyUser: true });
                this.render;
                return;
            }

            if(rd.indexOf('"kodeuser":') == -1 || rd.indexOf('"name":') == -1 || rd.indexOf('"email":') == -1){
                Alert.alert('Error', rd);
                return;
            }

            users = JSON.parse(rd);
            this.setState({ data: users, emptyUser: false });
        });

        await this.distance();
        await this.onDistance('< 2');

        this.setState({ loaded: true });
        this.render();
        
    } 
    
    distance(){
        const lat1 = datauser.latitude;
        const lon1 = datauser.longitude;
        for (let i = 0; i < users.length; i++) {
            const lat2 = users[i].latitude;
            const lon2 = users[i].longitude;

            const R = 6371e3; // metres
            const φ1 = lat1 * Math.PI/180; // φ, λ in radians
            const φ2 = lat2 * Math.PI/180;
            const Δφ = (lat2-lat1) * Math.PI/180;
            const Δλ = (lon2-lon1) * Math.PI/180;

            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            const d = R * c; // in metres

            const e = Math.round((d/1000) * 100) / 100; // in kilometres

            users[i].distance = e;
        };
    }

    onSearch(value){
        this.setState({ noSearch: false })

        const newData = users.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;

            const textData = value.toUpperCase();

            return itemData.indexOf(textData) > -1;
        })

        this.setState({ data: newData });

        if(newData.length == 0 && !this.state.emptyUser){
            this.setState({ noSearch: true, noNearby: false })
        }

        if(newData.length != 0){
            this.setState({ noSearch: false, noNearby: false })
            this.onDistance(this.state.distance);
        }

        if(value == ''){
            this.onDistance(this.state.distance);
        }
    }

    onDistance(value){
        this.setState({ noNearby: false })
        const newData = users.filter(item => {
            switch (value) {
                case '< 2':
                    return item.distance < 2 ;
                    break;
                case '< 5':
                    return item.distance < 5;
                    break;
                case '< 10':
                    return item.distance < 10;
                    break;
                case '> 10':
                    return item.distance > 10 && item.distance < 20;
                    break;
                default:
                    return item.distance < 5;
                    break;
            }
        })

        this.setState({ data: newData })

        if(newData.length == 0 && !this.state.emptyUser){
            this.setState({ noNearby: true, noSearch: false })
        }
    }

    state = {
        loaded: false,
        emptyUser: false,
        noNearby: false,
        noSearch: false,
        username: '',
        data: [],
        distance: '< 2'
    }

    async requestFriend(user1, user2){
        await fetch(api + '/api/rf/'+ user1 + '/' + user2, { method: 'POST' })
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            if(rd == 'requested'){
                Alert.alert('Requested!', 'You have added this user!\nWait for his/her confirmation!');
            }
            else if(rd == 'friend'){
                Alert.alert('Added!', 'You are friend with this user now!');
            }
            else{
                Alert.alert('Error', rd);
                return;
            }

            // var newData = users.filter(item => {
            //     return item.kodeuser != user2;
            // })

            // users = newData;
            // this.setState({ data: newData, username: '', emptyUser: false });
            // this.render;
        })

        this.load();
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

                    <View style={{ marginBottom: 10 , marginHorizontal: 15, flexDirection: "row", alignItems:"center" }}>
                        <Text style={{fontWeight:"bold", fontSize: 16, color: '#49438D', marginBottom: 5}}>
                            Distance :
                        </Text>

                        <Picker
                            selectedValue={this.state.distance}
                            style={{ height: 50, width: 120, marginLeft: wp('2%') }}
                            onValueChange={value => { this.setState({ distance: value }), this.onDistance(value) }}
                        >
                            <Picker.Item label="< 2 KM" value="< 2" />
                            <Picker.Item label="< 5 KM" value="< 5" />
                            <Picker.Item label="< 10 KM" value="< 10" />
                            <Picker.Item label="> 10 KM" value="> 10" />
                        </Picker>
                    </View>

                    {
                        this.state.emptyUser && (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'grey' }}>
                                Look's like you are friends with all the users!
                            </Text>
                        </View>)
                    }

                    {
                        this.state.noSearch && (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'grey' }}>
                                I'm sorry, no user have the name that you searched...
                            </Text>
                        </View>)
                    }

                    {
                        this.state.noNearby && (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'grey' }}>
                                I'm sorry, no user is inside the selected radius...
                            </Text>
                        </View>)
                    }

                    <FlatList
                        style={{width:'100%'}}
                        data={this.state.data}
                        keyExtractor={(item) => item.key}
                        renderItem={({item}) => {
                            return(
                                <View key={item.key} style={{ marginHorizontal: 15, marginVertical: 5, backgroundColor:"#628DE7", borderRadius:10, padding:20,}} >    
                                    <View style={{flex:1, flexDirection:"row",  alignItems:"center" }}>
                                        <Image resizeMode="center" source={{ uri : user + item.picture}} style={{ marginRight: 10, width:wp('13%'), height:hp('8%'), borderRadius: 75 }} />

                                        <View>
                                            <Text style={{fontSize:hp('3%'), color:"white", fontWeight:"bold"}}>{item.name}</Text>
                                            <Text style={{color:"white"}}>{item.desc}</Text>
                                            <Text style={{ color: 'lightgrey' }}>{item.distance} KM</Text>
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
