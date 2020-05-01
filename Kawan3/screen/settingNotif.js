import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Switch, AsyncStorage, ActivityIndicator} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler'
import dt from '../api';

var datauser = [];
var dat = new dt;

class settingNotif extends React.Component {
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
            switchValue4: false,
            switchValue5: false,
            loaded : false
        }
    }

    change(){
        this.setState({ switchValue2: false, switchValue3: false });
        this.render();
    }

    componentDidMount() { 
        AsyncStorage.getItem('datauser').then(rs => {
            datauser = JSON.parse(rs);
            this.setState({ loaded: true });
            this.adjustSettings();
            this.render();
        });
    }

    adjustSettings(){
        if(datauser.setting.notifikasi == 1){
            this.setState({switchValue1: true});
        }

        if(datauser.setting.notifikasiDariTeman == 1){
            this.setState({switchValue2: true});
        }

        if(datauser.setting.notifikasiDariOrangTerdekat == 1){
            this.setState({switchValue3: true});
        }

        if(datauser.setting.postinganDariTeman == 1){
            this.setState({switchValue4: true});
        }

        if(datauser.setting.postinganDariOrangTerdekat == 1){
            this.setState({switchValue5: true});
        }
    }

    saveSetting(){
        var dataBaru = JSON.parse("{ }");
        dataBaru.privacyTampilkanFotoAnda = this.state.switchValue1;
        dataBaru.privacyTerimaTeman = this.state.switchValue2;
        dataBaru.privacyBerbagiLokasi = this.state.switchValue3;
        dataBaru.settingOn = "notif";

        fetch(dat.api() + "/api/setting/" + datauser.kodeuser, {
            method: "PUT",
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

    render() {
        if(!this.state.loaded){
            return(
                <View style={{flex:1, alignItems: "center", justifyContent:"center"}}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
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
                    <Image source={require('../src/image/iconNotif.png')} />
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: '#575151', marginLeft: 30}}>Notifikasi</Text>
                </View>
                <View style={{borderWidth: 1, borderColor: '#E3E0E0', marginTop: 35}}></View>
                <View>
                    <View style={{marginHorizontal: 28, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{flex: 1, fontSize: 22, color: '#575151'}}>Matikan Notifikasi</Text>
                        <Switch value={this.state.switchValue1} onValueChange={(switchValue1) => {this.setState({switchValue1});this.change()}} style={{marginTop: 2}} />
                    </View>
                    <View style={{marginLeft: 50, marginHorizontal: 28, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{flex: 1, fontSize: 20, color: '#575151'}}>Dari Teman</Text>
                        <Switch value={this.state.switchValue2} onValueChange={(switchValue2) => this.setState({switchValue2})} style={{marginTop: 2}} disabled={this.state.switchValue1 === false} />
                    </View>
                    <View style={{marginLeft: 50, marginHorizontal: 28, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{flex: 1, fontSize: 20, color: '#575151'}}>Dari Orang Terdekat</Text>
                        <Switch value={this.state.switchValue3} onValueChange={(switchValue3) => this.setState({switchValue3})} style={{marginTop: 2}} disabled={this.state.switchValue1 === false} />
                    </View>
                </View>
                <View>
                    <View style={{marginHorizontal: 28, marginTop: 50, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{flex: 1, fontSize: 22, color: '#575151'}}>Postingan</Text>
                    </View>
                    <View style={{marginLeft: 50, marginHorizontal: 28, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{flex: 1, fontSize: 20, color: '#575151'}}>Dari Teman</Text>
                        <Switch value={this.state.switchValue4} onValueChange={(switchValue4) => this.setState({switchValue4})} style={{marginTop: 2}} />
                    </View>
                    <View style={{marginLeft: 50, marginHorizontal: 28, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{flex: 1, fontSize: 20, color: '#575151'}}>Dari Orang Terdekat</Text>
                        <Switch value={this.state.switchValue5} onValueChange={(switchValue5) => this.setState({switchValue5})} style={{marginTop: 2}} />
                    </View>
                </View>
            </View>
        );
    }
}

export default settingNotif;