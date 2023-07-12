import { View, Image, Text } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from '../assets/Styles';





export const DetailsHeaderLeft = ({ navigation }: { navigation: any }) => {

    const returnHome = () => {
        navigation.navigate('Home')
    };

    return (
    <View style={styles.Headers.overallView}>
        <Icon type="material" name="arrow-back" color="white" onPress={returnHome} size={30}/>
        <Image source={require('../assets/images/logo.png')} style={styles.Headers.logoImage}/>
        <Text style={styles.Headers.titleText}>Meeting Details</Text>
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