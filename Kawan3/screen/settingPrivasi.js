import React, {Component} from 'react';
import {View, ActivityIndicator, Text, Image, TouchableOpacity, Switch, AsyncStorage} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler'
import dt from '../api';
import { createNativeWrapper } from 'react-native-gesture-handler';

var datauser = [];
var dat = new dt;

class settingPrivasi extends React.Component {
    static navigationOptions= {
        title: 'settingPrivasi',
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            switchValue1: false,
            switchValue2: false,
            switchValue3: false,
            loaded: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('datauser').then(rs => {
            datauser = JSON.parse(rs);
            this.setState({ loaded: true });
            this.adjustSettings();
            this.render();
        });

    }

    saveSetting(){
        var dataBaru = JSON.parse("{ }");
        dataBaru.privacyTampilkanFotoAnda = this.state.switchValue1;
        dataBaru.privacyTerimaTeman = this.state.switchValue2;
        dataBaru.privacyBerbagiLokasi = this.state.switchValue3;
        dataBaru.settingOn = "privasi";

        fetch(dat.api() + "/api/setting/" + datauser.kodeuser, {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataBaru)
        })
        .then(rs => {
            return rs.text();
        })
        .then(rd => {
            this.setState({loaded:false});
            this.render();

            if(rd != "berhasil"){
                alert(rd);
                return;
            }

            fetch(dat.api() + "/api/user/" + datauser.email)
            .then(rs => {
                return rs.text();
            })
            .then(rd => {
                AsyncStorage.setItem('datauser', rd);
                this.props.navigation.navigate('settingScreen');
            })
        })
    }

    adjustSettings(){
        if(datauser.setting.privacyTampilkanFotoAnda == 1){
            this.setState({switchValue1: true});
        }
        if(datauser.setting.privacyTerimaTeman == 1){
            this.setState({switchValue2: true});
        }
        if(datauser.setting.privacyBerbagiLokasi == 1){
            this.setState({switchValue3: true});
        }
    }

    render(){
        if(!this.state.loaded){
            return(
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }else{
            return(
                <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
                    <View style={{flex: 0, marginTop: 35, flexDirection: 'row', marginHorizontal: 28}}>
                        <TouchableOpacity onPress={()=> this.saveSetting()}>
                            <Image source={require('../src/image/iconBack.png')} />
                        </TouchableOpacity>
                        <Text style={{fontSize: 24, fontWeight: 'bold', color: '#626262', marginLeft: 28}}>Setting</Text>
                    </View>
                    <View style={{borderWidth: 1, borderColor: '#E3E0E0', marginTop: 35}}></View>
                    <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 28}}>
                        <Image source={require('../src/image/iconPrivasi.png')} />
                        <Text style={{fontSize: 24, fontWeight: 'bold', color: '#575151', marginLeft: 30}}>Privasi</Text>
                    </View>
                    <View style={{borderWidth: 1, borderColor: '#E3E0E0', marginTop: 35}}></View>
                    <View style={{marginHorizontal: 28, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{flex: 1, fontSize: 20, color: '#575151'}}>Tampilkan Foto Anda</Text>
                        <Switch value={this.state.switchValue1} onValueChange={(switchValue1) => this.setState({switchValue1})} style={{marginTop: 2}} />
                    </View>
                    <View style={{marginHorizontal: 28, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{flex: 1, fontSize: 20, color: '#575151'}}>Terima Teman Baru Boleh Mengikuti</Text>
                        <Switch value={this.state.switchValue2} onValueChange={(switchValue2) => this.setState({switchValue2})} style={{marginTop: 2}} />
                    </View>
                    <View style={{marginHorizontal: 28, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{flex: 1, fontSize: 20, color: '#575151'}}>Berbagi Lokasi</Text>
                        <Switch value={this.state.switchValue3} onValueChange={(switchValue3) => this.setState({switchValue3})} style={{marginTop: 2}} />
                    </View>
                </View>
            );
        }
    }
}

export default settingPrivasi;