/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, styles } from './assets/Styles';
import { HomeScreen } from './components/HomeScreen';
import CreateMeetingScreen from './components/CreateMeetingScreen';
import { Icon, Image } from 'react-native-elements';
import OutlookMeetingScreen from './components/OutlookMeetingScreen';




function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.oxfordBlue,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <Image source={require('./assets/images/logo.png')} style={{width:50,height:50}}/>
            ),
            headerRight: () => (
              <Icon type="material-community" name="dots-vertical" color="white"/>
            ),
            contentStyle: {
              borderTopColor: colors.gray,
              borderTopWidth: 0.5,
            },
          }}

        />
        <Stack.Screen
          name="CreateMeeting"
          component={CreateMeetingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OutlookMeeting"
          component={OutlookMeetingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;