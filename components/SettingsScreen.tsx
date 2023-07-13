import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,



} from 'react-native';
import { styles } from "../assets/Styles";
import { getDBConnection, retrieveSettings } from '../services/db-services';
import { useFocusEffect } from '@react-navigation/native';

export const SettingsScreen = ({ navigation }: { navigation: any }) => {

    const [hourlyRate, setHourlyRate] = useState('');

    const [participants, setParticipants] = useState('');

    const loadDataCallback = useCallback(async () => {
        try {
            const db = await getDBConnection();
            const settings: { [k: string]: any } = await retrieveSettings(db);
            setParticipants("" + settings.default_participants);
            setHourlyRate("" + settings.default_hourly);
        } catch (error) {
            console.error(error);
        }
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            loadDataCallback();
        }, [loadDataCallback]));




    const handleNumber = () => {
        navigation.navigate('NumberOfParticipants')
    };

    const handleHourlyRate = () => {
        navigation.navigate('AverageHourlyRate')
    };



    return (
        <View style={styles.settings.container}>
            {/*
            <View style={styles.settings.header}>
                <TouchableOpacity style={styles.settings.back} onPress={handleBack}>
                    <Image source={require('../assets/back.png')} style={styles.settings.back} />
                </TouchableOpacity>
                <Image source={require('../assets/logo_01.png')} style={styles.settings.logo} />
                <Text style={styles.settings.headerText}>Settings</Text>
            </View>
            */}
            <View style={styles.createMeeting.buttonsContainer}>
                <Text style={styles.settings.subHeader}>Meeting Defaults</Text>

                <TouchableOpacity style={styles.settings.textButton} onPress={handleNumber}>
                    <Text style={styles.settings.buttonText}>Number of Participants</Text>
                    <Text style={styles.settings.inputText}>{participants}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settings.textButton} onPress={handleHourlyRate}>
                    <Text style={styles.settings.buttonText}>Average Hourly Rate</Text>
                    <Text style={styles.settings.inputText}>{hourlyRate}</Text>
                </TouchableOpacity>

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

    )
}
export default SettingsScreen;