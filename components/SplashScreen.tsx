import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native-elements';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal,


} from 'react-native';



export const SplashScreen = () => {
    return(
        <View style={{flex:1}}>
            <Image source={require('../assets/images/splash.png')} style={{flex:1}} />
        </View>
    )
}