import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const [activePage, setActivePage] = useState('Home');

  const handleHomePress = () => {
    navigation.navigate('Home');
    setActivePage('Home');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
    setActivePage('Profile');
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handleHomePress}>
        <Ionicons
          name="home"
          size={24}
          color={activePage === 'Home' ? '#4183b3' : 'gray'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfilePress}>
        <Ionicons
          name="person"
          size={24}
          color={activePage === 'Profile' ? '#4183b3' : 'gray'}
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