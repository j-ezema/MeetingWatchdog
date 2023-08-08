import { Card } from "@rneui/base";
import { ScrollView } from "react-native-gesture-handler";
import { MeetingItem } from "../models";
import React from "react";
import { MeetingItemComponent} from './MeetingItem';
import { View } from "react-native";

export const MeetingView: React.FC<{meetings: MeetingItem[]; deleteItem: Function; toDetails: Function;}> = ({meetings, deleteItem, toDetails }) =>{

    //loop through meeting items to create 
    var arr: JSX.Element[] = [];
    meetings.forEach(meeting => {
      arr.push(
        <MeetingItemComponent key={meeting.id} meeting={meeting} deleteItem={deleteItem} toDetails={toDetails}/>
      )
    });
    
    return (
      <ScrollView style={{flexGrow:1}} >
        {arr}
        <View style={{height:80}}/>
      </ScrollView>
      
    );
  };