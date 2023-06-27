import { Card, Icon, Text } from "@rneui/base";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { MeetingItem } from "../models";
import React from "react";
import { Directions, Gesture, GestureDetector, PanGestureHandler } from "react-native-gesture-handler";
import { useState } from 'react';

export const MeetingItemComponent: React.FC<{meeting: MeetingItem; deleteItem: Function;}> = ({ meeting: {id, meeting_title, meeting_datetime}, deleteItem }) => {
    //console.log(meeting_date+" "+typeof(meeting_date));
    //onPress={() => {deleteItem(id)}
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
      

  

      //const flingGestureLeft = Gesture.Fling().direction(Directions.LEFT | Directions.RIGHT).onEnd((e) => console.log(meeting_title+" was swiped "+e.x));
      const flingGestureLeft = Gesture.Fling().direction( Directions.RIGHT).onEnd((e) => swipeRight());
      const flingGestureRight = Gesture.Fling().direction(Directions.LEFT).onEnd((e) => swipeLeft());
      const tapSelectGesture = Gesture.Tap().onEnd((e) => {if(!state.visible){tapMeeting()}});
      const composed = Gesture.Simultaneous(flingGestureLeft, flingGestureRight, tapSelectGesture)

    return (
        <GestureDetector gesture={composed}>
          <View style={styles.cardOuter}>
            <View style={{flex: 1, flexDirection: 'row-reverse',margin:0}}>
              <Animated.View style={[styles.slideView2, {width: state.x}]}>
                {state.visible &&
                <TouchableOpacity onPressOut={tapDeleteMeeting}>
                  <Icon iconStyle={styles.icon} type="material" name="delete" color="white"/>
                  <Text style={styles.iconText}>Delete</Text>
                </TouchableOpacity>
                }
              </Animated.View>
              <Animated.View style={[styles.slideView2, {width: state.xx, backgroundColor: '#FFFFFE'}]}>
                <View style={styles.thinBlueLineB}></View>
                { !state.visible &&
                <Icon iconStyle={styles.icon} type="material" name="chevron-right" color="black"/>
                }
              </Animated.View>
              <View style={styles.sectionContainer}>
                <View style={styles.thinBlueLineA}></View>
                <View style={{padding:5}} >
                  <Text style={styles.cardTitle}>{meeting_title}</Text>
                  <Text style={styles.cardDate}>{meeting_datetime.toDateString()+" "+meeting_datetime.toLocaleTimeString()}</Text>
                </View>
              </View>
              
            </View>
          </View>
        </GestureDetector>
    )
}

const animationwidth = 100;

const styles = StyleSheet.create({
    sectionContainer: {
      flexDirection: 'column',
      alignSelf: 'stretch',
      marginLeft: 0,
      flex:1,
      paddingRight: 0
    },
    slideView:{
      backgroundColor:'#aa0055',
      marginRight: -10,
      marginBottom:0,
      marginTop:0,
      float:'right',
      height:100,
      alignSelf:'flex-end',
    },
    icon:{
      marginTop:30,
      marginBottom:0,
      width: 30,
      height: 30,
      fontSize: 30,
      alignSelf: 'center',
    },
    iconText:{
      margin:0,
      color:"white",
      fontFamily:'OpenSans-Bold',
      alignSelf: 'center',
    },
    slideView2:{
      backgroundColor:'#aa0055',
      marginTop:0,
      marginBottom:0,
      marginLeft:0,
      borderBottomRightRadius:15,
      borderTopRightRadius:15,
      width: 50, 
      height: 100,
      alignSelf:'flex-end',
      
    },
    cardOuter: {
      borderRadius: 15,
      marginRight:30,
      marginLeft:20,
      marginBottom:30,
      marginTop:10,
      backgroundColor:"#FFFFFE"
    },
    cardTitle: {
      textAlign: 'left',
      fontSize: 25,
      fontFamily:'OpenSans-BoldItalic',
      //fontWeight: "700",
    },
    cardDate: {
      textAlign: 'left',
      
      fontSize: 15,
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
    //I really shouldnt make this joke
    thinBlueLineA: {
      marginTop: 0,
      height: 6,
      backgroundColor: 'blue',
      borderTopLeftRadius: 15,
    },
    thinBlueLineB: {
      marginTop: 0,
      height: 6,
      backgroundColor: 'blue',
      borderTopRightRadius: 15,
    }
  }); 

  /* <View style={styles.LayoutButtonContainer}>
                <Card containerStyle={styles.cardOuter}>
                <View style={{flexDirection:"row"}}>
                  <View style={{flexDirection: 'column'}}>
                    <View style={styles.thinBlueLine}></View>
                    <Card.Title style={styles.cardTitle}>{meeting_title}</Card.Title>
                    <Text style={styles.cardDate}>{meeting_datetime.toDateString()+" "+meeting_datetime.toLocaleTimeString()}</Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    {state.visible &&
                    //<Animated.View style={[styles.slideView,{display: state.visible ? 'flex' : 'none' }, {transform: [{translateX: state.x}]}]}>
                    <Animated.View style={[styles.slideView, {width: state.x}]}>
                      {
                        // your content, such as this.props.children 
                      }
                    </Animated.View>
                    } 
                  </View>
                </View>
                </Card>
          </View> */
          
          /* <View style={{flex: 1, flexDirection: 'row-reverse',margin:15}}>
            <Animated.View style={[styles.slideView2, {width: state.x}]}/>
            <Animated.View style={{width: state.xx, height: 50, backgroundColor: 'powderblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
            
          </View> */
