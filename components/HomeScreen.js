import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    FlatList,





} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';









const HomeScreen = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        

        
        // Connect to the database
        const db = SQLite.openDatabase(
            {
                name: 'meetings.db',
            },
            () => {
                // Fetch data from the "watchdog_meetings" table
                db.transaction(tx => {
                    tx.executeSql(
                        'SELECT * FROM watchdog_meetings',
                        [],
                        (_, { rows }) => {
                            const data = [];
                            for (let i = 0; i < rows.length; i++) {
                                const meeting = rows.item(i);
                                data.push(meeting);
                            }
                            setMeetings(data);
                            setTotalMeetings(rows.length);
                        },
                        error => {
                            console.error(error);
                        }
                    );
                });
            },
            error => {
                console.error(error);
            }
        );

        return () => {
            // Close the database connection when component unmounts
            db.close();
        };
    }, []);

    const handleButtonPress = () => {
        setIsButtonClicked(!isButtonClicked);
        setActiveButtonIndex(-1);

    };

    const handleScreenPress = () => {
        if (isButtonClicked) {
            setIsButtonClicked(false);
        }
    };

    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);

    const navigation = useNavigation();

    const handleCreateMeeting = () => {
        setActiveButtonIndex(0);
        navigation.navigate('CreateMeeting');
    };

    const [totalMeetings, setTotalMeetings] = useState(0);



    const renderFooterContent = () => {
        if (isButtonClicked) {
            return (
                <View style={styles.footerContent}>
                    {/* Render your list of buttons here */}
                    <View style={styles.optionContainer}>
                        <View style={styles.button}>
                            <View style={styles.textButton}>
                                <Text style={styles.optionsText}>How would you like to set up your meeting?</Text>
                            </View>
                        </View>


                        <TouchableOpacity
                            style={[
                                styles.button

                            ]}
                            onPress={handleCreateMeeting}
                        >
                            <View style={[styles.textButton, activeButtonIndex === 0 && { backgroundColor: '#D6AD60' }]}>
                                <Text style={[styles.optionsTextB]}>Create A Meeting</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,

                            ]}
                            onPress={() => setActiveButtonIndex(1)}
                        >
                            <View style={[styles.textButton, activeButtonIndex === 1 && { backgroundColor: '#D6AD60' }]}>
                                <Text style={[styles.optionsTextB]}>Import Meeting From Microsoft Outlook</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.footerContainer}>
                    <View style={styles.footer}>
                        <View style={styles.footerButtonContainer}>
                            <TouchableOpacity
                                style={[styles.footerButton, styles.startButton, styles.footerBorder]}
                                onPress={handleButtonPress}
                            >
                                <Image source={require('../assets/plus.png')} style={styles.plus} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleScreenPress}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/logo_01.png')} style={styles.logo} />
                    <Text style={styles.headerText}>Home</Text>
                    <TouchableOpacity style={styles.cancelButtonContainer}>
                        <Image source={require('../assets/settings.png')} style={styles.cancelButtonImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>

                    <View style={styles.buttonsContainer}>
                        <View style={[styles.button, styles.buttonWithBorder]}>
                            <TouchableOpacity style={[styles.innerButton, styles.button, styles.leftInnerButton]}>
                                <Text style={styles.upcomingText}>Upcoming</Text>
                                <View style={styles.textBorder}><Text style={styles.count}>{totalMeetings}</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.innerButton, styles.rightInnerButton]}>
                                <Text style={styles.pastText}>Past</Text>
                                <View style={styles.pastTextBorder}><Text style={styles.pastCount}>0</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={styles.buttonsContainer}>
                        <View style={[styles.message, styles.buttonWithBorder]}>
                            <View style={styles.messageWrapper}>
                                <Text style={styles.welcomeText}>Welcome</Text>
                                <Text style={styles.toText}>To</Text>
                                <Text style={styles.mwText}>MEETING WATCHDOG</Text>
                                <Text style={styles.selectText}>Select the '+' button to create a</Text>
                                <Text style={styles.selectTextB}>new trackable meeting.</Text>
                            </View>
                        </View>
                    </View> */}

                    <FlatList
                        data={meetings}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <View style={styles.buttonsContainer}>
                                <View style={[styles.meetings, styles.buttonWithTopBorder]}>
                                    <View style={styles.meeting}>
                                        <Text style={styles.meetingTitle}>{item.name}</Text>
                                        <View style={styles.time}>

                                            <View style={styles.date}>
                                                <Image source={require('../assets/calendar.png')} style={[styles.dateButtonIcon, { resizeMode: 'contain' }, { tintColor: '#0A112899' }]} />
                                                <Text style={styles.meetingDate}> {item.date}</Text>
                                            </View>

                                            <View style={styles.space}>
                                                <Image source={require('../assets/clock.png')} style={[styles.dateButtonIcon, { resizeMode: 'contain' }, { tintColor: '#0A112899' }]} />
                                                <Text style={styles.meetingDate}>{item.time}</Text>

                                            </View>


                                        </View>
                                    </View>

                                </View>
                            </View>
                        )}
                    />

                </View>

                {renderFooterContent()}


            </View>
        </TouchableWithoutFeedback>
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

    scrollContainer: {
        paddingBottom: 200, // Adjust this value based on the height of your footer button
    },

    logo: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
    },

    dateButtonIcon: {

        width: 15, // Adjust the width to your preference
        height: 15,
        tintColor: '#152B61', // Adjust the height to your preference
        marginTop: 2,
    },

    plus: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 18,
        tintColor: '#0A1128',
    },
    seperator: {

        borderColor: '#0A1128',

    },

    space: {
        flexDirection: 'row',
        marginLeft: 30,
    },

    date: {
        flexDirection: 'row',

    },


    textButton: {
        marginBottom: 20, // Adds bottom margin
        width: '100%', // Sets the width to 100% of the container
        height: 50, // Sets the height of the button
        backgroundColor: '#ffffff', // Sets the background color of the button
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Aligns text to the left

    },


    innerButton: {
        flex: 1, // Distribute the available space evenly among child buttons
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#D6AD60',

    },

    leftInnerButton: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,

    },

    meeting: {
        marginLeft: 10,
        marginTop: 10,
    },

    meetingTitle: {
        color: '#040F21',
        fontFamily: 'OpenSans-Bold',
        fontSize: 15,
        marginBottom: 20,
    },

    time: {
        flexDirection: 'row',
    },

    messageWrapper: {
        flexDirection: 'column',
        alignItems: 'center',

    },

    rightInnerButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#0A1128',
        borderColor: '#efefef',
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
        fontSize: 18, // Sets the font size
        color: '#ffffff', // Sets the text color
        fontFamily: 'Montserrat-ExtraBold', // Sets the font family
        marginLeft: 8,
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

    textBorder: {

        borderColor: '#0A1128',
        borderWidth: 1.3,
        borderRadius: 8, // Sets the border radius
        marginLeft: 25,
        width: 30,
        height: 30,
        alignItems: 'center',

    },


    pastTextBorder: {

        borderColor: '#ffffff',
        borderWidth: 1.3,
        borderRadius: 8, // Sets the border radius
        marginLeft: 25,
        width: 30,
        height: 30,
        alignItems: 'center',
    },


    buttonsContainer: {
        marginTop: 20,
        paddingHorizontal: 16, // Adds horizontal padding
        flexDirection: 'row',
    },

    button: {
        flex: 1,
        height: 50,
        width: '100%', // Sets the width to 100% of the container
        borderRadius: 10, // Sets the border radius
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Aligns text to the left
        flexDirection: 'row',
        marginBottom: 0.5,
    },

    meetingDate: {
        color: '#000000', // Sets the text color
        fontFamily: 'OpenSans-Regular', // Sets the font family
        fontSize: 13, // Sets the font size
        marginLeft: 10,

    },



    message: {
        flex: 1,
        height: 350,
        width: '100%', // Sets the width to 100% of the container
        borderRadius: 10, // Sets the border radius
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Aligns text to the left
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginTop: 20,
    },

    meetings: {
        flex: 1,
        height: 90,
        width: '100%', // Sets the width to 100% of the container
        borderRadius: 10, // Sets the border radius
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginTop: 20,

    },


    buttonWithBorder: {
        borderColor: '#ffffff', // Sets the border color
        borderWidth: 1, // Sets the border width
    },

    buttonWithTopBorder: {
        borderTopColor: '#4D7EA8',
        borderTopWidth: 8, // Sets the border width
    },


    upcomingText: {
        color: '#0A1128', // Sets the text color
        fontFamily: 'OpenSans-Bold', // Sets the font family
        fontSize: 14, // Sets the font size
    },

    count: {
        color: '#0A1128', // Sets the text color
        fontFamily: 'OpenSans-Bold', // Sets the font family
        fontSize: 14, // Sets the font size
        marginTop: 3.5,
    },

    pastCount: {
        color: '#ffffff', // Sets the text color
        fontFamily: 'OpenSans-Bold', // Sets the font family
        fontSize: 14, // Sets the font size
        marginTop: 3.5,
    },

    pastText: {
        color: '#ffffff', // Sets the text color
        fontFamily: 'OpenSans-Bold', // Sets the font family
        fontSize: 14, // Sets the font size
        alignItems: 'center', // Aligns text to the left
        marginLeft: 15,
    },

    footer: {
        flexDirection: 'row', // Sets the direction of items in the container to horizontal
    },

    footerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 20,
        paddingBottom: 20,
    },

    optionContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -29,

    },


    footerButtonContainer: {
        flex: 1, // Takes up the available space
        alignItems: 'center', // Centers content horizontally
        marginLeft: 265,
        marginBottom: 20,

    },

    optionsText: {
        color: '#0A1128', // Sets the text color
        fontFamily: 'OpenSans-Regular', // Sets the font family
        fontSize: 13, // Sets the font size
    },
    optionsTextB: {
        color: '#0A1128', // Sets the text color
        fontFamily: 'OpenSans-Semibold', // Sets the font family
        fontSize: 13, // Sets the font size
    },

    footerButton: {
        height: 100, // Sets the height of the button
        backgroundColor: '#ffffff', // Sets the background color of the button
        borderRadius: 50, // Sets the border radius of the button
        width: 100, // Sets the width of the button
    },

    footerButtonText: {
        color: '#ffffff', // Sets the text color
        fontFamily: 'OpenSans-Semibold', // Sets the font family
        fontSize: 50, // Sets the font size
    },

    footerBorder: {
        borderColor: '#ffffff', // Sets the border color
        borderWidth: 2, // Sets the border width
    },

    welcomeText: {
        color: '#040F21', // Sets the text color
        fontFamily: 'Montserrat-ExtraBold', // Sets the font family
        fontSize: 30, // Sets the font size
        marginBottom: 15, // Adds top margin
    },

    toText: {
        color: '#040F21', // Sets the text color
        fontFamily: 'Montserrat-ExtraBold', // Sets the font family
        fontSize: 15, // Sets the font size
        marginBottom: 15, // Adds top margin
    },

    mwText: {
        color: '#040F21', // Sets the text color
        fontFamily: 'Montserrat-ExtraBold', // Sets the font family
        fontSize: 28, // Sets the font size
        marginBottom: 50, // Adds top margin
    },

    selectText: {
        color: '#040F21', // Sets the text color
        fontFamily: 'OpenSans-Regular', // Sets the font family
        fontSize: 17, // Sets the font size
        marginBottom: 3, // Adds top margin
    },
    selectTextB: {
        color: '#040F21', // Sets the text color
        fontFamily: 'OpenSans-Regular', // Sets the font family
        fontSize: 17, // Sets the font size
        marginBottom: 15, // Adds top margin
    },

});

export default HomeScreen;
