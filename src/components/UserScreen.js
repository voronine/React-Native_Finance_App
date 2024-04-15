import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Linking, Platform } from 'react-native';
import { requestReview } from 'react-native-store-review';
import { InAppReview } from 'react-native-in-app-review';
import ModalAbout from './ModalAbout';
import ModalConfid from './ModalConfid';

const UserProfileScreen = () => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const openModal1 = () => {
    setModalVisible1(true);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };

  const openModal3 = () => {
    setModalVisible3(true);
  };

  const closeModal3 = () => {
    setModalVisible3(false);
  };

  const handleReview = async () => {
    try {
      if (Platform.OS === 'ios') {
        requestReview();
      } else if (Platform.OS === 'android') {
        const didOpen = await InAppReview.RequestInAppReview();
        console.log('Открыто окно для отзыва:', didOpen);
      }
    } catch (error) {
      console.error('Ошибка при открытии окна для отзыва:', error);
      Alert.alert('Ошибка', 'Не удалось открыть окно для отзыва.');
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.bottomContainer}>
        <View style={styles.square}>
          <TouchableOpacity style={styles.link} onPress={handleReview}>
            <Image
              style={styles.imageOut}
              source={require('../img/icon1.png')}
              resizeMode='contain'
            />
            <Text style={styles.linkText}>Отправить отзыв</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={openModal1}>
            <Image
              style={styles.imageOut}
              source={require('../img/icon2.png')}
              resizeMode='contain'
            />
            <Text style={styles.linkText}>О приложении</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={openModal3}>
            <Image
              style={styles.imageOut}
              source={require('../img/icon3.png')}
              resizeMode='contain'
            />
            <Text style={styles.linkText}>Политика конфиденциальности</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalAbout visible={modalVisible1} onClose={closeModal1} />
      <ModalConfid visible={modalVisible3} onClose={closeModal3} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 70,
  },
  bottomContainer: {
    width: '100%',
  },
  square: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 12,
    marginBottom: 26,
    paddingHorizontal: 32,
    paddingTop: 14,
    paddingBottom: 14,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  linkText: {
    marginLeft: 10,
  },
  imageOut: {
    width: 30,
    height: 30,
  },
});

export default UserProfileScreen;