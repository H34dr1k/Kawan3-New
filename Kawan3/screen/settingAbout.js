import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Switch} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler'

class settingAbout extends React.Component {
    static navigationOptions= {
        title: 'settingAbout',
        header: null
    }
    render() {
        return(
            <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
                <View style={{flex: 0, marginTop: 35, flexDirection: 'row', marginHorizontal: 28}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('settingScreen')}>
                        <Image source={require('../src/image/iconBack.png')} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: '#626262', marginLeft: 28}}>Setting</Text>
                </View>
                <View style={{borderWidth: 1, borderColor: '#E3E0E0', marginTop: 35}}></View>
                <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 28}}>
                    <Image source={require('../src/image/iconAbout.png')} />
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: '#575151', marginLeft: 30}}>Tentang Kami</Text>
                </View>
                <View style={{borderWidth: 1, borderColor: '#E3E0E0', marginTop: 35}}></View>
                <View style={{marginHorizontal: 28, marginTop: 20}}>
                    <Text style={{fontSize: 18, color: '#575151'}}>Kawan adalah aplikasi yang memiliki manfaat untuk mencari kawan sehobi. Ayo coba aplikasi kawan ini dan coba rasakan perbedaanya dari app lainnya yang memiliki fitur serupa tapi berbeda.</Text>
                </View>
            </View>
        );
    }
}

export default settingAbout;