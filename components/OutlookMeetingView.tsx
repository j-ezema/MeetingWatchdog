import { ScrollView } from 'react-native-gesture-handler';
import { OutlookMeetingItem } from "../models";
import React from "react";
import { View } from "react-native";
import OutlookMeetingItemComponent from "./OutlookMeetingItem";

export const OutlookMeetingView: React.FC<{ meetings: OutlookMeetingItem[]; onCheckboxChange: (id: number, isChecked: boolean) => void; }> = ({ meetings, onCheckboxChange }) => {


    const renderedMeetings = meetings.map(meeting =>
        <OutlookMeetingItemComponent key={meeting.id} meeting={meeting} onCheckboxChange={onCheckboxChange}        />
        
    );
    

    return (
        <ScrollView style={{ flexGrow: 1 }} >
            {renderedMeetings}
            <View style={{ height: 80 }} />
        </ScrollView>

    );
};