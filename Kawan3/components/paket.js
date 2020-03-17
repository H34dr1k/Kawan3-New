import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import Text from '../components/customText.js';
import { AppFontLoader } from '../components/AppFontLoader.js';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Directions } from 'react-native-gesture-handler';

import normalize from 'react-native-normalize';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { Col } from 'native-base';

export default {paket};