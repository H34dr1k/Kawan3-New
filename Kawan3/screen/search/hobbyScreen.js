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
export default class hobbyScreen extends Component {

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.load();
        })
    }

    async load(){
        this.setState({ loaded: false });

        await AsyncStorage.getItem('hobby').then(rd => {
            if(rd === null){
                fetch(api + '/api/hobby')
                .then(rs => {
                    return rs.text()
                })
                .then(rd => {
                    if(rd.indexOf('"id":') == -1 || rd.indexOf('"type1":') == -1){
                        Alert.alert(rd);
                        return;
                    }
                    AsyncStorage.setItem('hobby', JSON.stringify(rd));
                    users = JSON.parse(rd);
                })
            }else{
                users = JSON.parse(rd);
            }

            const type1 = [];
            users.forEach(item => {
                if(type1.indexOf(item.type1) == -1)
                type1.push(item.type1);
            })
            console.log(type1);
        })

        await AsyncStorage.getItem('datauser').then(rd => {
            datauser = JSON.parse(rd);
        })

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
        data: [],
        hobby: []
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
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>
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
                        data={this.state.hobby}
                        keyExtractor={(item) => item.key}
                        renderItem={({item}) => {
                            return(
                                <View key={item.kodeuser} style={{ marginHorizontal: 15, marginVertical: 5, backgroundColor:"#628DE7", borderRadius:10, padding:20,}} >    
                                    <View style={{ flexDirection:"row" }}>
                                        <Image resizeMode="center" source={{ uri : image + item.preview}} style={{ marginRight: 10, width:wp('10%'), height:hp('5%'), borderRadius: 75 }} />

                                        <View>
                                            <Text type="rbold" style={{fontSize:hp('3%'), color:"white"}}>{item.name}</Text>
                                            <Text style={{color:"white"}}>{item.desc}</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                                        <TouchableOpacity onPress={() => {
                                            
                                        }}>
                                            <View style={{marginRight:20}}>
                                                <Text style={{ color: "lightgrey" }} >Join</Text>
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