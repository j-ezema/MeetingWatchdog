import { StyleSheet } from "react-native";
import { MeetingItem } from '../models/index';

export const colors = {
    'royalBlue': '#152B61',
    'white': '#FFFFFF',
    'gold': '#D6AD60',
    'oxfordBlue': '#0A1128',
    'steelBlue': '#4D7EA8',
    'richBlack': '#040F21',
    'black': '#000000',
    'alertRed': '#a92b4e',
    //'alertRed': '#CE2030CC',

    
}

export const styles ={
    'homeScreen': StyleSheet.create({
        floatingButton: {
            position: 'absolute',
              right: 40,
              bottom: 40,
        },
        
        background:{
          height:"100%",
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
          //backgroundColor: colors.royalBlue,
          marginBottom:20,
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
            //position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            paddingTop: 20,
            paddingBottom: 200,
        },
    
        optionContainer: {
            //position: 'absolute',
            //position: 'relative',
            //flex:1,
            //justifyContent: 'flex-end',
            //height:'auto',
            left: 0,
            right: 0,
            backgroundColor: colors.white,
            
        },
        menu:{
          marginHorizontal:0,
          flex: 1,
          //margin: 0,
        },
    
    
        footerButtonContainer: {
            flex: 1, // Takes up the available space
            alignItems: 'center', // Centers content horizontally
            marginLeft: 265,
            marginBottom: 20,
    
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
          height: 50,
          width: '100%', // Sets the width to 100% of the container
          borderRadius: 10, // Sets the border radius
          justifyContent: 'center', // Centers content vertically
          alignItems: 'center', // Aligns text to the left
          flexDirection: 'row',
          marginBottom: 0.5,
          backgroundColor: colors.white,
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
    'meetingItem':StyleSheet.create({
        //Meeting View Cards
        sectionContainer: {
          flexDirection: 'column',
          alignSelf: 'stretch',
          marginLeft: 0,
          flex:1,
          paddingRight: 0
        },
        iconWrapper:{
          margin:0,
          display:"flex",
          flex:1,
          justifyContent: 'center',
          alignItems:'center',
          
        },
        icon:{
          fontSize: 30,
        },
        iconText:{
          color:colors.white,
          fontFamily:'OpenSans-Bold',
        },
        slideView:{
          backgroundColor:colors.alertRed,
          marginTop:0,
          marginBottom:0,
          marginLeft:0,
          width: 50, 
          height: '100%',
          
          alignSelf:'flex-end',
          overflow:'hidden',
        },
        cardOuter: {
          borderRadius: 15,
          marginRight:30,
          marginLeft:20,
          marginBottom:30,
          marginTop:10,
          backgroundColor: colors.white,
          height:100,
          overflow: 'hidden',
        },
        cardTitle: {
          textAlign: 'left',
          fontSize: 25,
          fontFamily:'OpenSans-Bold',
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
          marginTop:0,
          height: 7.5,
          backgroundColor: colors.steelBlue,
        },
    }),

};