import { Icon, Text } from "@rneui/base";
import { Animated, TouchableOpacity, View, Image } from "react-native";
import { MeetingItem, createNewMeetingItem } from "../models";
import React from "react";
import { Directions, Gesture, GestureDetector} from "react-native-gesture-handler";
import { useState } from 'react';
import { colors, getStyles, styles } from '../assets/Styles';
import moment from "moment";

const animationwidth = 100;

interface props {
  meeting: MeetingItem,
  deleteItem?: Function, 
  toDetails?: Function,
  style?: any,
}

export const MeetingItemComponent: React.FC<props> = ({ meeting: { id, meeting_title, meeting_datetime }, deleteItem = ()=>{}, toDetails = ()=>{}, style = getStyles() }) => {

  //const [style, setStyle] = useState(pullStyles);
  const [state, setState] = useState({ visible: false, x: new Animated.Value(0), xx: new Animated.Value(animationwidth) });

  const swipeLeft = () => {
    setState({ visible: true, x: state.x, xx: state.xx });
    Animated.spring(state.x, {
      toValue: animationwidth,
      useNativeDriver: false,
    }).start();
    Animated.spring(state.xx, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };
  const swipeRight = () => {
    setState({ visible: false, x: state.x, xx: state.xx });
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
  };
  const tapMeeting = () => {
    toDetails(id);
  }
  const tapDeleteMeeting = () => {
    deleteItem(id);
  }

  const flingGestureLeft = Gesture.Fling().direction(Directions.RIGHT).onEnd((e) => swipeRight());
  const flingGestureRight = Gesture.Fling().direction(Directions.LEFT).onEnd((e) => swipeLeft());
  const tapSelectGesture = Gesture.Tap().onEnd((e) => { if (!state.visible) { tapMeeting() } });
  const composed = Gesture.Simultaneous(flingGestureLeft, flingGestureRight, tapSelectGesture)


  return (
    <GestureDetector gesture={composed}>
      <View style={style.meetingItem.cardOuter}>
        <View style={{ flex: 1, flexDirection: 'row-reverse', margin: 0 }}>
          <Animated.View style={[style.meetingItem.slideView, { width: state.x }]}>
            {state.visible &&
              <TouchableOpacity style={style.meetingItem.iconWrapper} onPressOut={tapDeleteMeeting}>
                <Icon iconStyle={style.meetingItem.icon} type="material" name="delete" color="white" />
                <Text numberOfLines={1} style={style.meetingItem.iconText}>Delete</Text>
              </TouchableOpacity>
            }
          </Animated.View>
          <Animated.View style={[style.meetingItem.slideView, { width: state.xx, backgroundColor: colors.white }]}>
            <View style={style.meetingItem.thinBlueLine}></View>
            {!state.visible &&
              <View style={style.meetingItem.iconWrapperChevron}>
                <Icon iconStyle={style.meetingItem.icon} type="material" name="chevron-right" color="black" />
              </View>
            }
          </Animated.View>
          <View style={style.meetingItem.sectionContainer}>
            <View style={style.meetingItem.thinBlueLine}></View>
              <Text numberOfLines={1} style={style.meetingItem.cardTitle}>{meeting_title}</Text>
              <View style={style.meetingItem.time}>
                <View style={style.meetingItem.space}>
                  {/*<Image source={require('../assets/calendar.png')} style={[style.meetingItem.dateButtonIcon, { resizeMode: 'contain' }, { tintColor: colors.steelBlue }]} />*/}
                  <Icon style={style.meetingItem.dateText} type="material-community" name="calendar-month-outline" size={20}/>
                  <Text style={style.meetingItem.dateText}>{moment(meeting_datetime).format("YYYY-MM-DD")}</Text>
                </View>
                <View style={style.meetingItem.space}>
                  {/*<Image source={require('../assets/clock.png')} style={[style.meetingItem.dateButtonIcon, { resizeMode: 'contain' }, { tintColor: colors.steelBlue }]} />*/}
                  <Icon style={style.meetingItem.dateText} type="material-community" name="clock-outline" size={20}/>
                  <Text style={style.meetingItem.dateText}>{moment(meeting_datetime).format("h:mma")}</Text>
                </View>
              </View>
          </View>

        </View>
      </View>
    </GestureDetector>
  )
}


export default MeetingItemComponent


