import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,



} from 'react-native';
import { Icon, Slider } from '@rneui/themed';
import { getDBConnection, retrieveSettings } from '../services/db-services';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from 'react-native-elements';
import { MeetingItem, createNewMeetingItem } from '../models/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getStyles } from '../assets/Styles';
import MeetingItemComponent from './MeetingItem';

export const SettingsScreen = ({ navigation }: { navigation: any }) => {

    const [style, setStyle] = useState(getStyles(1));
    const [previewStyle, setPreviewStyle] = useState(getStyles(1));
    //setStyle(getStyles(0.5));

    const [hourlyRate, setHourlyRate] = useState('');

    const [participants, setParticipants] = useState('');

    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);

    const loadDataCallback = useCallback(async () => {
        try {
            const db = await getDBConnection();
            const settings: { [k: string]: any } = await retrieveSettings(db);
            setParticipants("" + settings.default_participants);
            setHourlyRate("$" + settings.default_hourly.toFixed(2));
        } catch (error) {
            console.error(error);
        }
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            loadDataCallback();
        }, [loadDataCallback]));




    const handleNumber = () => {
        setActiveButtonIndex(0);
        navigation.navigate('NumberOfParticipants');
    };

    const handleHourlyRate = () => {
        setActiveButtonIndex(1);
        navigation.navigate('AverageHourlyRate');
    };

    const handleAccessibility = () => {
        setActiveButtonIndex(2);
    };

    const preview = () =>{
        return(
        <MeetingItemComponent meeting={createNewMeetingItem()} style={previewStyle}/>
        );
    }



    return (
        <GestureHandlerRootView style={style.settings.container}>
            <View style={style.settings.container}>
                {/*
                <View style={style.settings.header}>
                    <TouchableOpacity style={style.settings.back} onPress={handleBack}>
                        <Image source={require('../assets/back.png')} style={style.settings.back} />
                    </TouchableOpacity>
                    <Image source={require('../assets/logo_01.png')} style={style.settings.logo} />
                    <Text style={style.settings.headerText}>Settings</Text>
                </View>
                */}
                <View style={style.createMeeting.buttonsContainer}>
                    <Text style={style.settings.subHeader}>Meeting Defaults</Text>

                    <TouchableOpacity style={[style.settings.textButton, activeButtonIndex === 0 && { backgroundColor: '#D6AD60'}]} onPress={handleNumber}>
                        <Text style={style.settings.buttonText}>Number of Participants</Text>
                        <Text style={style.settings.inputText}>{participants}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.settings.textButton, activeButtonIndex === 1 && { backgroundColor: '#D6AD60'}]} onPress={handleHourlyRate}>
                        <Text style={style.settings.buttonText}>Average Hourly Rate</Text>
                        <Text style={style.settings.inputText}>{hourlyRate}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[style.settings.textButton, activeButtonIndex === 2 && { backgroundColor: '#D6AD60'}]} onPress={handleAccessibility}
                    >

                        <View style={style.settings.accessibility}>
                            <Text style={style.settings.title}>Accessibilty & Display</Text>
                            <Image source={require('../assets/next_arrow.png')} style={style.settings.nextArrow} />
                        </View>

                    </TouchableOpacity>
                    <View style={{marginHorizontal:30}}>
                        <Slider
                            //value={value}
                            onValueChange={(value)=>{setPreviewStyle(getStyles(value/100))}}
                            maximumValue={150}
                            minimumValue={50}
                            step={25}
                            allowTouchTrack
                            minimumTrackTintColor={colors.white}
                            maximumTrackTintColor={colors.white}
                            trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                            thumbProps={{
                            children: (
                                <Icon
                                name="text-fields"
                                type="material"
                                size={15}
                                reverse
                                reverseColor={colors.black}
                                containerStyle={{ bottom: 15, right: 15 }}
                                color={colors.white}/>
                                ),
                            }}
                        />
                    </View>
                    
                </View>
                <View style={{margin:5,borderWidth:1,borderColor:colors.white}}>
                    {preview()}
                </View>
            </View>
        </GestureHandlerRootView>
    )
}
export default SettingsScreen;