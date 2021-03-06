import React, {Component} from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler'
import dt from '../api';

var data = new dt;
var images = data.image();

class settingScreen extends React.Component {
    static navigationOptions= {
        title: 'settingScreen',
        header: null
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
                <View style={{flex: 0, marginTop: 35, flexDirection: 'row', marginHorizontal: 28}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={styles.icon}>
                        <Image source={{ uri: images + '/image/iconBack.png'}} style={styles.icon}/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: '#626262', marginLeft: 28}}>Setting</Text>
                </View>
                <View style={{marginHorizontal: 28, marginTop: 70}}>
                    <View style={{flexDirection: 'row', marginBottom: 50}}>
                        <Image source={require('../src/image/iconPrivasi.png')} />
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('settingPrivasi')}>
                            <Text style={{fontSize: 20, marginLeft: 30, color: '#575151'}}>Privasi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 50}}>
                        <Image source={require('../src/image/iconNotif.png')} />
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('settingNotif')}>
                            <Text style={{fontSize: 20, marginLeft: 27, color: '#575151'}}>Notifikasi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 50}}>
                        <Image source={require('../src/image/iconAbout.png')} />
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('settingAbout')}>
                            <Text style={{fontSize: 20, marginLeft: 21, color: '#575151'}}>Tentang Kami</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default settingScreen;

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 0.07);

const styles = StyleSheet.create({
    icon: {
        width: 15,
        height: imageHeight,
        resizeMode: "contain"
    }
});