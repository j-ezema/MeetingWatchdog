import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,



} from 'react-native';
import { Icon, Slider } from '@rneui/themed';
import { getDBConnection, retrieveSettings, saveFontSizeAccessibility } from '../services/db-services';
import { useFocusEffect } from '@react-navigation/native';
import { Button, colors } from 'react-native-elements';
import { MeetingItem, createNewMeetingItem } from '../models/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getStyles, styles } from '../assets/Styles';
import MeetingItemComponent from './MeetingItem';
import * as global from '../services/global';
import { fontSize } from '../services/global';


export const SettingsScreen = ({ navigation }: { navigation: any }) => {

    const style = styles;
    const [previewStyle, setPreviewStyle] = useState(getStyles(1));
    
    //setStyle(getStyles(0.5));

    const [hourlyRate, setHourlyRate] = useState('');

    const [participants, setParticipants] = useState('');

    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);

    const [fontSize, setFontSize] = useState(global.fontSize*100);

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
            //for the love of god do not ask me WHY I need this scrollview in order for the meeting item to resize properly
            <View>
                <Text style={style.settings.subHeader}>
                    Text Display Preview
                </Text>
                <ScrollView style={{margin:10,marginTop:0, borderWidth:0,borderColor:colors.white}} >
                    <MeetingItemComponent meeting={createNewMeetingItem()} style={previewStyle}/>
                </ScrollView>
            </View>
            
        );
    }


    function handleExit(){
        navigation.navigate('Home');
    }
    async function handleSave(){
        global.setFontSize(fontSize)
        const db = await getDBConnection();
        await saveFontSizeAccessibility(db,fontSize);
        navigation.navigate('Home');
    }

    return (
        <GestureHandlerRootView style={{flex:1,}}>
            <ScrollView style={style.settings.container}>
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
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Text style={[style.settings.font,{fontSize:20}]}>Aa</Text>
                        <View style={style.settings.slider}>
                        
                            <Slider
                                value={fontSize}
                                onValueChange={(value)=>{setPreviewStyle(getStyles(value/100)); setFontSize(value/100)}}
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
                        <Text style={[style.settings.font,{fontSize:30}]}>Aa</Text>
                    </View>
                        

                        {preview()}
                </View>
            </ScrollView>
            <View style={style.settings.footerContainer}>
                <View style={style.settings.footer}>
                    <View style={style.settings.footerButtonContainer}>
                        <Button
                            title="Exit"
                            titleStyle={style.createMeeting.footerButtonTextB}
                            buttonStyle={style.settings.footerButton}
                            containerStyle={style.createMeeting.footerButtonContainerStyle}
                            onPress={handleExit}
                        />
                    </View>
                    <View style={style.settings.footerButtonContainer}>
                        <Button
                            title="Save"
                            titleStyle={style.settings.footerButtonText}
                            buttonStyle={[style.settings.footerButton, style.createMeeting.startButton, style.createMeeting.footerBorder]}
                            containerStyle={style.createMeeting.footerButtonContainerStyle}
                            onPress={handleSave}

                        />
                    </View>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}
export default SettingsScreen;