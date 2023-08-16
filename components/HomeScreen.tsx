import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
  Alert,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Dimensions,

} from 'react-native';
import { Icon } from '@rneui/themed';
import { createTable, deleteMeetingItem, getDBConnection, getMeetingItems, saveMeetingItems, termsAgreed, updateTermsAgreement } from '../services/db-services';
import { MeetingItem, sortMeetingFN } from '../models';
import { MeetingView } from './MeetingView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getStyles, styles, updateStyles, } from '../assets/Styles';
import { useFocusEffect } from '@react-navigation/native';
import { TermsScreen } from './TermsScreen';
import { authorize } from 'react-native-app-auth';
import authConfig from '../utils/authConfig';
import * as global from '../services/global';










export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [meetings, setMeetings] = useState<MeetingItem[]>([]);
  const [pastMeetings, setPastMeetings] = useState<MeetingItem[]>([]);
  const [style, setStyle] = useState(getStyles(global.fontSize).homeScreen);
  const screenWidth = Dimensions.get('window').width;
  

  ///loads in data
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedMeetingItems = await getMeetingItems(db);
      let pastMeetingsTemp: MeetingItem[] = [];
      let futureMeetingsTemp: MeetingItem[] = [];
      storedMeetingItems.forEach(meeting => {
        if (meeting.total_meeting_time != null && meeting.total_meeting_time > 0) {
          pastMeetingsTemp.push(meeting);
        } else {
          futureMeetingsTemp.push(meeting);
        }
      });
      futureMeetingsTemp.sort(sortMeetingFN)
      pastMeetingsTemp.sort(sortMeetingFN)
      setMeetings(futureMeetingsTemp);
      setPastMeetings(pastMeetingsTemp);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //refreshes on navigation
  useFocusEffect(
    React.useCallback(() => {
      loadDataCallback();
      setActiveButtonIndex(-1);
      setStyle(getStyles(global.fontSize).homeScreen);
      updateStyles();
    }, [loadDataCallback]));

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon type="material-community" name="dots-vertical" color="white" size={30} onPress={handleSettings} />
      ),
    });
  }, [navigation]);


  const deleteItem = async (id: number) => {

    try {
      const pastArr: Boolean = !viewingUpcomingMeetings;
      const db = await getDBConnection();
      await deleteMeetingItem(db, id);
      if (pastArr) {
        const pos = pastMeetings.map(e => e.id).indexOf(id);
        pastMeetings.splice(pos, 1);
        setPastMeetings(pastMeetings.slice(0));
      } else {
        const pos = meetings.map(e => e.id).indexOf(id);
        meetings.splice(pos, 1);
        setMeetings(meetings.slice(0));
      }

    } catch (error) {
      console.error(error);
    }
  };

  const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [viewingUpcomingMeetings, setViewingUpcomingMeetings] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleButtonPress = () => {
    setIsButtonClicked(!isButtonClicked);
    setActiveButtonIndex(-1);
  };
  const handleScreenPress = () => {
    if (isButtonClicked) {
      setIsButtonClicked(false);
    }
    if (isModalVisible) {
      setIsModalVisible(false);
    }
  };
  const handleCreateMeeting = () => {
    if (activeButtonIndex == -1) {
      setActiveButtonIndex(0);
      navigation.navigate('CreateMeeting');
      setTimeout(() => { setIsButtonClicked(false) }, 300)
    }
  };


  // Function to handle authentication
  const authenticateWithMicrosoft = async (): Promise<string | null> => {
    try {
      const result = await authorize(authConfig);
      if (result && result.accessToken) {
        setIsAuthenticated(true);
        return result.accessToken;
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
    return null;  // Return null if no token was retrieved
  };

  const handleImportMeeting = async () => {
    try {
      const token = await authenticateWithMicrosoft();
      if (token) {
        navigation.navigate('OutlookMeeting', { token: token });
      } else {
        console.error('No access token received.');
      }
    } catch (error) {
      console.error('Import Meeting Error:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handlePastUpcomingPress = (incoming: String) => {
    if (incoming == "past" && viewingUpcomingMeetings) {
      setViewingUpcomingMeetings(false);
    }
    if (incoming == "upcoming" && !viewingUpcomingMeetings) {
      setViewingUpcomingMeetings(true);
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSettings = () => {
    setIsModalVisible(true);
  }
  const handleAbout = () => {
    setActiveButtonIndex(2);
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    setTimeout(() => { setIsButtonClicked(false) }, 300)

    navigation.navigate('About');
  }
  const handleSetting = () => {
    setActiveButtonIndex(3);
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    setTimeout(() => { setIsButtonClicked(false) }, 300)
    navigation.navigate('Settings');
  }
  const handleFeedback = () => {
    setActiveButtonIndex(4);
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    setTimeout(() => { setIsButtonClicked(false) }, 300)
    Linking.openURL('https://www.carbonedge.com/meeting-watchdog#feedback-form');
  }
  const toDetails = (id: number) => {
    navigation.navigate('meetingDetails', { meetingID: id });
  }
  const handleRateApp = () => {
    setActiveButtonIndex(5);
  }
  let meetingPanel;
  if (viewingUpcomingMeetings) {
    meetingPanel = (
      <MeetingView meetings={meetings} deleteItem={deleteItem} toDetails={toDetails} />
    );
  } else {
    meetingPanel = (
      <MeetingView meetings={pastMeetings} deleteItem={deleteItem} toDetails={toDetails} />
    );
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={style.background}>
        <View style={style.content}>
          <View style={style.buttonsContainer}>
            <View style={[style.button, style.buttonWithBorder]}>
              <TouchableOpacity
                style={[style.innerButton, style.button, style.leftInnerButton, viewingUpcomingMeetings && style.viewingInnerButton]}
                onPress={() => handlePastUpcomingPress('upcoming')}
              >
                <Text style={[style.upcomingText, viewingUpcomingMeetings ? style.viewingColor : style.notViewingColor]}>Upcoming</Text>
                <View style={[style.textBorder, viewingUpcomingMeetings ? style.viewingColor : style.notViewingColor]}>
                  <Text style={[style.count, viewingUpcomingMeetings ? style.viewingColor : style.notViewingColor]}>{meetings.length}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.innerButton, style.button, style.rightInnerButton, !viewingUpcomingMeetings && style.viewingInnerButton]}
                onPress={() => handlePastUpcomingPress('past')}
              >
                <Text style={[style.pastText, !viewingUpcomingMeetings ? style.viewingColor : style.notViewingColor]}>Past</Text>
                <View style={[style.textBorder, !viewingUpcomingMeetings ? style.viewingColor : style.notViewingColor]}>
                  <Text style={[style.count, !viewingUpcomingMeetings ? style.viewingColor : style.notViewingColor]}>{pastMeetings.length}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.cardsContainer}>
            {pastMeetings.length === 0 && viewingUpcomingMeetings === false ? (
              <PastScreen styling={style}/>
            ) : (meetings.length === 0 && pastMeetings.length > 0 && viewingUpcomingMeetings === true) ? (
              <WelcomeScreen styling={style} />
            ) : meetings.length > 0 || pastMeetings.length > 0 ? (
              <View>{meetingPanel}</View>
            ) : (
              <WelcomeScreen styling={style} />
            )}
          </View>
          {!isButtonClicked &&
            <TouchableOpacity style={style.floatingButtonContainer} onPressOut={handleButtonPress}>
              <Icon style={style.floatingButton}
                size={35} raised reverseColor='black' type="material" name="add" color="#000000"
              />
            </TouchableOpacity>
          }
        </View>
      </SafeAreaView>
      <TermsScreen />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isButtonClicked}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsButtonClicked(!isButtonClicked);
        }}>
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>

          <View style={style.optionContainer}>
            <View style={style.optionButton}>
              <View style={style.textButton}>
                <Text style={style.optionsText}>How would you like to set up your meeting?</Text>
              </View>
            </View>
            <TouchableOpacity style={[style.optionButton]} onPressOut={handleCreateMeeting}>
              <View style={[style.textButton, activeButtonIndex === 0 && { backgroundColor: '#D6AD60' }]}>
                <Text style={[style.optionsTextB]}>Create A Meeting</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[style.optionButton,]} onPressOut={handleImportMeeting}>
              <View style={[style.textButton, activeButtonIndex === 1 && { backgroundColor: '#D6AD60' }]}>
                <Text style={[style.optionsTextB]}>Import Meeting From Microsoft Outlook</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={style.menu} onPress={handleScreenPress} />
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsModalVisible(!isModalVisible);
        }}>

        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          <TouchableOpacity style={style.menu} onPress={handleScreenPress} />

          <View style={style.settingsContainerB}>
            <View style={{ borderWidth: 1, borderRadius: 10, overflow: 'hidden' }}>

              <TouchableOpacity style={[style.settingsButton]} onPressOut={handleAbout}>
                <View style={[style.settingsTextButton, activeButtonIndex === 2 && { backgroundColor: '#D6AD60' }]}>
                  <View style={style.settingContent}>
                    <Icon iconStyle={style.icon} type="material" name="chevron-right" color="black" />
                    <Text style={[style.settingsText]}>About</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[style.settingsButton]} onPressOut={handleSetting}>
                <View style={[style.settingsTextButton, activeButtonIndex === 3 && { backgroundColor: '#D6AD60' }]}>
                  <View style={style.settingContent}>
                    <Icon iconStyle={style.icon} type="material" name="chevron-right" color="black" />
                    <Text style={[style.settingsText]}>Settings</Text>

                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[style.settingsButton]} onPressOut={handleRateApp}>
                <View style={[style.settingsTextButton, activeButtonIndex === 5 && { backgroundColor: '#D6AD60' }]}>
                  <View style={style.settingContent}>
                    <Icon iconStyle={style.icon} type="material" name="chevron-right" color="black" />
                    <Text style={[style.settingsText]}>Rate App</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[style.settingsButton]} onPressOut={handleFeedback}>
                <View style={[style.settingsTextButton, activeButtonIndex === 4 && { backgroundColor: '#D6AD60' }]}>
                  <View style={style.settingContent}>
                    <Icon iconStyle={style.icon} type="material" name="chevron-right" color="black" />
                    <Text style={[style.settingsText]}>Send Feedback</Text>
                  </View>
                </View>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  )
}


function WelcomeScreen(styling:any) {
  const style = styling.styling;
  return (
    <View style={style.buttonsContainer}>
      <View style={[style.message, style.buttonWithBorder]}>
        <View style={style.messageWrapper}>
          <Text style={style.welcomeText}>Welcome</Text>
          <Text style={style.toText}>To</Text>
          <Text style={style.mwText}>MEETING WATCHDOG</Text>
          <Text style={style.selectText}>Select the '+' button to create a</Text>
          <Text style={style.selectTextB}>new trackable meeting.</Text>
        </View>
      </View>
    </View>
  )
}

function PastScreen(styling:any) {
  const style = styling.styling;
  return (
    <View style={style.buttonsContainer}>
      <View style={[style.message, style.buttonWithBorder]}>
        <View style={style.messageWrapper}>
          <Text style={style.selectText}>You do not currently have any </Text>
          <Text style={style.selectText}>past meeting.</Text>
          <Text style={style.selectText}></Text>
          <Text style={style.selectText}>Select the '+' button to create a</Text>
          <Text style={style.selectTextB}>new trackable meeting.</Text>
        </View>
      </View>
    </View>
  )
}



