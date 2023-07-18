import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Linking,



} from 'react-native';
import { styles } from "../assets/Styles";
import { getDBConnection, retrieveSettings } from '../services/db-services';
import { useFocusEffect } from '@react-navigation/native';

export const AboutScreen = ({ navigation }: { navigation: any }) => {

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




    const handleDeveloper = () => {
        Linking.openURL('https://www.carbonedge.com/meeting-watchdog');
    };

    const handlePrivacy = () => {
        Linking.openURL('https://www.carbonedge.com/watchdog-privacy-policy');
    };

    const handleTerms = () => {
        Linking.openURL('https://www.carbonedge.com/meeting-watchdog-terms-and-conditions');
    };

    const handleCopyright = () => {
        Linking.openURL('https://www.carbonedge.com/meeting-watchdog-copyright');
    };



    return (
        <View style={styles.about.container}>
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
                <TouchableOpacity style={styles.about.textButtonContainer} onPress={handleDeveloper}>
                    <View style={styles.about.textButton}>
                        <Text style={styles.about.buttonText}>Developer</Text>
                        <Text style={styles.about.inputText}>2023 Carbon Edge Corporation</Text>
                    </View>
                    <Image source={require('../assets/next_arrow.png')} style={styles.about.developer} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.about.textButton}>
                    <Text style={styles.about.buttonText}>App Version</Text>
                    <Text style={styles.about.inputText}>00.0.0000.001</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.createMeeting.textButton]}
                    onPress={handlePrivacy}
                >
                    <View style={styles.about.accessibility}>
                        <Text style={styles.about.title}>Privacy Policy</Text>
                        <Image source={require('../assets/next_arrow.png')} style={styles.about.privacy} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.createMeeting.textButton]}
                    onPress={handleTerms}
                >
                    <View style={styles.about.accessibility}>
                        <Text style={styles.about.title}>Terms And Conditions</Text>
                        <Image source={require('../assets/next_arrow.png')} style={styles.about.terms} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.createMeeting.textButton]}
                    onPress={handleCopyright}
                >
                    <View style={styles.about.accessibility}>
                        <Text style={styles.about.title}>Copyright</Text>
                        <Image source={require('../assets/next_arrow.png')} style={styles.about.copyright} />
                    </View>
                </TouchableOpacity>


            </View>
        </View>

    )
}
export default AboutScreen;