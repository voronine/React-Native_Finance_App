import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalComponent = ({ visible, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null); // Выбранная категория
  const [enteredAmount, setEnteredAmount] = useState(''); // Введенная сумма

  const [categories, setCategories] = useState([]); // Массив доступных категорий

  useEffect(() => {
    fetchDataFromStorage();
  }, []);

  const fetchDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('categories');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setCategories(parsedData.income); // Устанавливаем данные из AsyncStorage в состояние
      } else {
        console.log('No data found for the key "categories".');
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  const handleCheckboxChange = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const saveDataToStorage = async () => {
    try {
      if (!selectedCategory || !enteredAmount) {
        console.log('Please select a category and enter an amount.');
        return;
      }

      const newTransaction = { category: selectedCategory, amount: parseFloat(enteredAmount) };
      const storedData = await AsyncStorage.getItem('transactions');
      const existingTransactions = storedData ? JSON.parse(storedData) : [];
      const updatedTransactions = [...existingTransactions, newTransaction];

      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      console.log('Transaction saved successfully.');
      onClose(); // Закрытие модального окна после сохранения данных
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="gray" />
          </TouchableOpacity>
          <View style={styles.containerModalTitle}>
            <Text style={styles.modalTitle}>Добавить доходы</Text>
          </View>
          <Text style={styles.chooseCategory}>Добавить категорию</Text>
          <View style={styles.checkboxContainer}>
            {categories?.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.checkboxItem}
                onPress={() => handleCheckboxChange(category.name)}
              >
                <Ionicons
                  name={selectedCategory === category.name ? 'radio-button-off-outline' : 'radio-button-on-outline'}
                  size={24}
                  color={'#0a83dc'}
                />
                <Text style={styles.checkboxLabel}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Введите сумму"
              keyboardType="numeric"
              value={enteredAmount}
              onChangeText={(text) => setEnteredAmount(text)}
            />
          </View>
          <Button title="Сохранить" onPress={saveDataToStorage} />
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
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  containerModalTitle: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chooseCategory: {
    fontSize: 16,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default ModalComponent;