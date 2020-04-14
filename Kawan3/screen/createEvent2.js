import React,  {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Alert} from 'react-native';
import RadioForm, {RadioButton,RadioButtonInput,RadioButtonLabel} from 'react-native-simple-radio-button';
var memberset = [
    {label: "Invite Only", value: 0},
    {label: "Public", value: 1},
    {label: "Closed", value: 2}
];
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

class createEvent2 extends React.Component {
    static navigationOptions= {
        title: 'createComm2',
        header: null
    }
    _onPressButton(){
        Alert.alert('Create Event Success')
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#EFEEEE'}}>
                {/* <View style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flex: 0,flexDirection: 'row', height: 102, width: '100%', backgroundColor: '#628DE7', paddingTop: 26.5}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('createEvent')}>
                        <Image source={require('../src/image/arrowBack.png')} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 24, color: 'white'}}>Create a</Text>
                        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>Event</Text>
                    </View>
                </View> */}
                <View style={{flex: 1, marginHorizontal: 26, marginTop: 20}}>
                    <Text style={{fontSize: 18, color: '#628DE7', fontWeight: 'bold'}}>Step 2</Text>
                    <View style={{marginTop: 40, flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image source={require('../src/image/addPhoto.png')} />
                        </TouchableOpacity>
                        <Text style={{fontSize: 16, color: '#D2D3D7', margin: 30}}>Add Photo</Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Maximum Member</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput placeholder="Ex: 1" style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, height: 45, borderRadius: 5, width: 70}} />
                            <Text style={{fontSize: 18, color: '#49438D', margin: 10}}>Member</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Member Setting</Text>
                        <View style={style.container}>
                            <RadioForm radio_props = {memberset} 
                            onPress = {(value) => {}}
                            />
                        </View>
                    </View>  
                </View>
                <View style={{marginHorizontal: 26}}>
                    <TouchableOpacity onPress={this._onPressButton} style={{width: '100%', height: 56, backgroundColor: '#49438D', borderRadius: 15}}>
                    <ImageBackground source={require('../src/image/decoStar.png')} style={{width: '95%', height: '100%'}}>
                        <Text style={{fontSize: 18, color: 'white', textAlign: 'center', marginTop: 15}}>Create My Event</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default createEvent2;

const style = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});