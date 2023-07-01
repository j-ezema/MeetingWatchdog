import { StyleSheet } from "react-native";
import { MeetingItem } from '../models/index';
import { color } from "@rneui/base";
import CreateMeetingScreen from "../components/CreateMeetingScreen";

export const colors = {
  'royalBlue': '#152B61',
  'white': '#FFFFFF',
  'gold': '#D6AD60',
  'oxfordBlue': '#0A1128',
  'steelBlue': '#4D7EA8',
  'richBlack': '#040F21',
  'black': '#000000',
  'alertRed': '#a92b4e',
  'gray': '#EFEFEF'
  //'alertRed': '#CE2030CC',


}

export const styles = {
  'homeScreen': StyleSheet.create({
    floatingButton: {
      position: 'absolute',
      right: 40,
      bottom: 40,
    },


    header: {
      paddingTop: 10, // Adds top padding
      paddingHorizontal: 20,
      height: 70,
      backgroundColor: '#0A1128', // Sets the background color
      flexDirection: 'row', // Add this line to make the content align horizontally
      alignItems: 'center', // Add this line to vertically align the content
    },

    headerText: {
      fontSize: 18, // Sets the font size
      color: '#ffffff', // Sets the text color
      fontFamily: 'Montserrat-ExtraBold', // Sets the font family
      marginLeft: 8,
    },
    logo: {
      resizeMode: 'contain',
      width: 60,
      height: 60,
    },
    cancelButtonImage: {
      width: 40,
      height: 40,
      alignSelf: 'center',
      tintColor: '#ffffff',
      marginTop: 17,
    },
    cancelButtonContainer: {
      padding: 10, // Increase the padding to increase the clickable area
      position: 'absolute',
      right: 6,
      top: -5,
      marginRight: -10,
    },

    background: {
      height: "100%",
      backgroundColor: colors.oxfordBlue,
    },
    button: {
      flex: 1,
      height: 50,
      width: '100%', // Sets the width to 100% of the container
      borderRadius: 10, // Sets the border radius
      justifyContent: 'center', // Centers content vertically
      alignItems: 'center', // Aligns text to the left
      flexDirection: 'row',
      marginBottom: 0.5,
    },
    buttonsContainer: {
      marginTop: 20,
      paddingHorizontal: 16, // Adds horizontal padding
      flexDirection: 'row',
    },
    buttonWithBorder: {
      borderColor: '#ffffff', // Sets the border color
      borderWidth: 1, // Sets the border width
    },
    innerButton: {
      flex: 1, // Distribute the available space evenly among child buttons
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#D6AD60',
    },
    upcomingText: {
      color: '#0A1128', // Sets the text color
      fontFamily: 'OpenSans-Bold', // Sets the font family
      fontSize: 14, // Sets the font size
    },
    textBorder: {

      borderColor: '#0A1128',
      borderWidth: 1.3,
      borderRadius: 8, // Sets the border radius
      marginLeft: 25,
      width: 30,
      height: 30,
      alignItems: 'center',
    },
    pastTextBorder: {

      borderColor: '#ffffff',
      borderWidth: 1.3,
      borderRadius: 8, // Sets the border radius
      marginLeft: 25,
      width: 30,
      height: 30,
      alignItems: 'center',
    },
    pastCount: {
      color: '#ffffff', // Sets the text color
      fontFamily: 'OpenSans-Bold', // Sets the font family
      fontSize: 14, // Sets the font size
      marginTop: 3.5,
    },
    container: {
      backgroundColor: '#0A1128', // Sets the background color
      paddingVertical: 20, // Adds vertical padding
    },

    content: {
      borderTopWidth: 0.5, // Adds a top border
      borderTopColor: '#EFEFEF', // Sets the color of the top border
    },
    pastText: {
      color: '#ffffff', // Sets the text color
      fontFamily: 'OpenSans-Bold', // Sets the font family
      fontSize: 14, // Sets the font size
      alignItems: 'center', // Aligns text to the left
      marginLeft: 15,
    },
    rightInnerButton: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: '#0A1128',
      borderColor: '#efefef',
    },
    leftInnerButton: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    count: {
      color: '#0A1128', // Sets the text color
      fontFamily: 'OpenSans-Bold', // Sets the font family
      fontSize: 14, // Sets the font size
      marginTop: 3.5,
    },
    message: {
      flex: 1,
      height: 350,
      width: '100%', // Sets the width to 100% of the container
      borderRadius: 10, // Sets the border radius
      justifyContent: 'center', // Centers content vertically
      alignItems: 'center', // Aligns text to the left
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      marginTop: 20,
    },
    welcomeText: {
      color: '#040F21', // Sets the text color
      fontFamily: 'Montserrat-ExtraBold', // Sets the font family
      fontSize: 30, // Sets the font size
      marginBottom: 15, // Adds top margin
    },

    toText: {
      color: '#040F21', // Sets the text color
      fontFamily: 'Montserrat-ExtraBold', // Sets the font family
      fontSize: 15, // Sets the font size
      marginBottom: 15, // Adds top margin
    },
    messageWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    mwText: {
      color: '#040F21', // Sets the text color
      fontFamily: 'Montserrat-ExtraBold', // Sets the font family
      fontSize: 28, // Sets the font size
      marginBottom: 50, // Adds top margin
    },
    selectText: {
      color: '#040F21', // Sets the text color
      fontFamily: 'OpenSans-Regular', // Sets the font family
      fontSize: 17, // Sets the font size
      marginBottom: 3, // Adds top margin
    },
    selectTextB: {
      color: '#040F21', // Sets the text color
      fontFamily: 'OpenSans-Regular', // Sets the font family
      fontSize: 17, // Sets the font size
      marginBottom: 15, // Adds top margin
    },
    footer: {
      flexDirection: 'row', // Sets the direction of items in the container to horizontal
    },

    footerContainer: {
      flex: 1,
    },

    optionContainer: {
      marginTop: 45,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      
    },
    menu: {
      marginHorizontal: 0,
      
      //backgroundColor: colors.steelBlue,
      //margin: 0,
    },


    footerButtonContainer: {
      flex: 1, // Takes up the available space
      alignItems: 'center', // Centers content horizontally
      marginLeft: 265,
      marginTop: 60,

    },

    plus: {
      resizeMode: 'contain',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginLeft: 18,
      tintColor: '#0A1128',
    },

    optionsText: {
      color: '#0A1128', // Sets the text color
      fontFamily: 'OpenSans-Regular', // Sets the font family
      fontSize: 13, // Sets the font size
    },
    optionsTextB: {
      color: '#0A1128', // Sets the text color
      fontFamily: 'OpenSans-Semibold', // Sets the font family
      fontSize: 13, // Sets the font size
    },

    footerButton: {
      height: 100, // Sets the height of the button
      backgroundColor: colors.white, // Sets the background color of the button
      borderRadius: 50, // Sets the border radius of the button
      width: 100, // Sets the width of the button
    },
    footerButtonText: {
      color: '#ffffff', // Sets the text color
      fontFamily: 'OpenSans-Semibold', // Sets the font family
      fontSize: 50, // Sets the font size
    },

    footerBorder: {
      borderColor: '#ffffff', // Sets the border color
      borderWidth: 2, // Sets the border width
    },
    textButton: {
      marginBottom: 20, // Adds bottom margin
      width: '100%', // Sets the width to 100% of the container
      height: 50, // Sets the height of the button
      backgroundColor: '#ffffff', // Sets the background color of the button
      justifyContent: 'center', // Centers content vertically
      alignItems: 'center', // Aligns text to the left
    },
  }),
  'meetingItem': StyleSheet.create({
    //Meeting View Cards
    sectionContainer: {
      flexDirection: 'column',
      alignSelf: 'stretch',
      marginLeft: 0,
      flex: 1,
      paddingRight: 0
    },
    iconWrapper: {
      margin: 0,
      display: "flex",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

    },
    icon: {
      fontSize: 30,
    },
    iconText: {
      color: colors.white,
      fontFamily: 'OpenSans-Bold',
    },
    slideView: {
      backgroundColor: colors.alertRed,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      width: 50,
      height: '100%',

      alignSelf: 'flex-end',
      overflow: 'hidden',
    },
    cardOuter: {
      borderRadius: 15,
      marginRight: 15,
      marginLeft: 15,
      marginBottom: 30,
      marginTop: 10,
      backgroundColor: colors.white,
      height: 100,
      overflow: 'hidden',
    },
    cardTitle: {
      textAlign: 'left',
      fontSize: 25,
      fontFamily: 'OpenSans-Bold',
      color: colors.oxfordBlue,
      //fontWeight: "700",
    },
    dateText: {
      textAlign: 'left',
      paddingLeft: 2,
      verticalAlign: 'middle',
      color: colors.richBlack,
      fontSize: 16,
      fontFamily: 'OpenSans-Regular'
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    thinBlueLine: {
      marginTop: 0,
      height: 7.5,
      backgroundColor: colors.steelBlue,
    },
  }),

  'createMeeting': StyleSheet.create({
    container: {
      flex: 1, // Takes up the entire available space
      backgroundColor: '#0A1128', // Sets the background color
      paddingVertical: 20, // Adds vertical padding
    },

    content: {
      flex: 1,
      borderTopWidth: 0.5, // Adds a top border
      borderTopColor: '#EFEFEF', // Sets the color of the top border
    },

    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    modal: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 40,
      alignItems: 'center',
      alignSelf: 'center',
    },
    modalButton: {
      flex: 1,
      marginHorizontal: 10,
    },
    cancelModalButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#152B61',
    },
    cancelModalButtonText: {
      color: '#152B61',
    },
    header: {
      paddingTop: 10, // Adds top padding
      paddingBottom: 30, // Adds bottom padding
      paddingHorizontal: 20,
      height: 70,
      backgroundColor: '#0A1128', // Sets the background color
      flexDirection: 'row', // Add this line to make the content align horizontally
      alignItems: 'center', // Add this line to vertically align the content
    },
    headerText: {
      fontSize: 21, // Sets the font size
      color: '#ffffff', // Sets the text color
      fontFamily: 'OpenSans-Bold', // Sets the font family
    },
    cancelButtonImage: {
      width: 40,
      height: 40,
      alignSelf: 'center',
      tintColor: '#ffffff',
    },
    cancelButtonContainer: {
      padding: 10, // Increase the padding to increase the clickable area
      position: 'absolute',
      right: 6,
      top: -5,
      marginRight: -10,
    },

    buttonsContainer: {
      paddingTop: 20, // Add top padding
      paddingBottom: 20, // Add bottom padding
      paddingHorizontal: 16, // Adds horizontal padding
      justifyContent: 'center', // Centers content vertically
    },
    dateButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateButtonIcon: {
      marginRight: 5,
      width: 20, // Adjust the width to your preference
      height: 20,
      tintColor: '#152B61', // Adjust the height to your preference
    },
    dateButtonTitle: {
      color: '#040F21',
      fontFamily: 'OpenSans-Semibold',
      fontSize: 13,
      textAlign: 'left',
      alignSelf: 'flex-start',
      marginLeft: 10,
      marginTop: 7,
    },
    dateButtonText: {
      color: '#040F21',
      fontFamily: 'OpenSans-Regular',
      fontSize: 17,
      textAlign: 'left',
      alignSelf: 'flex-start',
      marginLeft: 10, // Adjust the margin to your preference
      marginTop: -1,
    },
    button: {
      marginBottom: 20, // Adds bottom margin (spacing between buttons)
      height: 70,
      width: '100%', // Sets the width to 100% of the container
      borderRadius: 10, // Sets the border radius
      backgroundColor: '#ffffff', // Sets the background color of the button
      justifyContent: 'center', // Centers content vertically
      alignItems: 'flex-start', // Aligns text to the left
      flexDirection: 'column',
      paddingLeft: 16, // Adds left padding for text
      paddingVertical: 7,
    },
    buttonWithBorder: {
      borderColor: '#4D7EA8', // Sets the border color
      borderWidth: 2, // Sets the border width
    },
    textButton: {
      marginBottom: 20, // Adds bottom margin
      width: '100%', // Sets the width to 100% of the container
      height: 70, // Sets the height of the button
      borderRadius: 10, // Sets the border radius
      backgroundColor: '#ffffff', // Sets the background color of the button
      justifyContent: 'center', // Centers content vertically
      alignItems: 'flex-start', // Aligns text to the left
      paddingLeft: 16, // Adds left padding for text
    },
    buttonText: {
      color: '#040F21', // Sets the text color
      fontFamily: 'OpenSans-Semibold', // Sets the font family
      fontSize: 13, // Sets the font size
      textAlign: 'left', // Aligns text to the left
      alignSelf: 'flex-start', // Aligns text to the left within the button
      marginLeft: 10, // Adds left margin
      marginTop: 15, // Adds top margin
    },
    inputText: {
      color: '#040F21', // Sets the text color
      fontFamily: 'OpenSans', // Sets the font family
      fontSize: 17, // Sets the font size
      paddingHorizontal: 10, // Adds horizontal padding
      marginTop: -13, // Adjusts the position
    },
    datePickerContainer: {
      flexDirection: 'row', // Sets the direction of items in the container to horizontal
      alignItems: 'center', // Aligns items vertically in the center
      marginBottom: 20, // Adds bottom margin to the container
      justifyContent: 'center',
    },

    datePickerButton: {
      marginLeft: 10, // Adds left margin to the button
    },

    footer: {
      flexDirection: 'row', // Sets the direction of items in the container to horizontal
    },

    footerContainer: {
      borderTopWidth: 0.5, // Adds a top border
      borderTopColor: '#EFEFEF', // Sets the color of the top border
      left: 0,
      right: 0,
      bottom: 0,
      paddingTop: 20,
    },

    footerButtonContainer: {
      flex: 1, // Takes up the available space
      alignItems: 'center', // Centers content horizontally

    },

    footerButton: {
      height: 62, // Sets the height of the button
      backgroundColor: '#ffffff', // Sets the background color of the button
      borderRadius: 10, // Sets the border radius of the button
      width: 160, // Sets the width of the button
    },

    footerButtonText: {
      color: '#ffffff', // Sets the text color
      fontFamily: 'OpenSans-Semibold', // Sets the font family
      fontSize: 17, // Sets the font size
    },

    footerButtonTextB: {
      color: '#040F21', // Sets the text color
      fontFamily: 'OpenSans-Semibold', // Sets the font family
      fontSize: 17, // Sets the font size
    },

    startButton: {
      backgroundColor: '#152B61', // Sets the background color of the button
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      marginTop: 20,
      color: '#152B61'
    },

    footerBorder: {
      borderColor: '#ffffff', // Sets the border color
      borderWidth: 2, // Sets the border width
    },

    footerButtonContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),

};