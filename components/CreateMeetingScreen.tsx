import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    Modal,


} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import SQLite from 'react-native-sqlite-storage';
import { getDBConnection, retrieveSettings, saveMeetingItems } from '../services/db-services';
import { createNewMeetingItem } from '../models';
import { colors, styles } from "../assets/Styles";
import moment from 'moment';
import CurrencyInput from 'react-native-currency-input';
import { useFocusEffect } from '@react-navigation/native';
import { NumericTextEntry } from './NumericTextEntry';
import { ScrollView } from 'react-native-gesture-handler';





export const CreateMeetingScreen = ({ navigation }: { navigation: any }) => {

    const [participants, setParticipants] = useState('');
    const [meetingName, setMeetingName] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const hourlyRateInputRef = useRef<TextInput>(null);
    const participantsInputRef = useRef<TextInput>(null);
    const meetingNameInputRef = useRef<TextInput>(null);
    const [tempDate, setTempDate] = useState(new Date());
    const [tempTime, setTempTime] = useState(new Date());
    const [showError, setShowError] = useState(false);

    //grab settings
    const loadDataCallback = useCallback(async () => {
        try {
            const db = await getDBConnection();
            const settings: { [k: string]: any } = await retrieveSettings(db);
            setParticipants("" + settings.default_participants);
            setHourlyRate("$" + settings.default_hourly.toFixed(2));
        } catch (error) {
            console.error(error);
        }
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            loadDataCallback();
        }, [loadDataCallback]));

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date: React.SetStateAction<Date>) => {
        setSelectedDate(tempDate);
        setDatePickerVisibility(false);
    };

    const handleHourlyRateChange = (inputValue: string) => {
        setHourlyRate(inputValue);
    };

    const handleHourlyRateSubmit = () => {
        const numericValue = parseFloat(hourlyRate.replace(/\$|,/g, ''));
        if (!isNaN(numericValue)) {
            let formattedRate;
            if (Number.isInteger(numericValue)) {
                formattedRate = `$${numericValue.toFixed(2)}`;
            } else if (numericValue.toFixed(1) === numericValue.toString()) {
                formattedRate = `$${numericValue.toFixed(2)}`;
            } else {
                formattedRate = `$${numericValue}`;
            }
            setHourlyRate(formattedRate);
        }
    };


    const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const desiredFormat = `${year}-${month}-${day}`;

    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time: React.SetStateAction<Date>) => {
        setSelectedTime(tempTime);
        hideTimePicker();
    };

    const formattedTime = selectedTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    });


    /*
    const handleCancel = () => {
        navigation.navigate('Home');
    };//*/

    const saveMeetingData = async () => {
        if (!meetingName) {
            setShowError(true);
        } else {
            try {
                var combinedDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds());
                const newMeeting = createNewMeetingItem(0, meetingName, combinedDateTime, +hourlyRate.replace(/[^0-9.]/g, ''), +participants);
                //setMeetings(meetings.concat(newMeeting));
                const db = await getDBConnection();
                await saveMeetingItems(db, [newMeeting]);
                navigation.navigate('Home', { key: Date.now() });
            } catch (error) {
                console.error(error);
            }
            return;
        }

    };
    const startMeetingData = async () => {
        if (!meetingName) {
            setShowError(true);
        } else {
            try {
                var combinedDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds());
                const newMeeting = createNewMeetingItem(0, meetingName, combinedDateTime, +hourlyRate.replace(/[^0-9.]/g, ''), +participants);
                //setMeetings(meetings.concat(newMeeting));
                const db = await getDBConnection();
                await saveMeetingItems(db, [newMeeting]);
                const tfdiji = `SELECT last_insert_rowid()`;
                const result = await db.executeSql(tfdiji);
                navigation.navigate('meetingDetails', { meetingID: result[0].rows.item(0)["last_insert_rowid()"] });
            } catch (error) {
                console.error(error);
            }
            return;
        }
    };



    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // padding is generally for iOS, and height for Android but adjust as necessary
        >

            <View style={styles.createMeeting.container}>
                {/*
                    <View style={styles.createMeeting.header}>
                        <TouchableOpacity style={styles.createMeeting.cancelButtonContainer} onPress={handleCancel}>
                            <Image source={require('../assets/close.png')} style={styles.createMeeting.cancelButtonImage} />
                        </TouchableOpacity>
                        <Text style={styles.createMeeting.headerText}>Create A Meeting</Text>
                    </View>
                    */}
                <View style={styles.outlookMeeting.content}>
                    <ScrollView style={{ flexGrow: 1 }} >
                        <View style={styles.createMeeting.buttonsContainer}>
                            <TouchableOpacity style={[styles.createMeeting.textButton, styles.createMeeting.buttonWithBorder, showError && styles.createMeeting.errorButtonWithBorder]} onPress={() => hourlyRateInputRef.current?.focus()}>
                                <Text style={[styles.createMeeting.buttonText, showError && styles.createMeeting.errorText]}>Meeting Name *</Text>
                                <TextInput
                                    ref={meetingNameInputRef}
                                    style={styles.createMeeting.inputText}
                                    placeholder="Enter meeting name"
                                    value={meetingName}
                                    onChangeText={setMeetingName}

                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.createMeeting.button, styles.createMeeting.buttonWithBorder]}
                                onPress={showDatePicker}
                            >
                                <View style={styles.createMeeting.dateButtonContent}>
                                    {/*<Image source={require('../assets/calendar.png')} style={[styles.createMeeting.dateButtonIcon, { resizeMode: 'contain' }, { tintColor: '#0A112899' }]} />*/}
                                    <Icon style={styles.meetingItem.dateText} color={'#0A112899'} type="material-community" name="calendar-month" size={30} />
                                    <View>
                                        <Text style={styles.createMeeting.dateButtonTitle}>Meeting Date *</Text>
                                        <Text style={styles.createMeeting.dateButtonText}>{formattedDate}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.createMeeting.button, styles.createMeeting.buttonWithBorder]}
                                onPress={showTimePicker}
                            >
                                <View style={styles.createMeeting.dateButtonContent}>
                                    {/*<Image source={require('../assets/clock.png')} style={[styles.createMeeting.dateButtonIcon, { resizeMode: 'contain' }, { tintColor: '#0A112899' }]} />*/}
                                    <Icon style={styles.meetingItem.dateText} color={'#0A112899'} type="material-community" name="clock" size={30} />
                                    <View >
                                        <Text style={styles.createMeeting.dateButtonTitle}>Meeting Time *</Text>
                                        <Text style={styles.createMeeting.dateButtonText}>{formattedTime}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.createMeeting.textButton, styles.createMeeting.buttonWithBorder]} onPress={() => participantsInputRef.current?.focus()}>
                                <Text style={styles.createMeeting.buttonText}>Number of Participants *</Text>
                                <TextInput
                                    ref={participantsInputRef}
                                    style={styles.createMeeting.inputText}
                                    placeholder="Enter number"
                                    value={participants}
                                    onChangeText={setParticipants}
                                    keyboardType="numeric"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.createMeeting.textButton, styles.createMeeting.buttonWithBorder]} onPress={() => hourlyRateInputRef.current?.focus()}>
                                <Text style={styles.createMeeting.buttonText}>Average Hourly Rate *</Text>
                                <TextInput
                                    ref={hourlyRateInputRef}
                                    style={styles.createMeeting.inputText}
                                    placeholder="Enter hourly rate"
                                    value={hourlyRate}
                                    onChangeText={handleHourlyRateChange}
                                    keyboardType="numeric"
                                    onSubmitEditing={handleHourlyRateSubmit}

                                />
                            </TouchableOpacity>

                            {showError && (

                                <View style={[styles.createMeeting.errorTextButton, styles.createMeeting.errorButtonWithBorder]}>
                                    <Text style={styles.createMeeting.errorButtonText}>Please fill in the required* information</Text>
                                </View>
                            )}

                        </View>
                    </ScrollView>
                </View>
                <View style={styles.createMeeting.footerContainer}>

                    <View style={styles.createMeeting.footer}>
                        <View style={styles.createMeeting.footerButtonContainer}>
                            <Button
                                title="Save"
                                titleStyle={styles.createMeeting.footerButtonTextB}
                                buttonStyle={styles.createMeeting.footerButton}
                                containerStyle={styles.createMeeting.footerButtonContainerStyle}
                                onPress={saveMeetingData}

                            />
                        </View>
                        <View style={styles.createMeeting.footerButtonContainer}>
                            <Button
                                title="Start Meeting"
                                titleStyle={styles.createMeeting.footerButtonText}
                                buttonStyle={[styles.createMeeting.footerButton, styles.createMeeting.startButton, styles.createMeeting.footerBorder]}
                                containerStyle={styles.createMeeting.footerButtonContainerStyle}
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
                                        date={selectedDate}
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
                {
                    isTimePickerVisible && (
                        <Modal transparent visible={isTimePickerVisible}>
                            <View style={styles.createMeeting.modalContainer}>
                                <View style={styles.createMeeting.modal}>
                                    <DatePicker
                                        date={selectedTime}
                                        mode="time"
                                        textColor="#0A1128"
                                        onDateChange={setTempTime}
                                        theme='dark'
                                    />
                                    <View style={styles.createMeeting.modalButtonsContainer}>
                                        <Button
                                            title="Confirm"
                                            onPress={() => {
                                                handleTimeConfirm(selectedTime);
                                                hideTimePicker();
                                            }}
                                            containerStyle={styles.createMeeting.modalButton}
                                            buttonStyle={styles.createMeeting.startButton}
                                        />
                                        <Button
                                            title="Cancel"
                                            onPress={hideTimePicker}
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
        </KeyboardAvoidingView>
    );
};


export default CreateMeetingScreen;
