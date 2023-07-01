import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,



} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { styles } from '../assets/Styles';



const OutlookMeetingScreen = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [isChecked, setIsChecked] = useState(false);

    const handlePrevDate = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setSelectedDate(prevDate);
    };

    const navigation = useNavigation();

    const handleCancel = () => {
        navigation.navigate('Home');
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

        <View style={styles.outlookMeeting.container}>
            <View style={styles.outlookMeeting.header}>
                <TouchableOpacity style={styles.outlookMeeting.cancelButtonContainer} onPress={handleCancel}>
                    <Image source={require('../assets/close.png')} style={styles.outlookMeeting.cancelButtonImage} />
                </TouchableOpacity>
                <Text style={styles.outlookMeeting.headerText}>Outlook Meetings</Text>
            </View>
            <View style={styles.outlookMeeting.content}>
                <View style={styles.outlookMeeting.selectDateContainer}>
                    <View style={styles.outlookMeeting.buttonsContainer}>
                        <View
                            style={[styles.outlookMeeting.dateBarContainer]}

                        >
                            <View style={styles.outlookMeeting.dateBar}>
                                <TouchableOpacity onPress={handlePrevDate}>
                                    <Image source={require('../assets/prev_arrow.png')} style={styles.outlookMeeting.arrowIcon} />
                                </TouchableOpacity>
                                <Text style={styles.outlookMeeting.dateText}>{formattedDate}</Text>
                                <TouchableOpacity onPress={handleNextDate}>
                                    <Image source={require('../assets/next_arrow.png')} style={styles.outlookMeeting.arrowIconB} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>


                    <View style={styles.outlookMeeting.buttonsContainer}>

                        <View
                            style={[styles.outlookMeeting.button]}

                        >
                            <View style={styles.outlookMeeting.selectButton}>
                                <CheckBox
                                    value={isChecked}
                                    onValueChange={(value) => setIsChecked(value)}
                                    tintColors={{ true: '#0A1128', false: '#0A1128' }}
                                />
                                <View>
                                    <Text style={styles.outlookMeeting.selectButtonTitle}>Select All </Text>
                                </View>
                            </View>
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
                        />
                    </View>
                    <View style={styles.outlookMeeting.footerButtonContainer}>
                        <Button
                            title="Start Meeting"
                            titleStyle={styles.outlookMeeting.footerButtonText}
                            buttonStyle={[styles.outlookMeeting.footerButton, styles.outlookMeeting.startButton, styles.outlookMeeting.footerBorder]}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default OutlookMeetingScreen;
