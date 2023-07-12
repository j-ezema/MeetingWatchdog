import { useState } from "react";
import { MeetingItem } from "../models";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { colors, styles } from "../assets/Styles";





export const MeetingDetailsScreen = ({ navigation }: { navigation: any }) => {
    //const [meetings, setMeetings] = useState<MeetingItem[]>([]);

    const handleCancel = () => {
        navigation.navigate('Home');
    };



    return (
        <View style={{flex:1,backgroundColor:colors.oxfordBlue}}>
            
        </View>
    );
}