import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { createTable, deleteMeetingItem, getDBConnection, getMeetingItems, saveMeetingItems } from '../services/db-services';
import { MeetingItem, createNewMeetingItem } from '../models';
import { MeetingView } from './MeetingView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styles } from '../assets/Styles';


export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [meetings, setMeetings] = useState<MeetingItem[]>([]);

  ///loads in data
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedMeetingItems = await getMeetingItems(db);
      setMeetings(storedMeetingItems);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const deleteItem = async (id: number) => {
    try {
      const pos = meetings.map(e => e.id).indexOf(id);
      const db = await getDBConnection();
      await deleteMeetingItem(db, id);
      meetings.splice(pos, 1);
      setMeetings(meetings.slice(0));
    } catch (error) {
      console.error(error);
    }
  };

  const addMeeting = async () => {
    //
    // adds new meeting, will be moved
    //
    if (false) return;
    try {
      const newMeeting = createNewMeetingItem(0, 'hi');
      setMeetings(meetings.concat(newMeeting));
      const db = await getDBConnection();
      console.log(await saveMeetingItems(db, [newMeeting]));

    } catch (error) {
      console.error(error);
    }
    return;
  };

  const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonPress = () => {
    setIsButtonClicked(!isButtonClicked);
    setActiveButtonIndex(-1);
  };
  const handleScreenPress = () => {
    if (isButtonClicked) {
      setIsButtonClicked(false);
    }
  };
  const handleCreateMeeting = () => {
    setActiveButtonIndex(0);
    navigation.navigate('CreateMeeting');


  };

  const handleImportMeeting = () => {

    setActiveButtonIndex(1);
    navigation.navigate('OutlookMeeting');

  };

  const renderFooterContent = () => {
    if (isButtonClicked) {
      return (
        <View >
          {/* Render your list of buttons here */}
          <View style={styles.homeScreen.optionContainer}>
            <View style={styles.homeScreen.button}>
              <View style={styles.homeScreen.textButton}>
                <Text style={styles.homeScreen.optionsText}>How would you like to set up your meeting?</Text>
              </View>
            </View>


            <TouchableOpacity
              style={[
                styles.homeScreen.button

              ]}
              onPress={handleCreateMeeting}
            >
              <View style={[styles.homeScreen.textButton, activeButtonIndex === 0 && { backgroundColor: '#D6AD60' }]}>
                <Text style={[styles.homeScreen.optionsTextB]}>Create A Meeting</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.homeScreen.button,

              ]}
              onPress={handleImportMeeting}
            >
              <View style={[styles.homeScreen.textButton, activeButtonIndex === 1 && { backgroundColor: '#D6AD60' }]}>
                <Text style={[styles.homeScreen.optionsTextB]}>Import Meeting From Microsoft Outlook</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.homeScreen.footerContainer}>
          <View style={styles.homeScreen.footer}>
            <View style={styles.homeScreen.footerButtonContainer}>
              <TouchableOpacity
                style={[styles.homeScreen.footerButton, styles.homeScreen.footerBorder]}
                onPress={handleButtonPress}
              >
                <Image source={require('../assets/plus.png')} style={styles.homeScreen.plus} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      );
    }
  };


  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <GestureHandlerRootView>
        <SafeAreaView style={styles.homeScreen.background}>
          <View style={styles.homeScreen.container}>
            <View style={styles.homeScreen.header}>
              <Image source={require('../assets/logo_01.png')} style={styles.homeScreen.logo} />
              <Text style={styles.homeScreen.headerText}>Home</Text>
              <TouchableOpacity style={styles.homeScreen.cancelButtonContainer}>
                <Image source={require('../assets/settings.png')} style={styles.homeScreen.cancelButtonImage} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.homeScreen.content}>
            <View style={styles.homeScreen.buttonsContainer}>
              <View style={[styles.homeScreen.button, styles.homeScreen.buttonWithBorder]}>
                <TouchableOpacity style={[styles.homeScreen.innerButton, styles.homeScreen.button, styles.homeScreen.leftInnerButton]}>
                  <Text style={styles.homeScreen.upcomingText}>Upcoming</Text>
                  <View style={styles.homeScreen.textBorder}><Text style={styles.homeScreen.count}>{meetings.length}</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.homeScreen.innerButton, styles.homeScreen.rightInnerButton]}>
                  <Text style={styles.homeScreen.pastText}>Past</Text>
                  <View style={styles.homeScreen.pastTextBorder}><Text style={styles.homeScreen.pastCount}>0</Text></View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.homeScreen.cardsContainer}>
              {meetings.length > 0 &&
                <MeetingView meetings={meetings} deleteItem={deleteItem} />
              }
              {meetings.length == 0 &&
                <WelcomeScreen />
              }
            </View>

          </View>
          {renderFooterContent()}
        </SafeAreaView>


      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  )
}


function WelcomeScreen() {
  return (
    <View style={styles.homeScreen.buttonsContainer}>
      <View style={[styles.homeScreen.message, styles.homeScreen.buttonWithBorder]}>
        <View style={styles.homeScreen.messageWrapper}>
          <Text style={styles.homeScreen.welcomeText}>Welcome</Text>
          <Text style={styles.homeScreen.toText}>To</Text>
          <Text style={styles.homeScreen.mwText}>MEETING WATCHDOG</Text>
          <Text style={styles.homeScreen.selectText}>Select the '+' button to create a</Text>
          <Text style={styles.homeScreen.selectTextB}>new trackable meeting.</Text>
        </View>
      </View>
    </View>
  )
}
