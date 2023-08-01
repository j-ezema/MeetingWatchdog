import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from "../assets/Styles";
import { getDBConnection, saveNumberOfParticipants } from '../services/db-services';

export const NumberofParticipantsScreen = ({ navigation }: { navigation: any }) => {

    const [participants, setParticipants] = useState('');

    const enterParticipants = (x:string) =>{
        if(x.trim().length < 1){
            setParticipants(x);
        }else{
            const parsed = parseInt(x);
            if(parsed){
                if(parsed > 1000){
                    setParticipants(""+1000);
                }else if(parsed < 1){
                    setParticipants(""+1);
                }else{
                    setParticipants(""+parsed);
                }
            }
        }
    }
    const handleExit = async () => {
        setParticipants("");
        navigation.navigate('Settings', {
            participants: participants,
        });
    };

    const handleSave = async () => {
        const db = await getDBConnection();
        await saveNumberOfParticipants(db, participants);
        handleExit();
    };

    return (
        <View style={styles.settings.container}>

            <View style={styles.createMeeting.buttonsContainer}>

                <Text style={styles.settings.subHeader}>Edit Number of Participants</Text>

                <View style={styles.createMeeting.textButton}>
                    <Text style={styles.createMeeting.buttonText}>Number of Participants</Text>
                    <TextInput
                        style={styles.createMeeting.inputText}
                        placeholder="Enter number"
                        value={participants}
                        onChangeText={enterParticipants}
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
                            onPress={handleExit}


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
