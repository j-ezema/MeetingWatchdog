import React, { useState, useCallback } from "react";
import { Modal, Alert, View, Text, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { getDBConnection, updateTermsAgreement, createTable, termsAgreed } from "../services/db-services";
import { styles } from "../assets/Styles";
import STRINGS from "../assets/STRINGS";

export function TermsScreen() {

  //whether or not the modal is popped up
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);

  //retrieve all paragraphs from STRINGS
  var termsBody: JSX.Element[] = [];
  Object.entries(STRINGS.termsAndConditions.body).forEach(([key, value]) => {
    termsBody.push(
      <View>
        <Text style={styles.terms.fineprint}>
          <Text style={styles.terms.fineprintBold}>{value.title}</Text>
          {value.content}
        </Text>
        <Text/>
      </View>
    )
  });

  // is called if the user presses accept
  const attemptClose = async () =>{
    setIsModalVisible(!isModalVisible);
    const db = await getDBConnection();
    updateTermsAgreement(db, 1);
  }

  //checks to see if terms have already been accepted
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const bool = !await termsAgreed(db);
      setIsModalVisible(bool);
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        attemptClose();
      }}>

      <View style={styles.terms.semiTransparentRange}>
        <View style={styles.terms.MainView}>
          <View style={styles.terms.titleView}>
            <Text style={styles.terms.title}>
              {STRINGS.termsAndConditions.acceptTitle}
            </Text>
          </View>
          <ScrollView style={styles.terms.termsContainer}>
            <View>
              <Text style={styles.terms.fineprintBold}>
              {STRINGS.termsAndConditions.title}
              </Text>
              <Text/>
              <Text style={styles.terms.fineprint}>
              <Text style={styles.terms.fineprintBold}>{STRINGS.termsAndConditions.date}</Text>: {STRINGS.termsAndConditions.policyDate}
              </Text>
              <Text style={styles.terms.fineprint}>
              {STRINGS.termsAndConditions.please}
              </Text>
              <Text/>
              {termsBody}
              <Text style={styles.terms.fineprint}>
                  {STRINGS.termsAndConditions.acceptText}
              </Text>
              <Text/>
            </View>
          </ScrollView>
          <View style={{flexDirection:"row"}}>
              {/* <TouchableOpacity  onPressOut={BackHandler.exitApp} style={styles.terms.decline }> */}
              <TouchableOpacity  onPressOut={()=>setIsConfirmationModalVisible(true)} style={styles.terms.decline }>
                <Text style={styles.terms.declineText}>
                  {STRINGS.termsAndConditions.decline}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity  onPressOut={attemptClose} style={styles.terms.accept}>
                <Text style={styles.terms.acceptText}>
                  {STRINGS.termsAndConditions.accept}
                </Text>
              </TouchableOpacity>
            </View>
        </View>
        
      </View>
      <Modal
      animationType="fade"
      transparent={true}
      visible={isConfirmationModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        attemptClose();
      }}>
          <View style={styles.terms.semiTransparentRange}>
            <View style={[styles.terms.confirmView]}>
              <View style={{flex:-1, minHeight:140,}}>
                <Text style={styles.terms.confirmText}>
                {STRINGS.termsAndConditions.confirm}
                </Text>
                <Text style={styles.terms.confirmItalicsText}>
                {STRINGS.termsAndConditions.confirmItalics}
                </Text>
              </View>
              <View style={{flexDirection:"row", margin:-10, flex:0}}>
                {/* <TouchableOpacity  onPressOut={BackHandler.exitApp} style={styles.terms.decline }> */}
                <TouchableOpacity  onPressOut={()=>setIsConfirmationModalVisible(false)} style={styles.terms.decline }>
                  <Text style={styles.terms.declineText}>
                    {STRINGS.termsAndConditions.cancel}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPressOut={BackHandler.exitApp} style={styles.terms.accept}>
                  <Text style={styles.terms.acceptText}>
                    {STRINGS.termsAndConditions.confirmButton}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </Modal>
    </Modal>
  );
}