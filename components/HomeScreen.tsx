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
import { createTable, deleteMeetingItem, getDBConnection, getMeetingItems, saveMeetingItems } from '../services/db-services';
import { MeetingItem, createNewMeetingItem} from '../models';
import { MeetingView} from './MeetingView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors, styles } from '../assets/Styles';

export function HomeScreen(){
    const [meetings, setMeetings] = useState<MeetingItem[]>([]);
  
    //
    //loads in data 
    //
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
  
    return (
      <GestureHandlerRootView>
        <SafeAreaView style={styles.homeScreen.background}>
            <View style={styles.homeScreen.buttonsContainer}>
                <View style={[styles.homeScreen.button, styles.homeScreen.buttonWithBorder]}>
                    <TouchableOpacity style={[styles.homeScreen.innerButton, styles.homeScreen.button, styles.homeScreen.leftInnerButton]}>
                        <Text style={styles.homeScreen.upcomingText}>Upcoming</Text>
                        <View style={styles.homeScreen.textBorder}><Text style={styles.homeScreen.count}>{0}</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.homeScreen.innerButton, styles.homeScreen.rightInnerButton]}>
                        <Text style={styles.homeScreen.pastText}>Past</Text>
                        <View style={styles.homeScreen.pastTextBorder}><Text style={styles.homeScreen.pastCount}>0</Text></View>
                    </TouchableOpacity>
                </View>
            </View>       
          <MeetingView meetings={meetings} deleteItem={deleteItem}/>  
        </SafeAreaView>
        <View style={styles.homeScreen.button}>
          <Icon  raised reverse reverseColor='white' type="material" name="add" color="#000055" onPressOut={addMeeting}/>
        </View>
      </GestureHandlerRootView>
    )
  }