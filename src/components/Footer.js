import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = ({ currentPage }) => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handleHomePress}>
        <Ionicons
          name="home"
          size={24}
          color={currentPage === 'Home' ? 'blue' : 'gray'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfilePress}>
        <Ionicons
          name="person"
          size={24}
          color={currentPage === 'Profile' ? 'blue' : 'gray'}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 25,
  },
  icon: {
    padding: 5,
  },
});

export default Footer;
