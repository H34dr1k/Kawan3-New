//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, Picker, AsyncStorage, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import dt from '../../api'

var dat = new dt;
var api = dat.api();
var user = dat.user();
var image = dat.image();

var hobby = [];
var datauser = [];

// create a component
export default class hobbyScreen extends Component {

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.load();
        })
    }

    async load(){
        console.log('Before');
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
                    AsyncStorage.setItem('hobby', rd);
                    hobby = JSON.parse(rd);
                })
            }else{
                hobby = JSON.parse(rd);
            }
        })

        await AsyncStorage.getItem('datauser').then(rd => {
            datauser = JSON.parse(rd);
        })
        await this.loadHobby();

        this.setState({ loaded: true });
        this.render();
    }

    loadHobby(){
        const newData = hobby.filter(item => {
            return item.type1 == this.state.type1 && item.type2 == this.state.type2
        });
        
        this.setState({ hobby: newData });
    }

    loadBy1(value){
        const newData = hobby.filter(item => {
            return item.type1 == value && item.type2 == this.state.type2
        });
        
        this.setState({ hobby: newData });
    }

    loadBy2(value){
        const newData = hobby.filter(item => {
            return item.type1 == this.state.type1 && item.type2 == value
        });
        
        this.setState({ hobby: newData });
    }

    state = {
        loaded: false,
        hobby: [],
        type1: 'General',
        type2: 'Indoors'
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
                    <View style={{ marginBottom: 10 , marginHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{fontSize: 16, color: '#49438D', marginTop: -2, marginRight: 10 }}>
                            Category : 
                        </Text>

                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Picker
                                selectedValue={this.state.type1}
                                style={{ height: 50, width: 150 }}
                                onValueChange={value => { this.setState({ type1: value }),  this.loadBy1(value) }}
                            >
                                <Picker.Item label="General" value="General" />
                                <Picker.Item label="Collection" value="Collection" />
                                <Picker.Item label="Competitive" value="Competitive" />
                                <Picker.Item label="Observation" value="Observation" />
                            </Picker>
                            <Picker
                                selectedValue={this.state.type2}
                                style={{ height: 50, width: 150 }}
                                onValueChange={value => { this.setState({ type2: value }), this.loadBy2(value) }}
                            >
                                <Picker.Item label="Indoors" value="Indoors" />
                                <Picker.Item label="Outdoors" value="Outdoors" />
                            </Picker>
                        </View>

                    </View>

                    <FlatList
                        style={{width:'100%', marginBottom: hp('5%')}}
                        data={this.state.hobby}
                        keyExtractor={(item) => item.key}
                        renderItem={({item}) => {
                            return(
                                <View key={item.kodeuser} style={{ marginHorizontal: 15, marginVertical: 5, backgroundColor:"#628DE7", borderRadius: 10, padding: 20 }} >    
                                    <Text type="rbold" style={{fontSize:hp('3%'), color:"white"}}>{item.name}</Text>
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