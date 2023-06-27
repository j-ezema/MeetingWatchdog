/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Card,  Icon } from '@rneui/themed';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createTable, deleteMeetingItem, getDBConnection, getMeetingItems, saveMeetingItems } from './services/db-services';
import { MeetingItem, createNewMeetingItem} from './models';
import { MeetingView} from './components/MeetingView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  

  return (
    
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    
    
  );
}


function HomeScreen(){
  const [meetings, setMeetings] = useState<MeetingItem[]>([]);
  const [newMeeting, setNewMeeting] = useState('');
  
  //
  //loads in data 
  //
  const loadDataCallback = useCallback(async () => {
    try {
      const initMeetings = [
                            createNewMeetingItem(0, 'meeting1'), 
                            createNewMeetingItem(1, 'meeting2'), 
                            createNewMeetingItem(2, 'meeting3'), 
                          ];
      const db = await getDBConnection();
      await createTable(db);
      const storedMeetingItems = await getMeetingItems(db);
      if (storedMeetingItems.length) {
        setMeetings(storedMeetingItems);
      } else {
        await saveMeetingItems(db, initMeetings);
        setMeetings(initMeetings);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const addMeeting = async () => {
    if (false) return;
    try {
      const newMeetings = [createNewMeetingItem(0, 'hi')];
      setMeetings(meetings.concat(newMeetings));
      const db = await getDBConnection();
      console.log(await saveMeetingItems(db, newMeetings));
      setNewMeeting('');
      
    } catch (error) {
      console.error(error);
    }
    return;
  };
  /*
  const addMeeting = async () => {
    if (false) return;
    try {
      const newMeetings = [...meetings, {
        id: meetings.length ? meetings.reduce((acc, cur) => {
          if (cur.id > acc.id) return cur;
          return acc;
        }).id + 1 : 0, value: 'hi', meeting_date: new Date()
      }];
      setNewMeeting(newMeeting);
      const db = await getDBConnection();
      await saveMeetingItems(db, newMeetings);
      setNewMeeting('');
    } catch (error) {
      console.error(error);
    }
  };//*/

  
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
  };//*/
  

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{height:"100%"}}>
        
        <ScrollView>
          <MeetingView meetings={meetings} deleteItem={deleteItem}/>
          <View style={{height:80}}/>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.button}>
          <Icon  raised reverse reverseColor='white' type="material" name="add" color="#000055" onPressOut={addMeeting}/>
        </View>
      </GestureHandlerRootView>
  )
  
}

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
              backgroundColor: '#000055',
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  LayoutButtonContainer: {
    margin: 10,
    //flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  button: {
    position: 'absolute',
      right: 40,
      bottom: 40,
  },
});

export default App;