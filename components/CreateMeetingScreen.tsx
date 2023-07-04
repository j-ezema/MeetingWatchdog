import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal,


} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import SQLite from 'react-native-sqlite-storage';
import { getDBConnection, saveMeetingItems } from '../services/db-services';
import { createNewMeetingItem } from '../models';
import { colors, styles } from "../assets/Styles";




export const CreateMeetingScreen = ({ navigation }: { navigation: any }) => {

    const [participants, setParticipants] = useState('');
    const [meetingName, setMeetingName] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date: React.SetStateAction<Date>) => {
        setSelectedDate(date);
        setDatePickerVisibility(false);
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
    console.log(desiredFormat); // Output: 2023-06-27

    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time: React.SetStateAction<Date>) => {
        setSelectedTime(time);
        hideTimePicker();
    };

    const formattedTime = selectedTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    });

    const [isHourlyRateEntered, setIsHourlyRateEntered] = useState(false);

    const handleHourlyRateChange = (inputValue: string) => {
        const numericValue = parseFloat(inputValue.replace(/\$|,/g, ''));
        if (isNaN(numericValue)) {
            setHourlyRate('');
            setIsHourlyRateEntered(false);
        } else {
            const formattedRate = inputValue.startsWith('$') ? inputValue : `$${inputValue}`;
            setHourlyRate(formattedRate);
            setIsHourlyRateEntered(true);
        }
    };



    const handleCancel = () => {
        navigation.navigate('Home');
    };

    const saveMeetingData = async () => {
        try {
            const newMeeting = createNewMeetingItem(0, meetingName);
            //setMeetings(meetings.concat(newMeeting));
            const db = await getDBConnection();
            console.log(await saveMeetingItems(db, [newMeeting]));
            navigation.navigate('Home', { key: Date.now() });
        } catch (error) {
            console.error(error);
        }
        return;
    };

    return (
        <ScrollView
            contentContainerStyle={styles.createMeeting.scrollContainer}
            keyboardShouldPersistTaps="handled"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.createMeeting.container}
            >

                <View style={styles.createMeeting.container}>
                    <View style={styles.createMeeting.header}>
                        <TouchableOpacity style={styles.createMeeting.cancelButtonContainer} onPress={handleCancel}>
                            <Image source={require('../assets/close.png')} style={styles.createMeeting.cancelButtonImage} />
                        </TouchableOpacity>
                        <Text style={styles.createMeeting.headerText}>Create A Meeting</Text>
                    </View>



                    <View style={styles.createMeeting.content}>

                        <View style={styles.createMeeting.buttonsContainer}>
                            <View style={[styles.createMeeting.textButton, styles.createMeeting.buttonWithBorder]}>
                                <Text style={styles.createMeeting.buttonText}>Meeting Name</Text>
                                <TextInput
                                    style={styles.createMeeting.inputText}
                                    placeholder="Enter meeting name"
                                    value={meetingName}
                                    onChangeText={setMeetingName}

                                />
                            </View>
                            <TouchableOpacity
                                style={[styles.createMeeting.button, styles.createMeeting.buttonWithBorder]}
                                onPress={showDatePicker}
                            >
                                <View style={styles.createMeeting.dateButtonContent}>
                                    {/*<Image source={require('../assets/calendar.png')} style={[styles.createMeeting.dateButtonIcon, { resizeMode: 'contain' }, { tintColor: '#0A112899' }]} />*/}
                                    <Icon style={styles.meetingItem.dateText} color={'#0A112899'} type="material-community" name="calendar-month" size={30}/>
                                    <View >
                                        <Text style={styles.createMeeting.dateButtonTitle}>Meeting Date</Text>
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
                                    <Icon style={styles.meetingItem.dateText} color={'#0A112899'} type="material-community" name="clock" size={30}/>
                                    <View >
                                        <Text style={styles.createMeeting.dateButtonTitle}>Meeting Time</Text>
                                        <Text style={styles.createMeeting.dateButtonText}>{formattedTime}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.createMeeting.textButton, styles.createMeeting.buttonWithBorder]}>
                                <Text style={styles.createMeeting.buttonText}>Number of Participants</Text>
                                <TextInput
                                    style={styles.createMeeting.inputText}
                                    placeholder="Enter number"
                                    value={participants}
                                    onChangeText={setParticipants}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={[styles.createMeeting.textButton, styles.createMeeting.buttonWithBorder]}>
                                <Text style={styles.createMeeting.buttonText}>Average Hourly Rate</Text>
                                <TextInput
                                    style={styles.createMeeting.inputText}
                                    placeholder="Enter rate"
                                    value={isHourlyRateEntered ? hourlyRate : ''}
                                    onChangeText={handleHourlyRateChange}
                                    keyboardType="numeric"
                                />
                            </View>

                        </View>

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
                                />
                            </View>
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
                                        onDateChange={setSelectedDate}
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
                                        onDateChange={setSelectedTime}
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
            </KeyboardAvoidingView>
        </ScrollView>
    );
};


export default CreateMeetingScreen;
