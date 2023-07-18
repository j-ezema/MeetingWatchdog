import { View, Image, Text } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from '../assets/Styles';





export const LogoReturnHeaderLeft = (props:{ name:String, navigation: any }) => {

    const returnHome = () => {
        props.navigation.navigate('Home')
    };

    return (
    <View style={styles.Headers.overallView}>
        <Icon type="material" name="arrow-back" color="white" onPress={returnHome} size={30} />
        <Image source={require('../assets/images/logo.png')} style={styles.Headers.logoImageRighter}/>
        <Text style={styles.Headers.titleText}>{props.name}</Text>
    </View>
    );
}

export const SettingsHeaderLeft = (props:{ name:String, navigation: any }) => {

    const returnSettings = () => {
        props.navigation.navigate('Settings')
    };

    return (
    <View style={styles.Headers.overallView}>
        <Icon type="material" name="arrow-back" color="white" onPress={returnSettings} size={30} />
        <Image source={require('../assets/images/logo.png')} style={styles.Headers.logoImageRighter}/>
        <Text style={styles.Headers.titleText}>{props.name}</Text>
    </View>
    );
}

export const CancelHeaderLeft = (props:{ name:String}) => {
    return (
    <View style={styles.Headers.overallView}>
        <Text style={styles.Headers.titleText}>{props.name}</Text>
    </View>
    );
}
export const CancelHeaderRight = ({navigation}:{navigation: any }) => {

    const returnHome = () => {
        navigation.navigate('Home')
    };

    return (
    <View style={styles.Headers.overallView}>
        <Icon type="material" name="close" color="white" onPress={returnHome} size={30}/>
    </View>
    );
}

export const HomeHeaderLeft = () => {

    return (
    <View style={styles.Headers.overallView}>
        <Image source={require('../assets/images/logo.png')} style={styles.Headers.logoImage}/>
        <Text style={styles.Headers.titleText}>Home</Text>
    </View>
    );
}

export const AboutHeaderLeft = (props:{ name:String, navigation: any }) => {

    const returnAbout = () => {
        props.navigation.navigate('Home')
    };

    return (
    <View style={styles.Headers.overallView}>
        <Icon type="material" name="arrow-back" color="white" onPress={returnAbout} size={30} />
        <Image source={require('../assets/images/logo.png')} style={styles.Headers.logoImageRighter}/>
        <Text style={styles.Headers.titleText}>{props.name}</Text>
    </View>
    );
}