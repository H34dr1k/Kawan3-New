import React from 'react';

import {
    StyleSheet, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Platform, View, Button, Image, ImageBackground, ActivityIndicator, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Modal, FlatList
} from 'react-native';

import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

import Text from '../components/customText.js';
import { AppFontLoader } from '../components/AppFontLoader.js';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Directions } from 'react-native-gesture-handler';

import normalize from 'react-native-normalize';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import PhoneInput from 'react-native-phone-input'
import data from '../Countries'
import { Container, Item, Input, Icon } from 'native-base'

const defaultFlag = data.filter(
    obj => obj.name === 'Indonesia'
)[0].flag

class SignUp2 extends React.Component {

    state = {
        flag: defaultFlag,
        modalVisible: false,
        phoneNumber: '',
    }
    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
    }
    showModal() {
        this.setState({ modalVisible: true })
    }
    hideModal() {
        this.setState({ modalVisible: false })
        // Refocus on the Input field after selecting the country code
        this.refs.PhoneInput._root.focus()
    }

    async getCountry(country) {
        const countryData = await data
        try {
            const countryCode = await countryData.filter(
                obj => obj.name === country
            )[0].dial_code
            const countryFlag = await countryData.filter(
                obj => obj.name === country
            )[0].flag
            // Set data from user choice of country
            this.setState({ phoneNumber: countryCode, flag: countryFlag })
            await this.hideModal()
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        let { flag } = this.state
        const countryData = data
        return (
            <AppFontLoader>
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                            <View style={styles.container}>
                                <Container style={styles.infoContainer}>
                                    {/* Phone input with native-base */}
                                    {/* phone section  */}
                                    <Item rounded style={styles.itemStyle}>
                                        <Icon
                                            active
                                            name='call'
                                            style={styles.iconStyle}
                                        />
                                        {/* country flag */}
                                        <View style={{}}><Text style={{ fontSize: 30 }}>{flag}</Text></View>
                                        {/* open modal */}
                                        <Icon
                                            active
                                            name='md-arrow-dropdown'
                                            style={[styles.iconStyle, { marginLeft: 5 }]}
                                            onPress={() => this.showModal()}
                                        />
                                        <Input
                                            style={styles.input}
                                            placeholder='+44766554433'
                                            placeholderTextColor='#adb4bc'
                                            keyboardType={'phone-pad'}
                                            returnKeyType='done'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            secureTextEntry={false}
                                            ref='PhoneInput'
                                            value={this.state.phoneNumber}
                                            onChangeText={(val) => {
                                                if (this.state.phoneNumber === '') {
                                                    // render UK phone code by default when Modal is not open
                                                    this.onChangeText('phoneNumber', defaultCode + val)
                                                } else {
                                                    // render country code based on users choice with Modal
                                                    this.onChangeText('phoneNumber', val)
                                                }
                                            }
                                            }
                                        />
                                        {/* Modal for country code and flag */}
                                        <Modal
                                            animationType="slide" // fade
                                            transparent={true}
                                            visible={this.state.modalVisible}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                <View style={{ flex: 1, backgroundColor: 'white' }}>
                                                    <FlatList
                                                        title={"hendrik"}
                                                        style={{ width: '90%' }}
                                                        data={countryData}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        renderItem={
                                                            ({ item }) =>
                                                                <TouchableWithoutFeedback
                                                                    onPress={() => this.getCountry(item.name)}>
                                                                    <View
                                                                        style={

                                                                            styles.countryStyle

                                                                        }>
                                                                        <Text style={{ fontSize: hp('4%'), marginRight: hp('2%'), marginLeft: wp('5%') }}>
                                                                            {item.flag}
                                                                        </Text>
                                                                        <Text style={{ fontSize: hp('2.5%'), color: '#000', width: wp('80%') }}>
                                                                            {item.name} ({item.dial_code})
                                    </Text>
                                                                    </View>
                                                                </TouchableWithoutFeedback>
                                                        }
                                                    />
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => this.hideModal()}
                                                    style={styles.closeButtonStyle}>
                                                    <Text type='rmedium' style={styles.textStyle}>
                                                        CLOSE
                          </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Modal>
                                    </Item>
                                </Container>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </AppFontLoader>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    input: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#FFF',
    },
    itemStyle: {
        marginBottom: 10,
    },
    iconStyle: {
        color: '#000',
        fontSize: 28,
        marginLeft: 15
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#b44666',
        padding: 14,
        marginBottom: 10,
        borderRadius: 3,
    },
    textStyle: {
        padding: 5,
        fontSize: 20,
        color: '#000',
    },
    countryStyle: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    closeButtonStyle: {
        alignItems: 'center',
    }
})

export default SignUp2;
