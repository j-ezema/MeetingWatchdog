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
    floatingButtonContainer: {
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
    floatingButton: {
      borderWidth: 0.5,
      borderRadius: 100,
      backgroundColor: "#FFFFFF",
      borderColor: colors.oxfordBlue
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
    settings: {
      width: 40,
      height: 40,
      alignSelf: 'center',
      tintColor: '#ffffff',
      marginTop: 17,

    },
    settingContent: {
      flexDirection: 'row',
      justifyContent: 'center', // Centers content vertically
      alignItems: 'center', // Aligns text to the left
      borderRadius: 10,
    },
    settingsContainer: {
      padding: 10, // Increase the padding to increase the clickable area
      position: 'absolute',
      right: 6,
      top: -5,
      marginRight: -10,


    },
    icon: {
      fontSize: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 62,

    },
    iconB: {
      fontSize: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 50,

    },

    iconC: {
      fontSize: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 2,

    },


    settingsContainerB: {
      flex: 1,
      padding: 10, // Increase the padding to increase the clickable area
      position: 'absolute',
      right: 40,
      top: 5,
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
      position: 'relative',
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
      //backgroundColor: colors.oxfordBlue,
    },

    container: {
      backgroundColor: '#0A1128', // Sets the background color
      paddingVertical: 10, // Adds vertical padding
    },

    content: {
      flex: 1,
      //borderTopWidth: 0.8, // Adds a top border
      //borderTopColor: '#EFEFEF', // Sets the color of the top border
    },
    upcomingText: {
      color: '#0A1128', // Sets the text color
      fontFamily: 'OpenSans-Bold', // Sets the font family
      fontSize: 14, // Sets the font size
    },
    pastText: {
      color: '#ffffff', // Sets the text color
      fontFamily: 'OpenSans-Bold', // Sets the font family
      fontSize: 14, // Sets the font size
      //alignItems: 'center', // Aligns text to the left
      marginLeft: 15,
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
    count: {
      color: '#0A1128', // Sets the text color
      fontFamily: 'OpenSans-Bold', // Sets the font family
      fontSize: 14, // Sets the font size
      marginTop: 3.5,
    },
    viewingColor: {
      borderColor: colors.oxfordBlue,
      color: colors.oxfordBlue,
    },
    notViewingColor: {
      borderColor: colors.white,
      color: colors.white,
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

    rightInnerButton: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      marginBottom: -1,
      marginRight: -1,
      marginTop: -1,
    },
    leftInnerButton: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      marginBottom: -1,
      marginLeft: -1,
      marginTop: -1,
    },
    viewingInnerButton: {
      backgroundColor: colors.gold,
      //color: '#0A1128', // Sets the text color
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
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingTop: 20,
      paddingBottom: 20,
    },
    optionContainer: {
      backgroundColor: colors.white,
      left: 0,
      right: 0,
      //bottom: -9,
      bottom: 0,
      margin: 0,
    },
    optionButton: {
      height: 50,
      width: '100%', // Sets the width to 100% of the container
      justifyContent: 'center', // Centers content vertically
      alignItems: 'center', // Aligns text to the left
      flexDirection: 'row',
      //marginBottom: 0.5,
      backgroundColor: colors.white,

    },
    settingsButton: {
      height: 35,
      width: 170, // Sets the width to 100% of the container
      justifyContent: 'flex-start', // Centers content vertically
      alignItems: 'flex-start', // Aligns text to the left
      flexDirection: 'row',
      //marginBottom: 0.5,
      backgroundColor: colors.white,



    },
    textButton: {
      width: '100%', // Sets the width to 100% of the container
      height: 50, // Sets the height of the button
      backgroundColor: '#ffffff', // Sets the background color of the button
      justifyContent: 'center', // Centers content vertically
      alignItems: 'center', // Aligns text to the left
      borderTopWidth: 0.5
    },
    settingsTextButton: {
      width: '100%', // Sets the width to 100% of the container
      height: 35, // Sets the height of the button
      backgroundColor: '#ffffff', // Sets the background color of the button
      justifyContent: 'flex-start', // Centers content vertically
      alignItems: 'flex-start', // Aligns text to the left


      borderTopWidth: 0.5,

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

    settingsText: {
      color: '#0A1128', // Sets the text color
      fontFamily: 'OpenSans-Regular', // Sets the font family
      fontSize: 14, // Sets the font size
      marginLeft: 20,
    },
    cardsContainer: {
      flex: 1,
      paddingTop: 20,

    },
    menu: {
      marginHorizontal: 0,
      flex: 1,
      //backgroundColor: colors.steelBlue,
      //margin: 0,
    },



    footerButtonContainer: {
      flex: 1,
      alignItems: 'center', // Centers content horizontally
      marginLeft: 265,
      marginBottom: 20,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'green',
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



    footerButton: {
      height: 100, // Sets the height of the button
      backgroundColor: colors.white, // Sets the background color of the button
      borderRadius: 50, // Sets the border radius of the button
      width: 100, // Sets the width of the button
      borderWidth: 2,
      borderColor: 'red',
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
      marginLeft: 10,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',

    },
    dateButtonIcon: {

      width: 17, // Adjust the width to your preference
      height: 17,
      tintColor: '#152B61', // Adjust the height to your preference
      marginTop: 2,
    },

    icon: {
      fontSize: 30,
      justifyContent: 'center',
      alignItems: 'center',

    },
    space: {
      flexDirection: 'row',
      marginLeft: 30,
      alignItems: 'center',
    },
    time: {
      flexDirection: 'row',
      marginTop: 10,
    },
    date: {
      flexDirection: 'row',
      alignItems: 'center',

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
      height: 90,
      overflow: 'hidden',
    },
    cardTitle: {
      textAlign: 'left',
      fontSize: 17,
      fontFamily: 'OpenSans-Bold',
      color: colors.oxfordBlue,
      //fontWeight: "700",
    },
    dateText: {
      textAlign: 'left',
      paddingLeft: 2,
      verticalAlign: 'middle',
      color: colors.richBlack,
      fontSize: 13,
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
      paddingVertical: 10, // Adds vertical padding
    },

    scrollContainer: {
      flex: 1,
      backgroundColor: '#0A1128',
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
      flex: 1,
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'column-reverse',

    },



    footerButtonContainer: {
      flex: 1, // Takes up the available space
      alignItems: 'center', // Centers content horizontally
      paddingVertical: 20, // Adds vertical padding
      borderTopWidth: 0.5,
      borderTopColor: '#EFEFEF',

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
      backgroundColor: '#0A1128', // Sets the background color of the button
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

  'outlookMeeting': StyleSheet.create({

    container: {
      flex: 1, // Takes up the entire available space
      backgroundColor: '#0A1128', // Sets the background color
      paddingVertical: 20, // Adds vertical padding
    },

    content: {
      flex: 1,
    },

    dateBar: {
      flexDirection: 'row',
      backgroundColor: '#ffffff', // Add this line to set the background color of the white container
      borderRadius: 10, // Add this line to set the border radius of the white container
      padding: 10, // Add this line to provide some spacing around the date
      width: '100%',

    },

    selectDateContainer: {
      marginTop: 0,
    },

    arrowIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      tintColor: '#0A1128',
      marginLeft: -17, // Add this line to push the left arrow slightly away from the date // Add this line to push the right arrow slightly away from the date
    },
    arrowIconB: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      tintColor: '#0A1128',

      // Add this line to push the right arrow slightly away from the date
    },
    dateText: {
      flex: 1,
      fontSize: 16,
      color: '#0A1128',
      fontFamily: 'OpenSans-Semibold',
      textAlign: 'center',

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
      marginTop: 10,
      paddingHorizontal: 16, // Adds horizontal padding
      justifyContent: 'center', // Centers content vertically
    },
    selectButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectButtonTitle: {
      color: '#0A1128',
      fontFamily: 'OpenSans-Regular',
      fontSize: 14,
      textAlign: 'left',
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
    button: {
      height: 40,
      width: '100%', // Sets the width to 100% of the container
      borderRadius: 10, // Sets the border radius
      backgroundColor: '#ffffff', // Sets the background color of the button
      justifyContent: 'center', // Centers content vertically
      alignItems: 'flex-start', // Aligns text to the left
      flexDirection: 'column',
      paddingLeft: 10, // Adds left padding for text
    },
    dateBarContainer: {
      height: 50,
      width: '100%', // Sets the width to 100% of the container
      borderRadius: 10, // Sets the border radius
      backgroundColor: '#ffffff', // Sets the background color of the button
      justifyContent: 'center', // Centers content vertically
      alignItems: 'flex-start', // Aligns text to the left
      flexDirection: 'column',
      paddingLeft: 16, // Adds left padding for text
    },


    buttonWithBorder: {
      borderColor: '#152B61', // Sets the border color
      borderWidth: 2, // Sets the border width
    },

    footer: {
      flexDirection: 'row', // Sets the direction of items in the container to horizontal

    },

    footerContainer: {
      borderTopWidth: 0.2, // Adds a top border
      borderTopColor: '#EFEFEF', // Sets the color of the top border
      left: 0,
      right: 0,
      bottom: 0,
      paddingTop: 20,
      paddingBottom: 20,

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
      backgroundColor: '#0A1128', // Sets the background color of the button
    },
    footerBorder: {
      borderColor: '#ffffff', // Sets the border color
      borderWidth: 2, // Sets the border width
    }

  }),

  'settings': StyleSheet.create({

    back: {
      resizeMode: 'contain',
      width: 30,
      height: 30,
      tintColor: colors.white


    },

    container: {
      flex: 1,
      backgroundColor: '#0A1128', // Sets the background color
      paddingVertical: 10, // Adds vertical padding
    },

    header: {
      paddingTop: 10, // Adds top padding
      paddingHorizontal: 20,
      height: 70,
      backgroundColor: '#0A1128', // Sets the background color
      flexDirection: 'row', // Add this line to make the content align horizontally
      alignItems: 'center', // Add this line to vertically align the content
    },


    logo: {
      resizeMode: 'contain',
      width: 60,
      height: 60,
      marginLeft: 25,
    },

    headerText: {
      fontSize: 18, // Sets the font size
      color: '#ffffff', // Sets the text color
      fontFamily: 'Montserrat-ExtraBold', // Sets the font family
      marginLeft: 8,
    },

    subHeader: {
      fontSize: 18, // Sets the font size
      color: '#ffffff', // Sets the text color
      fontFamily: 'OpenSans-Bold', // Sets the font family
      marginLeft: 8,
      paddingBottom: 25,
    },

    nextArrow: {
      resizeMode: 'contain',
      width: 30,
      height: 30,
      marginTop: 2,
      marginLeft: 140,

    },

    accessibility: {
      flexDirection: 'row',
    },
    title: {
      color: '#040F21',
      fontFamily: 'OpenSans-Bold',
      fontSize: 15,
      textAlign: 'left',
      alignSelf: 'flex-start',
      marginLeft: 10,
      marginTop: 7,
    },


  }),
  'meetingDetails': StyleSheet.create({

  }),
  'Headers': StyleSheet.create({
    logoImage: {
      width:50,
      height:50, 
      paddingRight:40,
    },
    logoImageRighter: {
      width:50,
      height:50, 
      paddingRight:40,
      marginLeft:30,
    },
    titleText:{
      color: colors.white,
      fontSize: 20, // Sets the font size
      fontFamily: 'Montserrat-ExtraBold', // Sets the font family
      marginLeft: 8,
    },
    overallView:{
      flexDirection:'row',
      alignContent:'center',
      height:90,
      alignItems:'center'
    },
    contentStyle:{
      borderTopColor: colors.gray,
      borderTopWidth: 0.25,
      margin:0,
      padding:0,
    },
  }),

};