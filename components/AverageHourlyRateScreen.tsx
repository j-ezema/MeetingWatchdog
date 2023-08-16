import React, { useCallback, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { styles } from "../assets/Styles";
import { Button } from 'react-native-elements'
import { getDBConnection, retrieveSettings, saveAverageHourlyRate } from '../services/db-services';
import { useFocusEffect } from '@react-navigation/native';

export const AverageHourlyRateScreen = ({ navigation }: { navigation: any }) => {

    const [hourlyRate, setHourlyRate] = useState('');
    const hourlyRateInputRef = useRef<TextInput>(null);
    const [showError, setShowError] = useState(false);

    const handleHourlyRateChange = (inputValue: string) => {
        setHourlyRate(inputValue);
    };

    const handleHourlyRateSubmit = () => {
        const numericValue = parseFloat(hourlyRate.replace(/\$|,/g, ''));
        if (!isNaN(numericValue)) {
            let formattedRate;
            if (Number.isInteger(numericValue)) {
                formattedRate = `$${numericValue.toFixed(2)}`;
            } else if (numericValue.toFixed(1) === numericValue.toString()) {
                formattedRate = `$${numericValue.toFixed(2)}`;
            } else {
                formattedRate = `$${numericValue}`;
            }
            setHourlyRate(formattedRate);
        }
    };

    const handleCancel = async () => {
        setHourlyRate("");
        navigation.navigate('Settings', {
            hourlyRate: hourlyRate,
        });
    };

    const handleSave = async () => {
        if (!hourlyRate) {
            setShowError(true);
        } else {
            handleHourlyRateSubmit();
            const db = await getDBConnection();
            await saveAverageHourlyRate(db, +(hourlyRate).replace(/[^0-9.]/g, ''));
            navigation.navigate('Settings', {
                hourlyRate: hourlyRate,
            });
        }
    };

    const loadDataCallback = useCallback(async () => {
        try {
            const db = await getDBConnection();
            const settings: { [k: string]: any } = await retrieveSettings(db);
            setHourlyRate("$" + settings.default_hourly.toFixed(2));
        } catch (error) {
            console.error(error);
        }
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            loadDataCallback();
        }, [loadDataCallback]));






    return (
        <View style={styles.settings.container}>

            <View style={styles.createMeeting.buttonsContainer}>

                <Text style={styles.settings.subHeader}>Edit Average Hourly Rate</Text>

                <TouchableOpacity style={[styles.createMeeting.textButton, (!hourlyRate && showError) && styles.createMeeting.errorButtonWithBorder]} onPress={() => hourlyRateInputRef.current?.focus()}>
                    <Text style={[styles.createMeeting.buttonText, (!hourlyRate && showError) && styles.createMeeting.errorText]}>Average Hourly Rate *</Text>
                    <TextInput
                        ref={hourlyRateInputRef}
                        style={styles.createMeeting.inputText}
                        placeholder="Enter hourly rate"
                        value={hourlyRate}
                        onChangeText={handleHourlyRateChange}
                        keyboardType="numeric"
                        onSubmitEditing={handleHourlyRateSubmit}
                    />
                </TouchableOpacity>
                {showError && (

                    <View style={[styles.createMeeting.errorTextButton, styles.createMeeting.errorButtonWithBorder]}>
                        <Text style={styles.createMeeting.errorButtonText}>Please fill in the required* information</Text>
                    </View>
                )}
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