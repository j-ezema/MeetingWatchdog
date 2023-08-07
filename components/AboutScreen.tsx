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
                <TouchableOpacity style={styles.about.textButtonContainer} onPress={handleDeveloper}>
                    <View style={[styles.about.textButton, activeButtonIndex === 0 && { backgroundColor: '#D6AD60' }]}>
                        <Text style={styles.about.buttonText}>Developer</Text>
                        <Text style={styles.about.inputText}>2023 Carbon Edge Corporation</Text>
                    </View>
                    <Image source={require('../assets/next_arrow.png')} style={[deviceSizeCategory === 'small' && styles.about.developerSmall, deviceSizeCategory === 'medium' && styles.about.developerMedium, deviceSizeCategory === 'large' && styles.about.developerLarge]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.about.textButton}>
                    <Text style={styles.about.buttonText}>App Version</Text>
                    <Text style={styles.about.inputText}>00.0.0000.001</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.createMeeting.textButton, activeButtonIndex === 1 && { backgroundColor: '#D6AD60' }]}
                    onPress={handlePrivacy}
                >
                    <View style={styles.about.accessibility}>
                        <Text style={styles.about.title}>Privacy Policy</Text>
                        <Image source={require('../assets/next_arrow.png')} style={[deviceSizeCategory === 'small' && styles.about.privacySmall, deviceSizeCategory === 'medium' && styles.about.privacyMedium, deviceSizeCategory === 'large' && styles.about.privacyLarge]} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.createMeeting.textButton, activeButtonIndex === 2 && { backgroundColor: '#D6AD60' }]}
                    onPress={handleTerms}
                >
                    <View style={styles.about.accessibility}>
                        <Text style={styles.about.title}>Terms And Conditions</Text>
                        <Image source={require('../assets/next_arrow.png')} style={[deviceSizeCategory === 'small' && styles.about.termsSmall, deviceSizeCategory === 'medium' && styles.about.termsMedium, deviceSizeCategory === 'large' && styles.about.termsLarge]} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.createMeeting.textButton, activeButtonIndex === 3 && { backgroundColor: '#D6AD60' }]}
                    onPress={handleCopyright}
                >
                    <View style={styles.about.accessibility}>
                        <Text style={styles.about.title}>Copyright</Text>
                        <Image source={require('../assets/next_arrow.png')} style={[deviceSizeCategory === 'small' && styles.about.copyrightSmall, deviceSizeCategory === 'medium' && styles.about.copyrightMedium, deviceSizeCategory === 'large' && styles.about.copyrightLarge]} />
                    </View>
                </TouchableOpacity>


            </View>
        </View>

    )
}
export default AboutScreen;