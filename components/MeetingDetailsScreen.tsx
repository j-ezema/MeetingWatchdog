import { useCallback, useState } from "react";
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
    //const [meetings, setMeetings] = useState<MeetingItem[]>([]);
    const { meetingID, otherParam } = route.params;
    const [meeting, setMeeting] = useState(createNewMeetingItem());
    const [rate, setRate] = useState(100);// idle time
    const [participants, setParticipants] = useState(5);// total time
    const [timerA, setTimerA] = useState(0);// idle time
    const [timerB, setTimerB] = useState(0);// total time
    const [TimerValueA, setTimerValueA] = useState(moment("2015-01-01").startOf('day').seconds(timerA).format('HH:mm:ss'));
    const [TimerValueB, setTimerValueB] = useState(moment("2015-01-01").startOf('day').seconds(timerB).format('HH:mm:ss'));
    const [costA, setCostA] = useState('$'+Number(rate*timerA/3600*participants).toFixed(2));
    const [costB, setCostB] = useState('$'+Number(rate*timerB/3600*participants).toFixed(2));
    const [isCounting, setIsCounting] = useState(false);
    const [isIdle, setIsIdle] = useState(true);
    const [pointInitial, setPointInitial] = useState(moment.now);// total time
    const [pointResume, setPointResume] = useState(moment.now);// total time
    const [baseIdle, setBaseIdle] = useState(0);// total time
    const [isPastMeeting, setIsPastMeeting] = useState(true);// total time

    const loadDataCallback = useCallback(async () => {
        const db = await getDBConnection();
        let meetingTemp = await getMeetingItem(db, meetingID);
        setMeeting(meetingTemp)
        
        //console.log(">>>>");
        //console.log(meetingTemp);
        setRate(meetingTemp.average_hourly_cost);
        setParticipants(meetingTemp.number_of_participants);
        if(meetingTemp.id != -1 ){
            if(meetingTemp.total_meeting_time == null){
                setIsPastMeeting(false);
            }
            else{
                setTimerA(meetingTemp.total_wait_time);
                setTimerB(meetingTemp.total_meeting_time);
                setCostA('$'+meetingTemp.total_wait_cost.toFixed(2));
                setCostB('$'+meetingTemp.total_meeting_cost.toFixed(2));
                setTimerValueA(moment("2015-01-01").startOf('day').seconds(meetingTemp.total_wait_time).format('HH:mm:ss'))
                setTimerValueB(moment("2015-01-01").startOf('day').seconds(meetingTemp.total_meeting_time).format('HH:mm:ss'))
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
            
            if(isIdle){
                setTimerValueA(moment("2023-01-01").startOf('day').milliseconds(timerA).format('HH:mm:ss'));
                setCostA('$'+Number(rate*timerA/3600/1000*participants).toFixed(2));
                meeting.total_wait_cost = rate*timerA/3600/1000*participants;
                meeting.total_wait_time = Math.round(timerA/1000);
            }
            setTimerValueB(moment("2015-01-01").startOf('day').milliseconds(timerB).format('HH:mm:ss'));
            setCostB('$'+Number(rate*timerB/3600/1000*participants).toFixed(2));
            meeting.total_meeting_cost = rate*timerB/3600/1000*participants;
            meeting.total_meeting_time = Math.round(timerB/1000);
        }
    }, [timerA, timerB]);//*/
    
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

    const windowHeight = Dimensions.get('window').height-100;
    
    let startButton;
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
    //

    return (
        <ScrollView style={{flex:1,backgroundColor:colors.oxfordBlue}}>
            <View style={{width:'100%', height:windowHeight }}>
                <KeyboardAvoidingView style={{flex:1, paddingTop:30}}>
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
                    <View style={{flex:1, flexDirection:"row"}}>
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
                            <View style={styles.meetingDetails.costContainer}>
                                <Text style={styles.meetingDetails.timeValue}>
                                    {costA}
                                </Text>
                            </View>
                            <View style={styles.meetingDetails.timeContainer}>
                                <Text style={styles.meetingDetails.timeValue}>
                                    {TimerValueA}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.meetingDetails.overViewView}>
                        <View style={{flex:1, flexDirection:"row"}}>
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
                            <View style={styles.meetingDetails.costContainer}>
                                <Text style={styles.meetingDetails.timeValue}>
                                    {costB}
                                </Text>
                            </View>
                            <View style={styles.meetingDetails.timeContainer}>
                                <Text style={styles.meetingDetails.timeValue}>
                                    {TimerValueB}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,}}>
                        <View style={[styles.meetingDetails.overViewView, styles.meetingDetails.statContainerLeft]}>
                            <Text numberOfLines={1} style={styles.meetingDetails.statTitle}>
                                Number Of Participants
                            </Text>
                            <Text style={styles.meetingDetails.statValue}>
                                {participants}
                            </Text>
                            <TextInput
                                    style={styles.createMeeting.inputText}
                                    placeholder="Enter rate"
                                    value={""+participants}
                                    onChangeText={(x)=>{}}
                                    keyboardType="numeric"
                            />
                        </View>
                        <View style={[styles.meetingDetails.overViewView, styles.meetingDetails.statContainerRight]}>
                            <Text numberOfLines={1} style={styles.meetingDetails.statTitle}>
                                Average Hourly Rate
                            </Text>
                            <Text style={styles.meetingDetails.statValue}>
                                ${rate}
                            </Text>
                        </View>
                    </View>
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

