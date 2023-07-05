import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { colors, styles } from '../assets/Styles';


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
  /*
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  //*/
  
  //refreshes on navigation
  useFocusEffect(
    React.useCallback(() => {
      // do the stuff you wanna do
      loadDataCallback();
    }, [loadDataCallback]));

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
  /*
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
  };//*/

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
    if(activeButtonIndex == -1){
      setActiveButtonIndex(0);
      navigation.navigate('CreateMeeting');
      setTimeout(() => {setIsButtonClicked(false)}, 300)
    }  
  };
  const handleImportMeeting = () => {
    if(activeButtonIndex == -1){
      setActiveButtonIndex(1);
      navigation.navigate('OutlookMeeting');
      setTimeout(() => {setIsButtonClicked(false)}, 300)
    } 
  };


  return (
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
          { !isButtonClicked &&
          <TouchableOpacity style={styles.homeScreen.floatingButtonContainer} onPressOut={handleButtonPress}>
            <Icon style={styles.homeScreen.floatingButton}
              size={35} raised reverseColor='black' type="material" name="add" color="#000000" 
            />
          </TouchableOpacity>
          
            /*
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
            </View>*/
          }
        </View>
      </SafeAreaView>
      <Modal
      animationType="slide"
      transparent={true}
      visible={isButtonClicked}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsButtonClicked(!isButtonClicked);
      }}>
      <View style={{flex:1, flexDirection:'column-reverse'}}>
        
        <View style={styles.homeScreen.optionContainer}>
          <View style={styles.homeScreen.optionButton}>
            <View style={styles.homeScreen.textButton}>
              <Text style={styles.homeScreen.optionsText}>How would you like to set up your meeting?</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.homeScreen.optionButton]}onPressOut={handleCreateMeeting}>
            <View style={[styles.homeScreen.textButton, activeButtonIndex === 0 && { backgroundColor: '#D6AD60' }]}>
              <Text style={[styles.homeScreen.optionsTextB]}>Create A Meeting</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.homeScreen.optionButton,]}onPressOut={handleImportMeeting}>
            <View style={[styles.homeScreen.textButton, activeButtonIndex === 1 && { backgroundColor: '#D6AD60' }]}>
              <Text style={[styles.homeScreen.optionsTextB]}>Import Meeting From Microsoft Outlook</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.homeScreen.menu} onPress={handleScreenPress}/>
      </View>
    </Modal>

    </GestureHandlerRootView>
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
