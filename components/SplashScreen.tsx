import React, { useCallback, useEffect, useState } from 'react';
import { Image} from 'react-native-elements';
import {View} from 'react-native';
import { colors } from '../assets/Styles';


export const SplashScreen = () => {
    return(
        <View style={{flex:1, backgroundColor:colors.oxfordBlue,flexDirection:'row'}}>
            <Image source={require('../assets/images/splash.png')} style={{flex:1,maxWidth:'100%', maxHeight:'100%', aspectRatio: 9/16, resizeMode:'contain'}} />
        </View>
    )
}