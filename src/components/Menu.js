import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = ({ currentPage }) => {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  const renderButton = (screenName, label) => {
    const isActive = currentPage === screenName;
    const buttonStyle = isActive ? styles.buttonActive : styles.button;
    const textStyle = isActive ? styles.buttonTextActive : styles.buttonText;

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => handlePress(screenName)}
        key={screenName}
      >
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.menu}>
      {renderButton('Home', 'Бюджет')}
      {renderButton('Income', 'Доходы')}
      {renderButton('Expenses', 'Расходы')}
      {renderButton('Category', 'Категории')}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10 ,
    borderRadius: 5,
  },
  buttonActive: {
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#2e2e2e',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  buttonTextActive: {
    color: '#2e2e2e',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: 'bold',
  },
});

export default Menu;
