import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

class travelFriend extends React.Component {
    static navigationOptions= {
        title: 'travlFriend',
        header: null
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
                <View style={{backgroundColor: 'lightblue'}}>
                <View style={{flex: 0, paddingTop: 26.5, marginHorizontal: 25}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('addScreen')}>
                        <Image source={require('../src/image/iconBack.png')} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: '#606060', paddingTop: 20}}>Find</Text>
                    <Text style={{fontSize: 24, color: '#606060'}}>a travel friend</Text> 
                    <View style={{marginBottom: 20}}>
                        <TextInput placeholder="Search a travel friend" style={{width: '100%', paddingLeft: 50, paddingRight: 20, marginTop
                        : 20, height: 47, borderRadius: 20, backgroundColor: 'white'}}></TextInput>
                        <Image source={require('../src/image/iconSearch.png')} style={{position: 'absolute', top: 33, left: 15}} />
                    </View>
                </View>
                <View style={{borderWidth: 1, borderColor: '#D6D3D3',}}></View>
                </View>
                <ScrollView>
                <View style={{flex: 0, marginHorizontal: 31}}>
                    <View style={{marginTop: 20, width: '100%', justifyContent: 'space-between', height: 75, backgroundColor: 'white', borderRadius: 12, marginBottom: 10, flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image source={require('../src/image/find1.png')} style={{margin: 15, flex: 1}} />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center', flex: 2}}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#626262'}}>James Bond</Text>
                            <Text style={{fontSize: 11, color: '#D1DBD1'}}>Agen 007</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft: 100, marginTop: 30, flex: 1}}>
                            <Image source={require('../src/image/iconMore.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', justifyContent: 'space-between', height: 75, backgroundColor: 'white', borderRadius: 12, marginBottom: 10, flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image source={require('../src/image/find2.png')} style={{margin: 15, flex: 1}} />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center', flex: 2}}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#626262'}}>Billy Ellish</Text>
                            <Text style={{fontSize: 11, color: '#D1DBD1'}}>Singer</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft: 100, marginTop: 30,flex: 1}}>
                            <Image source={require('../src/image/iconMore.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', justifyContent: 'space-between', height: 75, backgroundColor: 'white', borderRadius: 12, marginBottom: 10, flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image source={require('../src/image/find1.png')} style={{margin: 15, flex: 1}} />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center', flex: 2}}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#626262'}}>James Bond</Text>
                            <Text style={{fontSize: 11, color: '#D1DBD1'}}>Agen 007</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft: 100, marginTop: 30, flex: 1}}>
                            <Image source={require('../src/image/iconMore.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', justifyContent: 'space-between', height: 75, backgroundColor: 'white', borderRadius: 12, marginBottom: 10, flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image source={require('../src/image/find2.png')} style={{margin: 15, flex: 1}} />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center', flex: 2}}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#626262'}}>Billy Ellish</Text>
                            <Text style={{fontSize: 11, color: '#D1DBD1'}}>Singer</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft: 100, marginTop: 30,flex: 1}}>
                            <Image source={require('../src/image/iconMore.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', justifyContent: 'space-between', height: 75, backgroundColor: 'white', borderRadius: 12, marginBottom: 10, flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image source={require('../src/image/find1.png')} style={{margin: 15, flex: 1}} />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center', flex: 2}}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#626262'}}>James Bond</Text>
                            <Text style={{fontSize: 11, color: '#D1DBD1'}}>Agen 007</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft: 100, marginTop: 30, flex: 1}}>
                            <Image source={require('../src/image/iconMore.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', justifyContent: 'space-between', height: 75, backgroundColor: 'white', borderRadius: 12, marginBottom: 10, flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image source={require('../src/image/find2.png')} style={{margin: 15, flex: 1}} />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center', flex: 2}}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#626262'}}>Billy Ellish</Text>
                            <Text style={{fontSize: 11, color: '#D1DBD1'}}>Singer</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft: 100, marginTop: 30,flex: 1}}>
                            <Image source={require('../src/image/iconMore.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
}
export default travelFriend;
