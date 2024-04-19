import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ModalAbout = ({ visible, onClose }) => {

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
                <Text style={styles.modalTitle}>О приложении</Text>
              </View>

              <Image
                style={styles.img}
                source={require('../img/logo.png')}
                resizeMode='contain'
          />
          
          <Text style={styles.version}>Версия сборки 24.567.</Text>
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
    height: '85%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  containerModalTitle: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 240,
  },
  version: {
    marginTop: 48,
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

export default ModalAbout;