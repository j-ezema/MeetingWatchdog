import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from "../assets/Styles";
import { max } from 'moment';



export const NumericTextEntry = ({value = "", setValue= (x:string)=>{},  minValue = 1, maxValue = 1000, title="Number of Participants"}) =>{

    //const [value, setValue] = useState('');

    const enterValue = (x:string) =>{
        if(x.trim().length < 1){
            setValue(x);
        }else{
            const parsed = parseInt(x);
            if(parsed){
                if(parsed > maxValue){
                    setValue(""+maxValue);
                }else if(parsed < 1){
                    setValue(""+minValue);
                }else{
                    setValue(""+parsed);
                }
            }
        }
    }

    return(
        <View style={[styles.createMeeting.textButton, styles.createMeeting.buttonWithBorder]}>
            <Text style={styles.createMeeting.buttonText}>{title}</Text>
            <TextInput
                style={styles.createMeeting.inputText}
                placeholder="Enter number"
                value={value}
                onChangeText={enterValue}
                keyboardType="numeric"
            />
        </View>
    );
}

