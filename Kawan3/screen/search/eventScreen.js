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
export default class eventScreen extends Component {
    
    state = {
        loaded: false,
        username: '',
        data: [],
        emptyEvent: false
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.setState({ loaded: false });
            this.load();
        })
    }

    async load(){
        users = [];
        this.state.data = [];

        await AsyncStorage.getItem('datauser').then(rd => {
            datauser = JSON.parse(rd);
        })

        await fetch(api + '/api/eventNotCreator/' + datauser.kodeuser)
        .then(rs => {
            return rs.text()
        })
        .then(rd => {
            if(rd == "[]"){
                this.setState({ loaded: true, emptyEvent: true });
                this.render;
                return;
            }
            
            if(rd.indexOf('"id":') == -1 || rd.indexOf('"name":') == -1 || rd.indexOf('"desc":') == -1){
                Alert.alert('Error', rd);
                return;
            }

            users = JSON.parse(rd);
            this.setState({ data: users, emptyEvent: false });
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
                        <Text style={{ fontWeight: "bold", fontSize: 16, color: '#49438D', marginBottom: 5}}>
                            Search : 
                        </Text>

                        <TextInput 
                        onChangeText={value => this.setState({username: value}, this.onSearch(value))}
                        value={this.state.username}
                        placeholder="Search..."
                        style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />

                    </View>

                    {
                        this.state.emptyEvent && (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: "grey" }}>
                                    There are no upcoming event...
                                </Text>
                            </View>
                        )
                    }

                    <FlatList
                        style={{width:'100%'}}
                        data={this.state.data}
                        keyExtractor={(item) => item.key}
                        renderItem={({item}) => {
                            return(
                                <View key={item.key} style={{ marginHorizontal: 15, marginVertical: 10, backgroundColor:"#628DE7", borderRadius:10, paddingHorizontal:15, paddingBottom:10,}} >    
                                    <View style={{flex:1, alignItems:"center", flexDirection:"row", }}>
                                        <Image resizeMode="contain" source={{ uri : image + item.preview}} style={{flex:1,marginRight:15, width:wp('20%'), height:hp('15%'), borderRadius: 75 }} />

                                        <View style={{flex:4}}>
                                            <Text style={{fontSize:hp('3%'), fontWeight:"bold", color:"white", marginBottom:7}}>{item.name}</Text>
                                            <Text style={{color:"white"}}>{item.desc}</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                                        <TouchableOpacity onPress={() => {}}
                                            >
                                            <View style={{marginTop:-10, width: 80, height: 30, borderRadius: 6, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ color: "black" }} >Join</Text>
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
