import React, { useCallback, useEffect, useState } from 'react';
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
import { getDBConnection, retrieveSettings, saveMeetingItems } from '../services/db-services';
import { createNewMeetingItem } from '../models';
import { colors, styles } from "../assets/Styles";
import moment from 'moment';
import CurrencyInput from 'react-native-currency-input';

export const SettingsScreen = ({ navigation }: { navigation: any }) => {

    const handleBack = () => { 
        navigation.navigate('Home');
    }
    return (
        <View style={styles.settings.container}>
            <View style={styles.settings.header}>
                <TouchableOpacity style={styles.settings.back} onPress={handleBack}>
                    <Image source={require('../assets/back.png')} style={styles.settings.back} />
                </TouchableOpacity>
                <Image source={require('../assets/logo_01.png')} style={styles.settings.logo} />
                <Text style={styles.settings.headerText}>Settings</Text>
            </View>

            <View style={styles.createMeeting.content}>

                <View style={styles.createMeeting.buttonsContainer}>

                    <Text style={styles.settings.subHeader}>Meeting Defaults</Text>

                    <View style={styles.createMeeting.textButton}>
                        <Text style={styles.createMeeting.buttonText}>Number of Participants</Text>
                        <TextInput
                            style={styles.createMeeting.inputText}
                            placeholder="Enter number"

                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.createMeeting.textButton}>
                        <Text style={styles.createMeeting.buttonText}>Average Hourly Rate</Text>
                        <CurrencyInput
                            style={styles.createMeeting.inputText}
                            placeholder="Enter rate"
                            prefix="$"
                            delimiter=","
                            separator="."
                            precision={2}
                            value={100}
                            keyboardType="numeric"
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.createMeeting.textButton]}

                    >

                        <View style={styles.settings.accessibility}>
                            <Text style={styles.settings.title}>Accessibilty & Display</Text>
                            <Image source={require('../assets/next_arrow.png')} style={styles.settings.nextArrow} />
                        </View>

                    </TouchableOpacity>

                </View>



            </View>
        </View>

    )
}
export default SettingsScreen;