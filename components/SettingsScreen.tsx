import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,



} from 'react-native';
import { styles } from "../assets/Styles";

export const SettingsScreen = ({ navigation }: { navigation: any }) => {

    const [hourlyRate, setHourlyRate] = useState('');

    const [participants, setParticipants] = useState('');

    const handleBack = () => {
        navigation.navigate('Home', {
            participants: participants,
            hourlyRate: hourlyRate
        });
    }

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
                            value={participants}
                            onChangeText={setParticipants}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.createMeeting.textButton}>
                        <Text style={styles.createMeeting.buttonText}>Average Hourly Rate</Text>
                        <TextInput
                            style={styles.createMeeting.inputText}
                            placeholder="Enter rate"
                            value={isHourlyRateEntered ? hourlyRate : ''}
                            onChangeText={handleHourlyRateChange}
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