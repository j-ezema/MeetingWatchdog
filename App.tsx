/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { createTable, deleteMeetingItem, getDBConnection, getMeetingItems, saveMeetingItems } from './services/db-services';
import { MeetingItem, createNewMeetingItem} from './models';
import { MeetingView} from './components/MeetingView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors, styles } from './assets/Styles';
import { HomeScreen } from './components/HomeScreen';




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
            headerStyle: {
              backgroundColor: colors.oxfordBlue,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;