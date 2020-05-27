import React,  {Component} from 'react';
import {View, Text, Image, TouchableOpacity, AsyncStorage, ImageBackground, ScrollView, TextInput, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import RadioForm, {RadioButton,RadioButtonInput,RadioButtonLabel} from 'react-native-simple-radio-button';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import dt from '../api'

var dat = new dt;
var api = dat.api();
var image = dat.image();
var user = dat.user();

var dataUser = [];

var memberset = [
    // {label: "Invite Only", value: 0},
    {label: "Public", value: 'Public'},
    {label: "Private", value: 'Private'}
];

class createComm extends React.Component {
    static navigationOptions= {
        title: 'createComm',
        header: null
    }

    state = {
        loaded: false,
        name: '',
        desc: '',
        max: 100,
        membersetting: 'Public'
    }

    componentDidMount(){
        this.load();
        this.props.navigation.addListener('focus', () => {
            this.load();
        })
    }

    async load(){
        await AsyncStorage.getItem('datauser').then(rd => {
            dataUser = JSON.parse(rd);
        });

        this.setState({ loaded: true });
        this.render();
    }

    async createComm(){
        this.setState({ loaded: false });
        this.render();

        var dataBaru = JSON.parse('{}');
        dataBaru.name = this.state.name;
        dataBaru.desc = this.state.desc;
        dataBaru.max = this.state.max;
        dataBaru.membersetting = this.state.membersetting;
        dataBaru.lat = dataUser.latitude;
        dataBaru.long = dataUser.longitude;

        await fetch(api + '/api/createCommunity/' + dataUser.kodeuser, { method: 'POST', body: JSON.stringify(dataBaru) })
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            if(rd != 'berhasil'){
                Alert.alert('Error', rd);
                return;
            }

            Alert.alert('Success!', 'You have successfully created a community!');

            this.props.navigation.reset({
                index: 0,
                routes : [{ name: 'Home' }]
            })
        })
    }

    render(){
        if (!this.state.loaded){
            return (
                <View style={{ alignItems: "center", flex: 1, backgroundColor: '#EFEEEE' }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }else{

        }
        return(
            <ScrollView style={{flex: 1, backgroundColor: '#EFEEEE'}}>
                <View style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flex: 0,flexDirection: 'row', height: 80, paddingTop: 7, width: '100%', backgroundColor: '#628DE7' }}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('addScreen')}>
                        <Image source={require('../src/image/arrowBack.png')} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 24, color: 'white'}}>Create a</Text>
                        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>Community</Text>
                    </View>
                </View>
                <View style={{flex: 1, marginHorizontal: 26 }}>
                    {/* <Text style={{fontSize: 18, color: '#628DE7', fontWeight: 'bold'}}>Step 1</Text> */}
                    {/* <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Category</Text>
                        <TextInput placeholder="Choose the category" style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />
                    </View> */}
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Community Name</Text>
                        <TextInput 
                            placeholder="Choose the name"  
                            style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} 
                            onChangeText={(value) => this.setState({ name: value }) }/>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Description</Text>
                        <TextInput 
                            multiline={true} 
                            placeholder="What is the description" 
                            style={{height: 200, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} 
                            onChangeText={(value) => this.setState({ desc: value }) }/>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Maximum Member</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput 
                                placeholder="100" 
                                keyboardType="number-pad" 
                                style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, height: 45, borderRadius: 5, width: 70}} 
                                onChangeText={(value) => this.setState({ max: value }) }/>
                            <Text style={{fontSize: 18, color: '#49438D', margin: 10}}>Member</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Member Setting</Text>
                        <View style={style.container}>
                            <RadioForm 
                            radio_props = {memberset} 
                            onPress = {(value) => this.setState({ membersetting: value })}
                            buttonSize={14.5}
                            buttonOuterSize={25}
                            selectedButtonColor={'#49438D'}
                            selectedLabelColor={'#49438D'}
                            labelStyle={{ fontSize: hp('2%'), marginRight: wp('10%') }}
                            formHorizontal={true}
                            buttonColor={'#C8C8C8'}
                            buttonWrapStyle={{ borderWidth: 1 }}
                            />
                        </View>
                    </View>
                </View>
                {/* <View style={{flex: 1, marginHorizontal: 26, marginTop: 20}}>
                    <Text style={{fontSize: 18, color: '#628DE7', fontWeight: 'bold'}}>Step 2</Text>
                    <View style={{marginTop: 40, flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image source={require('../src/image/addPhoto.png')} />
                        </TouchableOpacity>
                        <Text style={{fontSize: 16, color: '#D2D3D7', margin: 30}}>Add Photo</Text>
                    </View>
                    
                </View> */}
                <View style={{marginHorizontal: 26, marginVertical: hp('5%') }}>
                    <TouchableOpacity onPress={()=> this.createComm()} style={{width: '100%', height: 56, backgroundColor: '#49438D', borderRadius: 10}}>
                        <ImageBackground source={require('../src/image/decoStar.png')} style={{width: '100%', height: '100%'}}>
                            <Text style={{fontSize: 18, color: 'white', textAlign: 'center', marginTop: 15}}>
                                Create Community
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
export default createComm;

const style = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});