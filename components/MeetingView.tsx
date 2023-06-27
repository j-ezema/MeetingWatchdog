import { Card } from "@rneui/base";
import { StyleSheet, View } from "react-native";
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
      <View>
        {arr}
      </View>
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
  }); 