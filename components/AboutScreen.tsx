import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Linking,
    Dimensions,
} from 'react-native';
import { styles } from "../assets/Styles";
import { Icon } from 'react-native-elements';

export const AboutScreen = ({ navigation }: { navigation: any }) => {

    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);

    // Get the screen width using Dimensions
    const screenWidth = Dimensions.get('window').width;

    // Define your breakpoints
    const SMALL_DEVICE_WIDTH = 390;
    const MEDIUM_DEVICE_WIDTH = 410;

    // Determine the device size category based on screen width
    let deviceSizeCategory = 'large'; // Default to large
    if (screenWidth < SMALL_DEVICE_WIDTH) {
        deviceSizeCategory = 'small';
    } else if (screenWidth < MEDIUM_DEVICE_WIDTH) {
        deviceSizeCategory = 'medium';
    }



    const handleDeveloper = () => {
        Linking.openURL('https://www.carbonedge.com/meeting-watchdog');
        setActiveButtonIndex(0);
    };

    const handlePrivacy = () => {
        Linking.openURL('https://www.carbonedge.com/watchdog-privacy-policy');
        setActiveButtonIndex(1);
    };

    const handleTerms = () => {
        Linking.openURL('https://www.carbonedge.com/meeting-watchdog-terms-and-conditions');
        setActiveButtonIndex(2);
    };

    const handleCopyright = () => {
        Linking.openURL('https://www.carbonedge.com/meeting-watchdog-copyright');
        setActiveButtonIndex(3);
    };



    return (
        <View style={styles.about.container}>
            {/*
            <View style={styles.settings.header}>
                <TouchableOpacity style={styles.settings.back} onPress={handleBack}>
                    <Image source={require('../assets/back.png')} style={styles.settings.back} />
                </TouchableOpacity>
                <Image source={require('../assets/logo_01.png')} style={styles.settings.logo} />
                <Text style={styles.settings.headerText}>Settings</Text>
            </View>
            */}
            <View style={styles.createMeeting.buttonsContainer}>
                <TouchableOpacity style={styles.about.textButton} onPress={handleDeveloper}>
                    <View style={styles.about.accessibility}>
                        <Icon iconStyle={styles.about.icon} type="material" name="chevron-right" color="black" />
                        <View style={{flex:1,flexDirection:'column'}}>
                            <Text style={styles.about.buttonText}>Developer</Text>
                            <Text style={styles.about.inputText}>2023 Carbon Edge Corporation</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.about.textButton}>
                    <Text style={styles.about.buttonText}>App Version</Text>
                    <Text style={styles.about.inputText}>00.0.0000.001</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.about.textButton]}
                    onPress={handlePrivacy}
                >
                    <View style={styles.about.accessibility}>
                        <Icon iconStyle={styles.about.icon} type="material" name="chevron-right" color="black" />
                        <Text style={styles.about.title}>Privacy Policy</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.about.textButton]}
                    onPress={handleTerms}
                >
                    <View style={styles.about.accessibility}>
                        <Icon iconStyle={styles.about.icon} type="material" name="chevron-right" color="black" />
                        <Text style={styles.about.title}>Terms And Conditions</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.about.textButton]}
                    onPress={handleCopyright}
                >
                    <View style={styles.about.accessibility}>
                        <Icon iconStyle={styles.about.icon} type="material" name="chevron-right" color="black" />
                        <Text style={styles.about.title}>Copyright</Text>
                    </View>
                </TouchableOpacity>


            </View>
        </View>

    )
}
export default AboutScreen;