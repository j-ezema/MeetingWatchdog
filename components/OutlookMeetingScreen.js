import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,



} from 'react-native';
import { Button } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';



const OutlookMeetingScreen = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [isChecked, setIsChecked] = useState(false);

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


    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.cancelButtonContainer} >
                    <Image source={require('../assets/close.png')} style={styles.cancelButtonImage} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Outlook Meetings</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.selectDateContainer}>
                    <View style={styles.buttonsContainer}>
                        <View
                            style={[styles.dateBarContainer]}

                        >
                            <View style={styles.dateBar}>
                                <TouchableOpacity onPress={handlePrevDate}>
                                    <Image source={require('../assets/prev_arrow.png')} style={styles.arrowIcon} />
                                </TouchableOpacity>
                                <Text style={styles.dateText}>{formattedDate}</Text>
                                <TouchableOpacity onPress={handleNextDate}>
                                    <Image source={require('../assets/next_arrow.png')} style={styles.arrowIconB} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>


                    <View style={styles.buttonsContainer}>

                        <View
                            style={[styles.button]}

                        >
                            <View style={styles.selectButton}>
                                <CheckBox
                                    value={isChecked}
                                    onValueChange={(value) => setIsChecked(value)}
                                    tintColors={{ true: '#0A1128', false: '#0A1128' }}
                                />
                                <View>
                                    <Text style={styles.selectButtonTitle}>Select All </Text>
                                </View>
                            </View>
                        </View>



                    </View>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.footer}>
                    <View style={[styles.footerButtonContainer]}>
                        <Button
                            title="Save"
                            titleStyle={styles.footerButtonTextB}
                            buttonStyle={styles.footerButton}
                        />
                    </View>
                    <View style={styles.footerButtonContainer}>
                        <Button
                            title="Start Meeting"
                            titleStyle={styles.footerButtonText}
                            buttonStyle={[styles.footerButton, styles.startButton, styles.footerBorder]}
                        />
                    </View>
                </View>
            </View>
        </View>
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

    dateBar: {
        flexDirection: 'row',
        backgroundColor: '#ffffff', // Add this line to set the background color of the white container
        borderRadius: 10, // Add this line to set the border radius of the white container
        padding: 10, // Add this line to provide some spacing around the date
        width: '100%',

    },

    selectDateContainer:{
        marginTop: 15,
    },

    arrowIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#0A1128',
        marginLeft: -17, // Add this line to push the left arrow slightly away from the date // Add this line to push the right arrow slightly away from the date
    },
    arrowIconB: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#0A1128',

        // Add this line to push the right arrow slightly away from the date
    },
    dateText: {
        flex: 1,
        fontSize: 16,
        color: '#0A1128',
        fontFamily: 'OpenSans-Semibold',
        textAlign: 'center',

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
        marginTop: 10,
        paddingHorizontal: 16, // Adds horizontal padding
        justifyContent: 'center', // Centers content vertically
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectButtonTitle: {
        color: '#0A1128',
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    button: {
        height: 40,
        width: '100%', // Sets the width to 100% of the container
        borderRadius: 10, // Sets the border radius
        backgroundColor: '#ffffff', // Sets the background color of the button
        justifyContent: 'center', // Centers content vertically
        alignItems: 'flex-start', // Aligns text to the left
        flexDirection: 'column',
        paddingLeft: 10, // Adds left padding for text
    },
    dateBarContainer: {
        height: 50,
        width: '100%', // Sets the width to 100% of the container
        borderRadius: 10, // Sets the border radius
        backgroundColor: '#ffffff', // Sets the background color of the button
        justifyContent: 'center', // Centers content vertically
        alignItems: 'flex-start', // Aligns text to the left
        flexDirection: 'column',
        paddingLeft: 16, // Adds left padding for text
    },


    buttonWithBorder: {
        borderColor: '#152B61', // Sets the border color
        borderWidth: 2, // Sets the border width
    },

    footer: {
        flexDirection: 'row', // Sets the direction of items in the container to horizontal
    },

    footerContainer: {
        position: 'absolute',
        borderTopWidth: 0.5, // Adds a top border
        borderTopColor: '#EFEFEF', // Sets the color of the top border
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 20,
        paddingBottom: 20,
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
        backgroundColor: '#0A1128', // Sets the background color of the button
    },
    footerBorder: {
        borderColor: '#ffffff', // Sets the border color
        borderWidth: 2, // Sets the border width
    }

});

export default OutlookMeetingScreen;
