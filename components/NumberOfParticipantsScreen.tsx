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
import { NumericTextEntry } from './NumericTextEntry';
import { useFocusEffect } from '@react-navigation/native';


export const NumberofParticipantsScreen = ({ navigation }: { navigation: any }) => {

    const [participants, setParticipants] = useState('');

<<<<<<< HEAD
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
=======
    const participantsInputRef = useRef<TextInput>(null);

    const handleCancel = async () => {
>>>>>>> 99784b1a6682b0444d9ba4f65eee71b8f81617f4
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
<<<<<<< HEAD
                <NumericTextEntry value={participants} setValue={(x:string)=>{setParticipants(x);}}/>
=======

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
>>>>>>> 99784b1a6682b0444d9ba4f65eee71b8f81617f4
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
