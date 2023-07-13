import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import { styles } from "../assets/Styles";
import { Button} from 'react-native-elements'
import { getDBConnection, saveAverageHourlyRate } from '../services/db-services';

export const AverageHourlyRateScreen = ({ navigation }: { navigation: any }) => {

    const [hourlyRate, setHourlyRate] = useState('');

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

    const handleCancel = async () => {
        setHourlyRate("");
    };

    const handleSave = async () => {
        const db = await getDBConnection();
        await saveAverageHourlyRate(db, hourlyRate);
        navigation.navigate('Settings', {
            hourlyRate: hourlyRate,
        });
    };


    return (
        <View style={styles.settings.container}>

            <View style={styles.createMeeting.buttonsContainer}>

                <Text style={styles.settings.subHeader}>Edit Average Hourly Rate</Text>

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
            </View>
            <View style={styles.createMeeting.footerContainer}>

                <View style={styles.createMeeting.footer}>
                    <View style={styles.createMeeting.footerButtonContainer}>
                        <Button
                            title="Cancel"
                            titleStyle={styles.createMeeting.footerButtonTextB}
                            buttonStyle={styles.createMeeting.footerButton}
                            containerStyle={styles.createMeeting.footerButtonContainerStyle}
                            onPress={handleCancel}


                        />
                    </View>
                    <View style={styles.createMeeting.footerButtonContainer}>
                        <Button
                            title="Save"
                            titleStyle={styles.createMeeting.footerButtonText}
                            buttonStyle={[styles.createMeeting.footerButton, styles.createMeeting.startButton, styles.createMeeting.footerBorder]}
                            containerStyle={styles.createMeeting.footerButtonContainerStyle}
                            onPress={handleSave}

                        />
                    </View>
                </View>
            </View>
        </View>
    )

}