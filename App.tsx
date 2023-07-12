/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors} from './assets/Styles';
import { HomeScreen } from './components/HomeScreen';
import CreateMeetingScreen from './components/CreateMeetingScreen';
import { Icon, Image, Text } from 'react-native-elements';
import OutlookMeetingScreen from './components/OutlookMeetingScreen';
import { SplashScreen } from './components/SplashScreen';
import { MeetingDetailsScreen } from './components/MeetingDetailsScreen';
import { View } from 'react-native';
import { SettingsScreen } from './components/SettingsScreen';
import { DetailsHeaderLeft, HomeHeaderLeft } from './components/Headers';





function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (<SplashScreen/>)
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: colors.oxfordBlue,
              },
              headerLeft: () => (
                <HomeHeaderLeft/>
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
          <Stack.Screen
            name="meetingDetails"
            component={MeetingDetailsScreen}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                backgroundColor: colors.oxfordBlue,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                
              },
              headerLeft: () => (
                <DetailsHeaderLeft navigation={navigation}/>
              ),
              contentStyle: {
                borderTopColor: colors.gray,
                borderTopWidth: 0.5,
              },
            })}

          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;