import React,  {Component} from 'react';
import {View, Modal,Text, Image,Button, TouchableOpacity, ImageBackground, ScrollView, TextInput, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import {postBlogs} from './CRUD(percobaan)'
import {connect} from 'react-redux'

var memberset = [
    { label: "Invite Only", value: 0 },
    { label: "Public", value: 1 },
    { label: "Closed", value: 2 }
];
class createEvent extends React.Component {
    static navigationOptions= {
        title: 'createEvent',
        header: null
    }

    state = {
        eventName:"",
        eventDescription:""
    }
    submit = () =>{
        this.props.postBlogs(this.state.eventName, this.state.eventDescription)
        this.setState({
            eventName:'',
            eventDescription:''
        })
        this.props.navigation.navigate('My Event')
    }

    render(){
        return(


            <View style={{flex: 1, backgroundColor: '#EFEEEE'}}>
                {/* <View style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flex: 0,flexDirection: 'row', height: 102, width: '100%', backgroundColor: '#628DE7', paddingTop: 26.5}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('addScreen')}>
                        <Image source={require('../src/image/arrowBack.png')} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 24, color: 'white'}}>Create a</Text>
                        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>Event</Text>
                    </View>
                </View>  */}
                 <View style={{flex: 1, marginHorizontal: 26, marginTop: 20}}>
                    <Text style={{fontSize: 18, color: '#628DE7', fontWeight: 'bold'}}>Step 1</Text>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Location</Text>
                        <TextInput
                        
                        placeholder="Choose the location" style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Event Name</Text>
                        <TextInput 
                        onChangeText={eventName => this.setState({eventName})}
                        value={this.state.eventName}
 style={{height: 45, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, color: '#49438D', marginBottom: 5}}>Event Description</Text>
                        <TextInput 
                            onChangeText={eventDescription => this.setState({eventDescription})}
                            value={this.state.eventDescription}
                        multiline={true} placeholder="What the description" style={{height: 200, backgroundColor: 'white', paddingLeft: 15, paddingRight: 20, borderRadius: 5}} />
                    </View>
                </View>

                <Button title="COBA" onPress={this.submit}>

                </Button>

                {/* <View style={{marginHorizontal: 26}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Create a Event')} style={{width: '100%', height: 56, backgroundColor: '#49438D', borderRadius: 15}}>
                    <ImageBackground source={require('../src/image/decoStar.png')} style={{width: '95%', height: '100%'}}>
                        <Text style={{fontSize: 18, color: 'white', textAlign: 'center', marginTop: 15}}>Continue</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                </View> */}

                
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});
export default connect(null, {postBlogs})(createEvent);