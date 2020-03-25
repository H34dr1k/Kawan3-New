import React,  {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

class createComm extends React.Component {
    static navigationOptions= {
        title: 'createComm',
        header: null
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#EFEEEE'}}>
                <View style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flex: 0,flexDirection: 'row', height: 102, width: '100%', backgroundColor: '#628DE7', paddingTop: 26.5}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('addScreen')}>
                        <Image source={require('../src/image/arrowBack.png')} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 24, color: 'white'}}>Create a</Text>
                        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>Community</Text>
                    </View>
                </View>
                <View style={{flex: 1, marginHorizontal: 26, marginTop: 20}}>
                    <Text style={{fontSize: 18, color: '#628DE7', fontWeight: 'bold'}}>Step 1</Text>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Category</Text>
                        <TextInput placeholder="Choose the category" style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Community Name</Text>
                        <TextInput placeholder="Choose the name" style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Description</Text>
                        <TextInput multiline={true} placeholder="What the description" style={{height: 200, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />
                    </View>
                </View>
                <View style={{marginHorizontal: 26}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('createComm2')} style={{width: '100%', height: 56, backgroundColor: '#49438D', borderRadius: 15}}>
                    <ImageBackground source={require('../src/image/decoStar.png')} style={{width: '95%', height: '100%'}}>
                        <Text style={{fontSize: 18, color: 'white', textAlign: 'center', marginTop: 15}}>Continue</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default createComm;