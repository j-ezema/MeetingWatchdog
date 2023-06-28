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
        button: {
            position: 'absolute',
              right: 40,
              bottom: 40,
          },
        background:{
          height:"100%",
          backgroundColor: colors.oxfordBlue,
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
        cardDate: {
          textAlign: 'left',
          color: colors.richBlack,
          fontSize: 15,
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