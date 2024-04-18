import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
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
            <Ionicons name="close" size={28} color="gray" />
          </TouchableOpacity>
              <View style={styles.centrView}>
                <Text style={styles.modalTitle}>Политика конфиденциальности</Text>


          <Text style={styles.title}>Libracostcafe Privacy Policy</Text>
          
          <Text style={styles.version}>Thank you for using the Libracostcafe app! We take your privacy seriously.
            This Privacy Policy explains how we collect, use, and protect your personal data when you use our app. We want you to feel confident about the information you entrust to us,
              so please read this policy carefully. If you have any questions, don't hesitate to contact us.
            </Text>

            <Text style={styles.rule}>
              1.Information We Collect:
              Registration Data:
              When you register within the app, we collect fundamental information such as your email address and password. These details are essential for the creation of your user account. Additionally, for security purposes and to ensure seamless access to our services,
              we may also request and store other identifying information, including your name.
            </Text>
            <Text style={styles.rule}>
              1.Information We Collect:
              Registration Data:
              When you register within the app, we collect fundamental information such as your email address and password. These details are essential for the creation of your user account. Additionally, for security purposes and to ensure seamless access to our services,
              we may also request and store other identifying information, including your name.
            </Text>
            <Text style={styles.rule}>
              1.Information We Collect:
              Registration Data:
              When you register within the app, we collect fundamental information such as your email address and password. These details are essential for the creation of your user account. Additionally, for security purposes and to ensure seamless access to our services,
              we may also request and store other identifying information, including your name.
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
    height: 850,
  },
  modalContainer: {
    width: '98%',
    height: '90%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 24,
  },
  version: {
    marginTop: 14,
    color: 'rgba(34, 34, 34, 0.6)',
  },
  rule: {
    marginTop: 32,
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