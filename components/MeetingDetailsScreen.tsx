import { useCallback, useRef, useState } from "react";
import { MeetingItem, createNewMeetingItem } from "../models";
import { Dimensions, Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, styles } from "../assets/Styles";
import { Icon } from "react-native-elements";
import moment from "moment";
import React from "react";
import { getDBConnection, getMeetingItem, updateMeetingItem } from "../services/db-services";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native";





export const MeetingDetailsScreen = ({ route}:{route:any}) => {
    ///STATE VARIABLES
    const { meetingID, otherParam } = route.params;
    const [meeting, setMeeting] = useState(createNewMeetingItem());
    const [rate, setRate] = useState(100);// idle time
    const [participants, setParticipants] = useState(5);// total time
    const [timerA, setTimerA] = useState(0);// idle time
    const [timerB, setTimerB] = useState(0);// total time
    const [TimerValueA, setTimerValueA] = useState("00:00:00");
    const [TimerValueB, setTimerValueB] = useState("00:00:00");
    const [costA, setCostA] = useState('$0.00');
    const [costB, setCostB] = useState('$0.00');
    const [isCounting, setIsCounting] = useState(false);
    const [isIdle, setIsIdle] = useState(true);
    const [pointInitial, setPointInitial] = useState(moment.now);// total time
    const [pointResume, setPointResume] = useState(moment.now);// total time
    const [baseIdle, setBaseIdle] = useState(0);// total time
    const [isPastMeeting, setIsPastMeeting] = useState(true);// total time
    const [rateEntry, setRateEntry] = useState("100");// idle time
    const [participantsEntry, setParticipantsEntry] = useState("5");// total time
    const windowHeight = Dimensions.get('window').height-100;
    let startButton = (<View/>);
    const participantsInputRef = useRef<TextInput>(null);
    const hourlyRateInputRef = useRef<TextInput>(null);

    ///FORMATTING METHODS

    //formats time
    const formatTime = (ms: number) =>{
        return moment("2015-01-01").startOf('day').millisecond(ms).format('HH:mm:ss');
    }
    //calculates and formats cost 
    const calculateCost = (ms: number) =>{
        return '$'+Number(rate*ms/3600/1000*participants).toFixed(2)
    }

    ///DATABASE METHODS

    const loadDataCallback = useCallback(async () => {
        const db = await getDBConnection();
        let meetingTemp = await getMeetingItem(db, meetingID);
        setMeeting(meetingTemp)
        setRate(meetingTemp.average_hourly_cost);
        setParticipants(meetingTemp.number_of_participants);
        setRateEntry(""+meetingTemp.average_hourly_cost.toFixed(2));
        setParticipantsEntry(""+meetingTemp.number_of_participants);

        if(meetingTemp.id != -1 ){
            if(meetingTemp.total_meeting_time == null){
                setIsPastMeeting(false);
            }
            else{
                setTimerA(meetingTemp.total_wait_time);
                setTimerB(meetingTemp.total_meeting_time);
                setCostA('$'+meetingTemp.total_wait_cost.toFixed(2));
                setCostB('$'+meetingTemp.total_meeting_cost.toFixed(2));
                setTimerValueA(formatTime(meetingTemp.total_wait_time));
                setTimerValueB(formatTime(meetingTemp.total_meeting_time));
            }
        }
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadDataCallback();
        }, [loadDataCallback]));
    
    const saveMeetingItem = useCallback(async () => {
        const db = await getDBConnection();
        await updateMeetingItem(db,meeting);
    }, [meeting]);

    

    ///Stopwatch functionality
    React.useEffect(() => {
        const intervalID = setInterval(() =>  {
            if(isCounting){
                let sync = moment.now();
                if(isIdle){
                    setTimerA((sync-pointResume)+baseIdle);
                }
                setTimerB((sync-pointInitial));
            }
        }, 1000);
        return () => clearInterval(intervalID);
    }, [pointInitial,timerA,isIdle,isCounting]);
    
    React.useEffect(() => {
        if(isCounting){
            meeting.average_hourly_cost = rate;
            meeting.number_of_participants = participants;
            if(isIdle){
                setTimerValueA(formatTime(timerA));
                setCostA(calculateCost(timerA));
                meeting.total_wait_cost = rate*timerA/3600/1000*participants;
                meeting.total_wait_time = Math.round(timerA/1000);
            }
            setTimerValueB(formatTime(timerB));
            setCostB(calculateCost(timerB));
            meeting.total_meeting_cost = rate*timerB/3600/1000*participants;//updates meeting object, this is just for updating db
            meeting.total_meeting_time = Math.round(timerB/1000);//updates meeting object, this is just for updating db
        }
    }, [timerA, timerB]);//*/

    ///Handlers
    
    const handleIdlePause = () => {
        if(isIdle){
            setBaseIdle(timerA);
        }else{
            setPointResume(moment.now);
        }
        setIsIdle(!isIdle);
    }
    const handleEndMeeting = () => {
        setIsCounting(false);
        setIsIdle(false);
        setIsPastMeeting(true);
        saveMeetingItem();
    }
    const handleStartMeeting = () => {
        setIsCounting(true);
        setPointInitial(moment.now);
        setPointResume(moment.now);
        setIsIdle(true);
        setBaseIdle(0);
    }

    
    
    /// ui switch
    if (isPastMeeting ) {
        startButton = (
            <View style={[ styles.meetingDetails.button, styles.meetingDetails.startButton,styles.meetingDetails.disabled]}>
                <Text style={[styles.meetingDetails.buttonText, styles.meetingDetails.disabled]}>
                    Start Meeting
                </Text>
            </View>
        );
    } else {
        startButton = (
            <TouchableOpacity style={[styles.meetingDetails.button, styles.meetingDetails.startButton]} onPress={handleStartMeeting}>
                <Text style={[styles.meetingDetails.buttonText, styles.meetingDetails.TextWhite]}>
                    Start Meeting
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView style={{flex:1,backgroundColor:colors.oxfordBlue}}>
            <View style={{width:'100%', height:windowHeight,flex:1, }}>
                <KeyboardAvoidingView style={{flex:-1, paddingTop:30}} keyboardVerticalOffset={90}>
                    <View style={styles.meetingDetails.detailTitle}>
                        <Text style={styles.meetingDetails.Title}>
                            {meeting.meeting_title}
                        </Text> 
                        <View style={styles.meetingDetails.detailDateTime}>
                            <View style={styles.meetingDetails.splitItem}>
                                <Icon color={colors.white} type="material-community" name="calendar-month-outline" size={20}/>
                                <Text style={styles.meetingDetails.dateText}>{moment(meeting.meeting_datetime).format("YYYY-MM-DD")}</Text>
                            </View>
                            <View style={styles.meetingDetails.splitItem}>
                                <Icon color={colors.white} type="material-community" name="clock-outline" size={20}/>
                                <Text style={styles.meetingDetails.dateText}>{moment(meeting.meeting_datetime).format("h:mma")}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.meetingDetails.overViewView}>
                        <View style={styles.meetingDetails.interiorRow}>
                            <View style={styles.meetingDetails.costContainer}>
                                <Text style={styles.meetingDetails.costTitle}>
                                    Idle Time Cost
                                </Text>
                            </View>
                            <View style={styles.meetingDetails.timeContainer}>
                                <Text style={styles.meetingDetails.timeTitle}>
                                    Idle Time Spent 
                                </Text>
                            </View>
                        </View>
                        <View style={styles.meetingDetails.interiorRow}>
                            <View style={[styles.meetingDetails.costContainer, styles.meetingDetails.valueBottom]}>
                                <Text style={styles.meetingDetails.costValue}>
                                    {costA}
                                </Text>
                            </View>
                            <View style={[styles.meetingDetails.timeContainer, styles.meetingDetails.valueBottom]}>
                                <Text style={styles.meetingDetails.timeValue}>
                                    {TimerValueA}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.meetingDetails.overViewView}>
                        <View style={styles.meetingDetails.interiorRow}>
                            <View style={styles.meetingDetails.costContainer}>
                                <Text style={styles.meetingDetails.costTitle}>
                                    Total Time Cost
                                </Text>
                            </View>
                            <View style={styles.meetingDetails.timeContainer}>
                                <Text style={styles.meetingDetails.timeTitle}>
                                    Total Time Spent 
                                </Text>
                            </View>
                        </View>
                        <View style={styles.meetingDetails.interiorRow}>
                            <View style={[styles.meetingDetails.costContainer, styles.meetingDetails.valueBottom]}>
                                <Text style={styles.meetingDetails.costValue}>
                                    {costB}
                                </Text>
                            </View>
                            <View style={[styles.meetingDetails.timeContainer, styles.meetingDetails.valueBottom]}>
                                <Text style={styles.meetingDetails.timeValue}>
                                    {TimerValueB}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/*---------------------------------------------------------------------------------*/}
                    <View style={[styles.meetingDetails.overViewView,{backgroundColor:colors.oxfordBlue,overflow:"visible"}]}>
                        <View style={styles.meetingDetails.interiorRow}>
                            <TouchableOpacity activeOpacity={1}  onPress={() => participantsInputRef.current?.focus()} style={[styles.meetingDetails.statContainer,styles.meetingDetails.statContainerTopLeft]}>
                                <Text style={styles.meetingDetails.statTitle}>
                                    Number Of Participants
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => hourlyRateInputRef.current?.focus()} style={[styles.meetingDetails.statContainer,styles.meetingDetails.statContainerTopRight]}>
                                <Text style={styles.meetingDetails.statTitle}>
                                    Total Time Spent 
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.meetingDetails.interiorRow}>
                            <TouchableOpacity activeOpacity={1}  onPress={() => participantsInputRef.current?.focus()} style={[styles.meetingDetails.statContainer,styles.meetingDetails.statContainerBottomLeft]}>
                                <TextInput
                                    ref={participantsInputRef}
                                    style={[ styles.meetingDetails.statValue]}
                                    placeholder="Enter rate"
                                    value={participantsEntry}
                                    onChangeText={(x)=>{if(+x>0){setParticipants(+x);}setParticipantsEntry(x);}}
                                    keyboardType="numeric"
                                    editable={!isCounting && !isPastMeeting}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1}  onPress={() => hourlyRateInputRef.current?.focus()} style={[styles.meetingDetails.statContainer,styles.meetingDetails.statContainerBottomRight]}>
                                <TextInput
                                    ref={hourlyRateInputRef}
                                    style={[ styles.meetingDetails.statValue]}
                                    placeholder="Enter rate"
                                    value={"$"+rateEntry}
                                    onChangeText={(x)=>{
                                        const val = x.replace(/[^0-9.]/g, '')
                                        if(+val>0){setRate(+val);}setRateEntry(val);
                                    }}
                                    keyboardType="numeric"
                                    editable={!isCounting && !isPastMeeting}
                                    onBlur={()=>{
                                        const val = rateEntry.replace(/[^0-9.]/g, '')
                                        setRateEntry(""+(+val).toFixed(2))
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*
                    <View style={{flexDirection:"row",flex:0,marginHorizontal:15,}}>
                        <View style={[styles.meetingDetails.overViewView, styles.meetingDetails.statContainerTop]}>
                            <Text style={styles.meetingDetails.statTitle}>
                                Number of Participants
                            </Text>
                        </View>
                        <View style={[styles.meetingDetails.overViewView, styles.meetingDetails.statContainerTop]}>
                            <Text style={styles.meetingDetails.statTitle}>
                                Average Hourly Rate
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginHorizontal:15,}}>
                        <View style={[styles.meetingDetails.overViewView, styles.meetingDetails.statContainerBottom]}>
                            <TextInput
                                style={[ styles.meetingDetails.statValue]}
                                placeholder="Enter rate"
                                value={participantsEntry}
                                onChangeText={(x)=>{if(+x>0){setParticipants(+x);}setParticipantsEntry(x);}}
                                keyboardType="numeric"
                                editable={!isCounting && !isPastMeeting}
                            />
                        </View>
                        <View style={[styles.meetingDetails.overViewView, styles.meetingDetails.statContainerBottom]}>
                            <TextInput
                                style={[ styles.meetingDetails.statValue]}
                                placeholder="Enter rate"
                                value={rateEntry}
                                onChangeText={(x)=>{if(+x>0){setRate(+x);}setRateEntry(x);}}
                                keyboardType="numeric"
                                editable={!isCounting && !isPastMeeting}
                            />
                        </View>
                    </View>*/}
                    
                </KeyboardAvoidingView>
                <View style={{flex:1, flexDirection:"column-reverse", marginBottom:0,}}>
                    {
                    !isCounting ? 
                    <View>
                        {startButton}
                    </View>
                    :
                    <View>
                        <TouchableOpacity style={[styles.meetingDetails.button, styles.meetingDetails.pauseIdleButton]} onPress={handleIdlePause}>
                            <Text style={styles.meetingDetails.buttonText}>
                                {isIdle ? 'Pause Idle Time': 'Resume Idle Time'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.meetingDetails.button, styles.meetingDetails.endMeetingButton]} onPress={handleEndMeeting}>
                            <Text style={[styles.meetingDetails.buttonText, styles.meetingDetails.TextWhite]}>
                                End Meeting
                            </Text>
                        </TouchableOpacity>
                    </View>
                    }
                    
                </View>
            </View>
        </ScrollView>
    );
}