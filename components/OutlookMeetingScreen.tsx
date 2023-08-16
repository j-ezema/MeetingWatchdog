import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import { Button } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import { styles } from '../assets/Styles';
import DatePicker from 'react-native-date-picker';
import { Client } from '@microsoft/microsoft-graph-client';
import { OutlookMeetingItem, createNewMeetingItem } from '../models';
import { OutlookMeetingView } from './OutlookMeetingView';
import { getDBConnection, saveMeetingItems } from '../services/db-services';


const OutlookMeetingScreen = ({ navigation, route }: { navigation: any, route: any }) => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [meetings, setMeetings] = useState<OutlookMeetingItem[]>([]);

    const initialRender = useRef(true);

    const { DateTime } = require('luxon');

    const { token } = route.params;

    const [isChecked, setIsChecked] = useState(false);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(true);

    const [tempDate, setTempDate] = useState(new Date());

    const [title, setTitle] = useState('');

    const [time, setTime] = useState(new Date());

    const hourlyRate = '0.00';

    const participants = 0;


    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        fetchEventsFromGraphAPI();
    }, [selectedDate]);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date: React.SetStateAction<Date>) => {
        setSelectedDate(tempDate);
        setDatePickerVisibility(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const handlePrevDate = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setSelectedDate(prevDate);
    };


    const handleNextDate = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setSelectedDate(nextDate);
    };


    const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });


    const convertUTCtoET = (utcDateTimeString: string) => {
        const utcDate = DateTime.fromISO(utcDateTimeString, { zone: 'utc' });
        const etDate = utcDate.setZone('America/New_York');
        return etDate;
    };

    const formatTime = (dateTimeString: string) => {
        const dateObj = new Date(dateTimeString);

        let hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutesStr} ${ampm}`;
    }

    const handleMeetingCheckboxChange = (meetingId: number, isChecked: boolean) => {
        setMeetings(prevMeetings => {
            return prevMeetings.map(meeting => {
                if (meeting.id === meetingId) {
                    return {
                        ...meeting,
                        isChecked: isChecked
                    };
                }
                return meeting;
            });
        });
    };


    const handleSelectAll = (value: boolean) => {
        setIsChecked(value);
        const updatedMeetings = meetings.map(meeting => ({
            ...meeting,
            isChecked: value
        }));
        setMeetings(updatedMeetings);
    };

    useEffect(() => {
        const updatedMeetings = meetings.map(meeting => ({
            ...meeting,
            isChecked: isChecked
        }));
        setMeetings(updatedMeetings);
    }, [isChecked]);



    const saveMeetingData = async () => {
        try {
            const selectedMeetings = meetings.filter(meeting => meeting.isChecked);
            if (selectedMeetings.length === 0) {
                console.warn('No meetings selected');
                return;
            }
            const newMeetings = selectedMeetings.map(selectedMeeting => {
                return createNewMeetingItem(
                    0, selectedMeeting.importedTitle, new Date(selectedMeeting.outlookTime), +hourlyRate.replace(/[^0-9.]/g, ''), +participants
                );
            });            //setMeetings(meetings.concat(newMeeting));
            const db = await getDBConnection();
            await saveMeetingItems(db, newMeetings);
            navigation.navigate('Home', { key: Date.now() });
        } catch (error) {
            console.error(error);
        }
        return;
    };
    const startMeetingData = async () => {
        try {
            const selectedMeetings = meetings.filter(meeting => meeting.isChecked);
            if (selectedMeetings.length === 0) {
                console.warn('No meetings selected');
                return;
            }

            const newMeetings = selectedMeetings.map(selectedMeeting => {
                return createNewMeetingItem(
                    0, selectedMeeting.importedTitle, new Date(selectedMeeting.outlookTime), +hourlyRate.replace(/[^0-9.]/g, ''), +participants
                );
            });

            const db = await getDBConnection();
            await saveMeetingItems(db, newMeetings);

            const tfdiji = `SELECT last_insert_rowid()`;
            const result = await db.executeSql(tfdiji);
            navigation.navigate('meetingDetails', { meetingID: result[0].rows.item(0)["last_insert_rowid()"] });
        } catch (error) {
            console.error(error);
        }
        return;
    };






    const fetchEventsFromGraphAPI = async (): Promise<void> => {
        try {
            if (token) {
                const client = Client.init({
                    authProvider: (done) => {
                        done(null, token);
                    },
                });

                const parts = formattedDate.split(', ');
                const [month, dayYear] = parts[1].split(' ');
                const day = parseInt(dayYear, 10);
                const year = parseInt(parts[2], 10);
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const monthNumber = months.indexOf(month);

                const selectedDateObj = new Date(year, monthNumber, day);

                const startDateTime = selectedDateObj.toISOString();

                const endDateTime = new Date(year, monthNumber, day + 1).toISOString();

                const response = await client.api(`/me/calendarView?startDateTime=${startDateTime}&endDateTime=${endDateTime}`).get();

                if (response && response.value && Array.isArray(response.value)) {
                    const newMeetings: OutlookMeetingItem[] = response.value.map((event: { start: { dateTime: string; }; id: any; subject: any; }) => {
                        const etDateTime = convertUTCtoET(event.start.dateTime);
                        const startTime = formatTime(etDateTime.toString());

                        return {
                            id: Math.random(),
                            importedTitle: event.subject,
                            outlookTime: convertUTCtoET(event.start.dateTime),
                            importedTime: startTime,
                            isChecked: isChecked,
                            formattedDate: formattedDate
                        };

                    });

                    setMeetings(newMeetings);

                } else {
                    console.error('Unexpected data structure:', response);
                }

            } else {
                console.error('Access token not available.');
            }
        } catch (error) {
            console.error('API request error:', error);
        }
    };

    useEffect(() => {
        const updatedMeetings = meetings.map(meeting => ({
            ...meeting,
            isChecked: isChecked
        }));
        setMeetings(updatedMeetings);
    }, [isChecked]);



    return (

        <View style={styles.outlookMeeting.container}>
            {/*
            <View style={styles.outlookMeeting.header}>
                <TouchableOpacity style={styles.outlookMeeting.cancelButtonContainer} onPress={handleCancel}>
                    <Image source={require('../assets/close.png')} style={styles.outlookMeeting.cancelButtonImage} />
                </TouchableOpacity>
                <Text style={styles.outlookMeeting.headerText}>Outlook Meetings</Text>
            </View>*/}
            <View style={styles.outlookMeeting.content}>
                <View style={styles.outlookMeeting.selectDateContainer}>
                    <View style={styles.outlookMeeting.buttonsContainer}>
                        <TouchableOpacity style={[styles.outlookMeeting.dateBarContainer]} onPress={showDatePicker}>
                            <View style={styles.outlookMeeting.dateBar}>
                                <TouchableOpacity onPress={handlePrevDate}>
                                    <Image source={require('../assets/prev_arrow.png')} style={styles.outlookMeeting.arrowIcon} />
                                </TouchableOpacity>
                                <Text style={styles.outlookMeeting.dateText}>{formattedDate}</Text>
                                <TouchableOpacity onPress={handleNextDate}>
                                    <Image source={require('../assets/next_arrow.png')} style={styles.outlookMeeting.arrowIconB} />
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
                    </View>


                    <View style={styles.outlookMeeting.buttonsContainer}>

                        <View
                            style={[styles.outlookMeeting.button]}

                        >
                            <View style={styles.outlookMeeting.selectButton}>
                                <CheckBox
                                    value={isChecked}
                                    onValueChange={(value) => handleSelectAll(value)}
                                    tintColors={{ true: '#0A1128', false: '#0A1128' }}
                                />
                                <View>
                                    <Text style={styles.outlookMeeting.selectButtonTitle}>Select All </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.outlookMeetingItem.cardsContainer}>
                            <OutlookMeetingView meetings={meetings} onCheckboxChange={handleMeetingCheckboxChange}/>
                        </View>





                    </View>
                </View>
            </View>
            <View style={styles.outlookMeeting.footerContainer}>
                <View style={styles.outlookMeeting.footer}>
                    <View style={[styles.outlookMeeting.footerButtonContainer]}>
                        <Button
                            title="Save"
                            titleStyle={styles.outlookMeeting.footerButtonTextB}
                            buttonStyle={styles.outlookMeeting.footerButton}
                            onPress={saveMeetingData}
                        />
                    </View>
                    <View style={styles.outlookMeeting.footerButtonContainer}>
                        <Button
                            title="Start Meeting"
                            titleStyle={styles.outlookMeeting.footerButtonText}
                            buttonStyle={[styles.outlookMeeting.footerButton, styles.outlookMeeting.startButton, styles.outlookMeeting.footerBorder]}
                            onPress={startMeetingData}
                        />
                    </View>
                </View>
            </View>
            {
                isDatePickerVisible && (
                    <Modal transparent visible={isDatePickerVisible}>
                        <View style={styles.createMeeting.modalContainer}>
                            <View style={styles.createMeeting.modal}>
                                <DatePicker
                                    date={tempDate}
                                    mode="date"
                                    textColor="#0A1128"
                                    androidVariant="nativeAndroid"
                                    onDateChange={setTempDate}
                                    theme='dark'
                                />
                                <View style={styles.createMeeting.modalButtonsContainer}>
                                    <Button
                                        title="Confirm"
                                        onPress={() => {
                                            handleDateConfirm(selectedDate);
                                            hideDatePicker();
                                        }}
                                        containerStyle={styles.createMeeting.modalButton}
                                        buttonStyle={styles.createMeeting.startButton}
                                    />
                                    <Button
                                        title="Cancel"
                                        onPress={hideDatePicker}
                                        containerStyle={styles.createMeeting.modalButton}
                                        buttonStyle={styles.createMeeting.cancelModalButton}
                                        titleStyle={styles.createMeeting.cancelModalButtonText}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                )
            }
        </View>
    )
}

export default OutlookMeetingScreen;
