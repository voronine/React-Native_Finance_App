import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ModalConfid = ({ visible, onClose }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={30} color="gray" />
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <Text style={styles.version}>Thank you for using our app! We respect and protect your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our services. Please read this policy carefully to understand our practices. If you have any questions or concerns, please contact us.</Text>
            <Text style={styles.rule}>
              1. Information We Collect:
              When you register with our app, we collect essential details such as your email address and password to create your account securely. Additionally, for improved security and personalized experience, we may collect and store other identifying information like your name and profile data.
            </Text>
            <Text style={styles.rule}>
              2. How We Use Your Information:
              We use the collected information to provide and improve our services, personalize your experience, send you important notifications, and protect against unauthorized activities. Your data may also be used for analytics to understand and enhance our app's performance.
            </Text>
            <Text style={styles.rule}>
              3. Data Security:
              We prioritize the security of your information and employ industry-standard measures to protect it against unauthorized access, alteration, disclosure, or destruction.
            </Text>
            <Text style={styles.rule}>
              4. Data Sharing:
              We do not sell, trade, or share your personal information with third parties unless required by law or necessary for providing our services. However, anonymized data may be used for analytical purposes or to improve our services.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  version: {
    fontSize: 14,
    color: 'rgba(34, 34, 34, 0.8)',
    marginBottom: 24,
  },
  rule: {
    marginBottom: 16,
    fontSize: 14,
    color: 'rgba(34, 34, 34, 0.6)',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default ModalConfid;