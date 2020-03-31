import React,  {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

class editProfil extends React.Component {
    
    render(){
        return(
            <View style={{flex: 0}}>
                <View style={{flex: 0, backgroundColor: '#49438D', height: 229, paddingTop: 26.5}}>
                    <ImageBackground source={require('../src/image/decoStar.png')} style={{width: '100%', height: '100%', flexDirection: 'row'}}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack('profilScreen')}>
=======
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('profilScreen')}>
>>>>>>> bb7da155584ade5355708b671e1cdde5ed1c2504
=======
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('profilScreen')}>
>>>>>>> bb7da155584ade5355708b671e1cdde5ed1c2504
=======
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('profilScreen')}>
>>>>>>> bb7da155584ade5355708b671e1cdde5ed1c2504
                        <Image source={require('../src/image/arrowBack.png')} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 15}}>Profile</Text>
                    </ImageBackground>
                </View>
                <View style={{flex: 0, alignItems: 'center', marginTop: -80}}>
                    <TouchableOpacity>
                        <Image source={require('../src/image/profilPic.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, marginHorizontal: 50, marginTop: 30}}>
                    <View>
                        <Text style={{fontSize: 16}}>Nama</Text>
                        <TextInput placeholder="Nama Anda" style={{height: 41, borderBottomWidth: 1, color: '#526EDD'}} />
                    </View>
                    <View style={{marginTop: 80}}>
                        <Text>Status</Text>
                        <TextInput placeholder="What will you do?" style={{height: 41, borderBottomWidth: 1, color: 'gray'}} />
                    </View>
                </View>
            </View>
        );
    }
}

export default editProfil;