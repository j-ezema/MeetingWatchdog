import React, { useState, useCallback } from "react";
import { Modal, Alert, View, Text, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { getDBConnection, updateTermsAgreement, createTable, termsAgreed } from "../services/db-services";
import { styles } from "../assets/Styles";

export function TermsScreen() {
    const x:boolean = false;
    const [isModalVisible, setIsModalVisible] = useState(x);
  
    const attemptClose = async () =>{
      setIsModalVisible(!isModalVisible);
      const db = await getDBConnection();
      updateTermsAgreement(db, 1);
    }
  
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
                  Please Accept the terms and conditions below
                </Text>
              </View>
              <ScrollView style={styles.terms.termsContainer}>
                <View>
                  <Text style={styles.terms.fineprintBold}>
                    TERMS AND CONDITIONS AGREEMENT FOR MEETING WATCHDOG 
                  </Text>
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>Effective Date</Text>: July 7, 2023 
                  </Text>
                  <Text style={styles.terms.fineprint}>
                  Welcome to Meeting Watchdog ("App")! Please carefully read and understand the following terms and conditions ("Agreement") before accessing or using our App. This Agreement sets forth the legally binding terms between you ("User" or "You") and Carbon Edge ("Company" or "We") governing your use of the App.
                  </Text>
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>1. Acceptance of Terms </Text>
                    By accessing or using the App, you acknowledge that you have read, understood, and agreed to be bound by this Agreement. If you do not agree with any part of this Agreement, please refrain from using the App.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>2. App Description </Text>
                  The App is designed to track and help optimize your meeting experiences. Our mission is to enhance productivity, minimize wasted time, and isolate unproductive meetings by tracking productive and unproductive meeting time and estimating a cost based on average hourly rate of attendees.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>3. Eligibility  </Text>
                  You must be at least 18 years old or the legal age of majority in your jurisdiction to use this App. By using the App, you represent and warrant that you meet the eligibility requirements and are fully able and competent to enter into this Agreement.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>4. User Account Registration </Text>
                  Certain features of the App may require you to create a user account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>4.1 Account Usage </Text>
                  You are solely responsible for any activity that occurs through your account. You agree not to share your account credentials or allow others to access your account. In the event of unauthorized access to your account, you must notify the Company immediately.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>5. Intellectual Property </Text>
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>5.1 Ownership </Text>
                    The App and all its contents, including but not limited to text, graphics, logos, images, software, and trademarks, are the property of the Carbon Edge and are protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the App for its intended purpose.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>5.2 Restrictions </Text>
                  You agree not to reproduce, modify, distribute, transmit, display, perform, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from or through the App without the express written permission of the Company.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>6. User Content </Text>
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>6.1 Submission of User Content </Text>
                  You may have the opportunity to submit or post content, including but not limited to text, images, and audio, through the App. By submitting or posting User Content, you grant the Company a worldwide, royalty-free, perpetual, irrevocable, non-exclusive, transferable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display such User Content in connection with the App.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>6.2 Responsibility for User Content </Text>
                  You are solely responsible for the User Content you submit or post through the App. You agree not to submit or post any content that is unlawful, defamatory, obscene, offensive, invasive of privacy, or infringing of any third-party rights. The Company reserves the right to remove or disable any User Content at its sole discretion.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>7. Privacy Policy </Text>
                  Your use of the App is subject to the Company's Privacy Policy, which is incorporated by reference into this Agreement. By using the App, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>8. Disclaimer of Warranties </Text>
                  The App is provided on an "as is" and "as available" basis, without any warranties or conditions, express or implied. The Company disclaims all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, and accuracy.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>9. Limitation of Liability </Text>
                  To the maximum extent permitted by applicable law, the Company and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the App, even if the Company has been advised of the possibility of such damages.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>10. Indemnification </Text>
                  You agree to indemnify, defend, and hold harmless the Company and its officers, directors, employees, and agents from and against any and all claims, liabilities, expenses, damages, and losses, including reasonable attorneys' fees, arising out of or in connection with your use of the App or any violation of this Agreement.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>11. Modification and Termination </Text>
                  The Company reserves the right to modify, suspend, or terminate the App, in whole or in part, at any time without notice or liability. We may also modify this Agreement from time to time, and such modifications will be effective upon posting on the App. Your continued use of the App after any modifications constitutes your acceptance of the modified Agreement.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>12. Governing Law and Jurisdiction </Text>
                    This Agreement shall be governed by and construed in accordance with the laws of Canada. Any disputes arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts located in Canada. 13. Entire Agreement This Agreement constitutes the entire agreement between you and the Company regarding your use of the App and supersedes all prior or contemporaneous understandings and agreements. 14. Severability If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>13. Entire Agreement </Text>
                  This Agreement constitutes the entire agreement between you and the Company regarding your use of the App and supersedes all prior or contemporaneous understandings and agreements.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>14. Severability </Text>
                    If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. 
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                  <Text style={styles.terms.fineprintBold}>15. Contact Information </Text>
                    If you have any questions or concerns regarding this Agreement, please contact us at https://www.carbonedge.com/contact.
                  </Text> 
                  <Text/>
                  <Text style={styles.terms.fineprint}>
                      By using the App, you acknowledge that you have read, understood, and agree to be bound by this Agreement.
                  </Text>
                </View>
              </ScrollView>
              <View style={{flexDirection:"row"}}>
                  <TouchableOpacity  onPressOut={BackHandler.exitApp} style={styles.terms.decline }>
                    <Text style={styles.terms.declineText}>
                      Decline
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPressOut={attemptClose} style={styles.terms.accept}>
                    <Text style={styles.terms.acceptText}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                  
                </View>
            </View>
            
          </View>
        </Modal>
    );
  }