import { Card } from "@rneui/base";
import { ScrollView } from "react-native-gesture-handler";
import { MeetingItem } from "../models";
import React from "react";
import { MeetingItemComponent} from './MeetingItem';
import { View } from "react-native";

export const MeetingView: React.FC<{meetings: MeetingItem[]; deleteItem: Function;}> = ({meetings, deleteItem }) =>{

    var arr: JSX.Element[] = [];
    meetings.forEach(meeting => {
      arr.push(
        <MeetingItemComponent key={meeting.id} meeting={meeting} deleteItem={deleteItem}/>
      )
    });
    
    return (
      <ScrollView style={{flexGrow:1}} >
        {arr}
        <View style={{height:80}}/>
      </ScrollView>
      
    );
  };