
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@rneui/themed';
import { styles } from '../assets/Styles';
import CheckBox from '@react-native-community/checkbox';
import { OutlookMeetingItem } from "../models";


export const OutlookMeetingItemComponent: React.FC<{
    meeting: OutlookMeetingItem;
    onCheckboxChange: (id: number, isChecked: boolean) => void;
}> = ({ meeting: { id, importedTitle, importedTime, isChecked, formattedDate }, onCheckboxChange }) => {

    const parts = formattedDate.split(", ");
    const monthDay = parts[1].split(" ");
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNumber = monthNames.indexOf(monthDay[0]) + 1;
    const formatDate = `${parts[2]}-${String(monthNumber).padStart(2, '0')}-${monthDay[1]}`;
    const [checkMeeting, setCheckMeeting] = useState(isChecked);

    useEffect(() => {
        setCheckMeeting(isChecked);
    }, [isChecked]);



    return (
        <View style={[styles.outlookMeetingItem.cardOuter]}>
            <View style={styles.outlookMeetingItem.sectionContainer}>
                <View style={styles.outlookMeetingItem.thinBlueLine}></View>
                <View style={{ paddingLeft: 10, paddingTop: 10 }} >
                    <View style={styles.outlookMeetingItem.meetingContainer}>
                        <CheckBox
                            value={checkMeeting}
                            onValueChange={(newValue) => {
                                onCheckboxChange(id, newValue);
                            }}
                            tintColors={{ true: '#0A1128', false: '#0A1128' }}
                        />
                        <View style={styles.outlookMeetingItem.meetingContent}>
                            <Text numberOfLines={1} style={styles.outlookMeetingItem.cardTitle}>{importedTitle}</Text>
                            <View style={styles.outlookMeetingItem.time}>
                                <View style={styles.outlookMeetingItem.date}>
                                    <Icon style={styles.outlookMeetingItem.dateText} type="material-community" name="calendar-month-outline" size={20} />
                                    <Text style={styles.outlookMeetingItem.dateText}>{formatDate}</Text>
                                </View>
                                <View style={styles.outlookMeetingItem.space}>
                                    <Icon style={styles.outlookMeetingItem.dateText} type="material-community" name="clock-outline" size={20} />
                                    <Text style={styles.outlookMeetingItem.dateText}>{importedTime}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}></View>
                </View>
            </View>
        </View>
    );
}

export default OutlookMeetingItemComponent;
