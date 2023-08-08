import React, { useCallback, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from "../assets/Styles";
import { getDBConnection, retrieveSettings, saveNumberOfParticipants } from '../services/db-services';
import { useFocusEffect } from '@react-navigation/native';


export const NumberofParticipantsScreen = ({ navigation }: { navigation: any }) => {

    const [participants, setParticipants] = useState('');

    const participantsInputRef = useRef<TextInput>(null);

    const handleCancel = async () => {
        setParticipants("");
    };

    const handleSave = async () => {
        const db = await getDBConnection();
        await saveNumberOfParticipants(db, participants);
        navigation.navigate('Settings', {
            participants: participants,
        });
    };

    const loadDataCallback = useCallback(async () => {
        try {
            const db = await getDBConnection();
            const settings: { [k: string]: any } = await retrieveSettings(db);
            setParticipants("" + settings.default_participants);
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

                <Text style={styles.settings.subHeader}>Edit Number of Participants</Text>

                <TouchableOpacity style={styles.createMeeting.textButton} onPress={() => participantsInputRef.current?.focus()}>
                    <Text style={styles.createMeeting.buttonText}>Number of Participants</Text>
                    <TextInput
                        ref={participantsInputRef}
                        style={styles.createMeeting.inputText}
                        placeholder="Enter number"
                        value={participants}
                        onChangeText={setParticipants}
                        keyboardType="numeric"
                    />
                </TouchableOpacity>
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
