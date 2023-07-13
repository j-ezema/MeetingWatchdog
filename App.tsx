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
import { Icon, Image, Text } from 'react-native-elements';
import OutlookMeetingScreen from './components/OutlookMeetingScreen';
import { NumberofParticipantsScreen } from './components/NumberOfParticipantsScreen';
import { AverageHourlyRateScreen } from './components/AverageHourlyRateScreen';
import { SplashScreen } from './components/SplashScreen';
import { MeetingDetailsScreen } from './components/MeetingDetailsScreen';
import { View } from 'react-native';
import { SettingsScreen } from './components/SettingsScreen';
import { LogoReturnHeaderLeft, HomeHeaderLeft, CancelHeaderLeft, CancelHeaderRight, SettingsHeaderLeft } from './components/Headers';





function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (<SplashScreen />)
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
                <HomeHeaderLeft />
              ),
              headerRight: () => (
                <Icon type="material-community" name="dots-vertical" color="white" />
              ),
              contentStyle: styles.Headers.contentStyle,
            }}

          />
          <Stack.Screen
            name="CreateMeeting"
            component={CreateMeetingScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: {
                backgroundColor: colors.oxfordBlue,
              },
              headerLeft: () => (
                <CancelHeaderLeft name="Create A Meeting" />
              ),
              headerRight: () => (
                <CancelHeaderRight navigation={navigation} />
              ),
              contentStyle: styles.Headers.contentStyle,
            })}
          />
          <Stack.Screen
            name="OutlookMeeting"
            component={OutlookMeetingScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: {
                backgroundColor: colors.oxfordBlue,
              },
              headerLeft: () => (
                <CancelHeaderLeft name="Outlook Meetings" />
              ),
              headerRight: () => (
                <CancelHeaderRight navigation={navigation} />
              ),
              contentStyle: styles.Headers.contentStyle,

            })}
          />
          <Stack.Screen
            name="meetingDetails"
            component={MeetingDetailsScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: {
                backgroundColor: colors.oxfordBlue,
              },
              headerLeft: () => (
                <LogoReturnHeaderLeft name="Meeting Details" navigation={navigation} />
              ),
              contentStyle: styles.Headers.contentStyle,
            })}

          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: {
                backgroundColor: colors.oxfordBlue,
              },
              headerLeft: () => (
                <LogoReturnHeaderLeft name="Settings" navigation={navigation} />
              ),
              contentStyle: styles.Headers.contentStyle,
            })}
          />

          <Stack.Screen
            name="NumberOfParticipants"
            component={NumberofParticipantsScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: {
                backgroundColor: colors.oxfordBlue,
              },
              headerLeft: () => (
                <SettingsHeaderLeft name="Settings" navigation={navigation} />
              ),
              contentStyle: styles.Headers.contentStyle,
            })}
          />

          <Stack.Screen
            name="AverageHourlyRate"
            component={AverageHourlyRateScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: {
                backgroundColor: colors.oxfordBlue,
              },
              headerLeft: () => (
                <SettingsHeaderLeft name="Settings" navigation={navigation} />
              ),
              contentStyle: styles.Headers.contentStyle,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;