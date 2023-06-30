import { Card } from "@rneui/base";
import { ScrollView, StyleSheet, View } from "react-native";
import { MeetingItem } from "../models";
import React from "react";
import { MeetingItemComponent} from './MeetingItem';

export const MeetingView: React.FC<{meetings: MeetingItem[]; deleteItem: Function;}> = ({meetings, deleteItem }) =>{

    var arr: JSX.Element[] = [];
    meetings.forEach(meeting => {
      arr.push(
        <MeetingItemComponent key={meeting.id} meeting={meeting} deleteItem={deleteItem}/>
      )
    });
    
    return (
      <ScrollView>
        <View>
          {arr}
        </View>
        <View style={{height:80}}/>
      </ScrollView>
      
    );
  };