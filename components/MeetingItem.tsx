import { Card, Icon, Text } from "@rneui/base";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { MeetingItem } from "../models";
import React from "react";
import { Directions, Gesture, GestureDetector, PanGestureHandler } from "react-native-gesture-handler";
import { useState } from 'react';
import { colors, styles } from "../assets/Styles";
import moment from "moment";

const animationwidth = 100;

export const MeetingItemComponent: React.FC<{meeting: MeetingItem; deleteItem: Function;}> = ({ meeting: {id, meeting_title, meeting_datetime}, deleteItem }) => {

    const [state, setState] = useState({visible: false,x: new Animated.Value(0),xx: new Animated.Value(animationwidth)});
  
    const swipeLeft = () => {
      setState({visible:true,x:state.x,xx:state.xx});
      Animated.spring(state.x, {
        toValue: animationwidth,
        useNativeDriver: false,
      }).start();
      Animated.spring(state.xx, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      console.log(meeting_title+" was swiped left "+state.visible); 
    };
    const swipeRight = () => {
      setState({visible:false,x:state.x,xx:state.xx});
      Animated.spring(state.x, {
        toValue: 0,
        useNativeDriver: false,
        restSpeedThreshold: animationwidth, //makes animation finish quicker removing delay on hiding
        restDisplacementThreshold: 40 //^^^^
      }).start(/*() =>setState({visible:false,x:new Animated.Value(0)})*/);
      Animated.spring(state.xx, {
        toValue: animationwidth,
        useNativeDriver: false,
        restSpeedThreshold: 50, //makes animation finish quicker removing delay on hiding
        restDisplacementThreshold: 40 //^^^^
      }).start(/*() =>setState({visible:false,x:new Animated.Value(0)})*/);
      
      //setState({visible: true,});
      console.log(meeting_title+" was swiped right "+state.visible); 
    };
    const tapMeeting = () =>{
      console.log(meeting_title+" was selected");
    }
    const tapDeleteMeeting = () =>{
      console.log(meeting_title+" was deleted");
      deleteItem(id);
    }
    
    const flingGestureLeft = Gesture.Fling().direction( Directions.RIGHT).onEnd((e) => swipeRight());
    const flingGestureRight = Gesture.Fling().direction(Directions.LEFT).onEnd((e) => swipeLeft());
    const tapSelectGesture = Gesture.Tap().onEnd((e) => {if(!state.visible){tapMeeting()}});
    const composed = Gesture.Simultaneous(flingGestureLeft, flingGestureRight, tapSelectGesture)
    //const flingGestureLeft = Gesture.Fling().direction(Directions.LEFT | Directions.RIGHT).onEnd((e) => console.log(meeting_title+" was swiped "+e.x));
      

    return (
        <GestureDetector gesture={composed}>
          <View style={styles.meetingItem.cardOuter}>
            <View style={{flex: 1, flexDirection: 'row-reverse',margin:0}}>
              <Animated.View style={[styles.meetingItem.slideView, {width: state.x}]}>
                {state.visible &&
                <TouchableOpacity style={styles.meetingItem.iconWrapper} onPressOut={tapDeleteMeeting}>
                  <Icon iconStyle={styles.meetingItem.icon} type="material" name="delete" color="white"/>
                  <Text numberOfLines={1} style={styles.meetingItem.iconText}>Delete</Text>
                </TouchableOpacity>
                }
              </Animated.View>
              <Animated.View style={[styles.meetingItem.slideView, {width: state.xx, backgroundColor: colors.white}]}>
                <View style={styles.meetingItem.thinBlueLine}></View>
                { !state.visible &&
                <View style={styles.meetingItem.iconWrapper}>
                  <Icon iconStyle={styles.meetingItem.icon} type="material" name="chevron-right" color="black"/>
                </View>
                }
              </Animated.View>
              <View style={styles.meetingItem.sectionContainer}>
                <View style={styles.meetingItem.thinBlueLine}></View>
                <View style={{padding:5}} >
                <Text numberOfLines={1} style={styles.meetingItem.cardTitle}>{meeting_title}</Text>
                  <View style={{flexDirection: 'row',paddingTop:10,}}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon style={styles.meetingItem.dateText} type="material-community" name="calendar-month"/>
                      <Text style={styles.meetingItem.dateText}>{moment(meeting_datetime).format("YYYY-MM-DD")}</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginLeft:10,}}> 
                      <Icon style={styles.meetingItem.dateText} type="material-community" name="clock-outline"/>
                      <Text style={styles.meetingItem.dateText}>{moment(meeting_datetime).format("h:mma")}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row',}}>
                    
                  </View>
                </View>
              </View>
              
            </View>
          </View>
        </GestureDetector>
    )
}



