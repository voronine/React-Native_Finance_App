import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Ionicons name="home" size={24} color={'blue'} style={styles.icon} />
      <Ionicons name="person" size={24} color={'black'} style={styles.icon} />
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