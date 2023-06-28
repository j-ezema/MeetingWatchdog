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
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import SQLite from 'react-native-sqlite-storage';





export const CreateMeetingScreen = ({navigation}: {navigation: any}) => {

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

    const saveMeetingData = () => {
        // Open the database
        const db = SQLite.openDatabase({ name: 'meetings.db' });

        // Create the table if it doesn't exist
        db.transaction((tx: { executeSql: (arg0: string) => void; }) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS watchdog_meetings (' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'name TEXT,' +
                'date TEXT,' +
                'time TEXT,' +
                'number_of_participants INTEGER,' +
                'average_hourly_rate REAL' +
                ');'
            );
        });

        // Insert the data into the table
        db.transaction((tx: { executeSql: (arg0: string, arg1: string[], arg2: (tx: any, results: any) => void) => void; }) => {
            tx.executeSql(
                'INSERT INTO watchdog_meetings (name, date, time, number_of_participants, average_hourly_rate) VALUES (?, ?, ?, ?, ?);',
                [meetingName, desiredFormat, formattedTime, participants, hourlyRate],
                (tx: any, results: { rowsAffected: number; }) => {
                    if (results.rowsAffected > 0) {
                        // Data saved successfully
                        console.log('Meeting data saved successfully.');
                    } else {
                        // Error saving data
                        console.log('Failed to save meeting data.');
                    }
                }
            );
        });

        navigation.navigate('Home', { key: Date.now() });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >

            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.cancelButtonContainer} onPress={handleCancel}>
                        <Image source={require('../assets/close.png')} style={styles.cancelButtonImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Create A Meeting</Text>
                </View>



                <View style={styles.content}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.buttonsContainer}>
                            <View style={[styles.textButton, styles.buttonWithBorder]}>
                                <Text style={styles.buttonText}>Meeting Name</Text>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Enter meeting name"
                                    value={meetingName}
                                    onChangeText={setMeetingName}

                                />
                            </View>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonWithBorder]}
                                onPress={showDatePicker}
                            >
                                <View style={styles.dateButtonContent}>
                                    <Image source={require('../assets/calendar.png')} style={[styles.dateButtonIcon, { resizeMode: 'contain' }, { tintColor: '#0A112899' }]} />
                                    <View style={styles.dateButtonTitleContainer}>
                                        <Text style={styles.dateButtonTitle}>Meeting Date</Text>
                                        <Text style={styles.dateButtonText}>{formattedDate}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonWithBorder]}
                                onPress={showTimePicker}
                            >
                                <View style={styles.dateButtonContent}>
                                    <Image source={require('../assets/clock.png')} style={[styles.dateButtonIcon, { resizeMode: 'contain' }, { tintColor: '#0A112899' }]} />
                                    <View style={styles.dateButtonTitleContainer}>
                                        <Text style={styles.dateButtonTitle}>Meeting Time</Text>
                                        <Text style={styles.dateButtonText}>{formattedTime}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.textButton, styles.buttonWithBorder]}>
                                <Text style={styles.buttonText}>Number of Participants</Text>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Enter number"
                                    value={participants}
                                    onChangeText={setParticipants}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={[styles.textButton, styles.buttonWithBorder]}>
                                <Text style={styles.buttonText}>Average Hourly Rate</Text>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Enter rate"
                                    value={isHourlyRateEntered ? hourlyRate : ''}
                                    onChangeText={handleHourlyRateChange}
                                    keyboardType="numeric"
                                />
                            </View>

                        </View>
                    </ScrollView>
                </View>
                <View style={styles.footerContainer}>

                    <View style={styles.footer}>
                        <View style={styles.footerButtonContainer}>
                            <Button
                                title="Save"
                                titleStyle={styles.footerButtonTextB}
                                buttonStyle={styles.footerButton}
                                containerStyle={styles.footerButtonContainerStyle}
                                onPress={saveMeetingData}

                            />
                        </View>
                        <View style={styles.footerButtonContainer}>
                            <Button
                                title="Start Meeting"
                                titleStyle={styles.footerButtonText}
                                buttonStyle={[styles.footerButton, styles.startButton, styles.footerBorder]}
                                containerStyle={styles.footerButtonContainerStyle}
                            />
                        </View>
                    </View>
                </View>
            </View>

            {
                isDatePickerVisible && (
                    <Modal transparent visible={isDatePickerVisible}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modal}>
                                <DatePicker
                                    date={selectedDate}
                                    mode="date"
                                    textColor="#0A1128"
                                    androidVariant="nativeAndroid"
                                    onDateChange={setSelectedDate}
                                    theme='dark'
                                />
                                <View style={styles.modalButtonsContainer}>
                                    <Button
                                        title="Confirm"
                                        onPress={() => {
                                            handleDateConfirm(selectedDate);
                                            hideDatePicker();
                                        }}
                                        containerStyle={styles.modalButton}
                                        buttonStyle={styles.startButton}
                                    />
                                    <Button
                                        title="Cancel"
                                        onPress={hideDatePicker}
                                        containerStyle={styles.modalButton}
                                        buttonStyle={styles.cancelModalButton}
                                        titleStyle={styles.cancelModalButtonText}
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
                        <View style={styles.modalContainer}>
                            <View style={styles.modal}>
                                <DatePicker
                                    date={selectedTime}
                                    mode="time"
                                    textColor="#0A1128"
                                    onDateChange={setSelectedTime}
                                    theme='dark'
                                />
                                <View style={styles.modalButtonsContainer}>
                                    <Button
                                        title="Confirm"
                                        onPress={() => {
                                            handleTimeConfirm(selectedTime);
                                            hideTimePicker();
                                        }}
                                        containerStyle={styles.modalButton}
                                        buttonStyle={styles.startButton}
                                    />
                                    <Button
                                        title="Cancel"
                                        onPress={hideTimePicker}
                                        containerStyle={styles.modalButton}
                                        buttonStyle={styles.cancelModalButton}
                                        titleStyle={styles.cancelModalButtonText}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                )
            }
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1, // Takes up the entire available space
        backgroundColor: '#0A1128', // Sets the background color
        paddingVertical: 20, // Adds vertical padding
    },

    content: {
        flex: 1,
        borderTopWidth: 0.5, // Adds a top border
        borderTopColor: '#EFEFEF', // Sets the color of the top border
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 40,
        alignItems: 'center',
        alignSelf: 'center',
    },
    modalButton: {
        flex: 1,
        marginHorizontal: 10,
    },
    cancelModalButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#152B61',
    },
    cancelModalButtonText: {
        color: '#152B61',
    },
    header: {
        paddingTop: 10, // Adds top padding
        paddingBottom: 30, // Adds bottom padding
        paddingHorizontal: 20,
        height: 70,
        backgroundColor: '#0A1128', // Sets the background color
        flexDirection: 'row', // Add this line to make the content align horizontally
        alignItems: 'center', // Add this line to vertically align the content
    },
    headerText: {
        fontSize: 21, // Sets the font size
        color: '#ffffff', // Sets the text color
        fontFamily: 'OpenSans-Bold', // Sets the font family
    },
    cancelButtonImage: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        tintColor: '#ffffff',
    },
    cancelButtonContainer: {
        padding: 10, // Increase the padding to increase the clickable area
        position: 'absolute',
        right: 6,
        top: -5,
        marginRight: -10,
    },

    buttonsContainer: {
        paddingTop: 20, // Add top padding
        paddingBottom: 20, // Add bottom padding
        paddingHorizontal: 16, // Adds horizontal padding
        justifyContent: 'center', // Centers content vertically
    },
    dateButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateButtonIcon: {
        marginRight: 5,
        width: 20, // Adjust the width to your preference
        height: 20,
        tintColor: '#152B61', // Adjust the height to your preference
    },
    dateButtonTitle: {
        color: '#040F21',
        fontFamily: 'OpenSans-Semibold',
        fontSize: 13,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 7,
    },
    dateButtonText: {
        color: '#040F21',
        fontFamily: 'OpenSans-Regular',
        fontSize: 17,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 10, // Adjust the margin to your preference
        marginTop: -1,
    },
    button: {
        marginBottom: 20, // Adds bottom margin (spacing between buttons)
        height: 70,
        width: '100%', // Sets the width to 100% of the container
        borderRadius: 10, // Sets the border radius
        backgroundColor: '#ffffff', // Sets the background color of the button
        justifyContent: 'center', // Centers content vertically
        alignItems: 'flex-start', // Aligns text to the left
        flexDirection: 'column',
        paddingLeft: 16, // Adds left padding for text
        paddingVertical: 7,
    },
    buttonWithBorder: {
        borderColor: '#4D7EA8', // Sets the border color
        borderWidth: 2, // Sets the border width
    },
    textButton: {
        marginBottom: 20, // Adds bottom margin
        width: '100%', // Sets the width to 100% of the container
        height: 70, // Sets the height of the button
        borderRadius: 10, // Sets the border radius
        backgroundColor: '#ffffff', // Sets the background color of the button
        justifyContent: 'center', // Centers content vertically
        alignItems: 'flex-start', // Aligns text to the left
        paddingLeft: 16, // Adds left padding for text
    },
    buttonText: {
        color: '#040F21', // Sets the text color
        fontFamily: 'OpenSans-Semibold', // Sets the font family
        fontSize: 13, // Sets the font size
        textAlign: 'left', // Aligns text to the left
        alignSelf: 'flex-start', // Aligns text to the left within the button
        marginLeft: 10, // Adds left margin
        marginTop: 15, // Adds top margin
    },
    inputText: {
        color: '#040F21', // Sets the text color
        fontFamily: 'OpenSans', // Sets the font family
        fontSize: 17, // Sets the font size
        paddingHorizontal: 10, // Adds horizontal padding
        marginTop: -13, // Adjusts the position
    },
    datePickerContainer: {
        flexDirection: 'row', // Sets the direction of items in the container to horizontal
        alignItems: 'center', // Aligns items vertically in the center
        marginBottom: 20, // Adds bottom margin to the container
        justifyContent: 'center',
    },

    datePickerButton: {
        marginLeft: 10, // Adds left margin to the button
    },

    footer: {
        flexDirection: 'row', // Sets the direction of items in the container to horizontal
    },

    footerContainer: {
        borderTopWidth: 0.5, // Adds a top border
        borderTopColor: '#EFEFEF', // Sets the color of the top border
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 20,
    },

    footerButtonContainer: {
        flex: 1, // Takes up the available space
        alignItems: 'center', // Centers content horizontally

    },

    footerButton: {
        height: 62, // Sets the height of the button
        backgroundColor: '#ffffff', // Sets the background color of the button
        borderRadius: 10, // Sets the border radius of the button
        width: 160, // Sets the width of the button
    },

    footerButtonText: {
        color: '#ffffff', // Sets the text color
        fontFamily: 'OpenSans-Semibold', // Sets the font family
        fontSize: 17, // Sets the font size
    },

    footerButtonTextB: {
        color: '#040F21', // Sets the text color
        fontFamily: 'OpenSans-Semibold', // Sets the font family
        fontSize: 17, // Sets the font size
    },

    startButton: {
        backgroundColor: '#152B61', // Sets the background color of the button
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        color: '#152B61'
    },

    footerBorder: {
        borderColor: '#ffffff', // Sets the border color
        borderWidth: 2, // Sets the border width
    },

    startButton: {
        backgroundColor: '#0A1128', // Sets the background color of the button
    },

    footerButtonContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default CreateMeetingScreen;
