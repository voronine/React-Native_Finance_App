import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

const ModalComponent = ({ visible, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [enteredAmount, setEnteredAmount] = useState('');
  const [categories, setCategories] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDataFromStorage();
    setInitialDate();
  }, []);

  const setInitialDate = () => {
    const today = new Date();
    const initialDate = today.toISOString().split('T')[0];
    setSelectedDate(initialDate);
  };

  useEffect(() => {
    if (!visible) {
      setIsCalendarVisible(false);
    }
  }, [visible]);

  const fetchDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('incomeCategories');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setCategories(parsedData);
        
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
      if (!selectedCategory || !enteredAmount || !selectedDate) {
        console.log('Please select a category, enter an amount, and choose a date.');
        return;
      }

      const newTransaction = { category: selectedCategory, amount: parseFloat(enteredAmount), date: selectedDate };
      const storedData = await AsyncStorage.getItem('transactions');
      const existingTransactions = storedData ? JSON.parse(storedData) : [];
      const updatedTransactions = [...existingTransactions, newTransaction];

      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      onClose();
      setEnteredAmount('');
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsCalendarVisible(false);
  };

  const onRefresh = () => {
    fetchDataFromStorage();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
        setIsCalendarVisible(false);
      }}
    >
      <ScrollView
        style={{ height: '100%', width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="gray" />
          </TouchableOpacity>
            
          <View style={styles.containerModalTitle}>
            <Text style={styles.modalTitle}>Добавить доходы</Text>
            </View>
            
          <View style={styles.viewCenter}>
            <Text style={styles.chooseCategory}>Выберите категорию</Text>
          <View style={styles.checkboxContainer}>
            {categories?.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.checkboxItem}
                onPress={() => handleCheckboxChange(category.name)}
              >
                <Ionicons
                  name={selectedCategory === category.name ? 'radio-button-on-outline' : 'radio-button-off-outline'}
                  size={24}
                  color={'#0a83dc'}
                />
                <Text style={styles.checkboxLabel}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.addIncomeText}>Добавить нужную сумму доходов</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Введите сумму"
              keyboardType="numeric"
              value={enteredAmount}
              onChangeText={(text) => setEnteredAmount(text)}
              placeholderTextColor='rgba(34, 34, 34, 0.6)'
            />
          </View>

          <Text style={styles.addIncomeText}>Выберите дату дохода</Text>
          <View style={styles.dateInput}>
            <TouchableOpacity style={styles.dateSelectButton} onPress={toggleCalendar}>
              <Text style={styles.dateText}>{selectedDate || 'День.Месяц'}</Text>
            </TouchableOpacity>
          </View>

          {isCalendarVisible && (
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: 'blue' },
                }}
              />
            </View>
          )}
          </View>
          <View style={styles.containerButtonAdd}>
            <TouchableOpacity style={styles.addButton} onPress={saveDataToStorage}>
            <Text style={styles.addButtonText}>Добавить</Text>
            </TouchableOpacity>
          </View>
        </View>
        </TouchableOpacity>
        </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 900,
  },
  modalContainer: {
    width: '98%',
    height: '85%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    alignItems: 'start',
    justifyContent: 'space-between'
  },
  viewCenter: {
    height: '80%',
    width: '100%',
  },
  containerModalTitle: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chooseCategory: {
    fontSize: 16,
    marginBottom: 20,
  },
  checkboxContainer: {
    marginBottom: 36,
    marginLeft: 12,
    alignItems: 'flex-start',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 48,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(180, 180, 180, 0.08)',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(180, 180, 180, 0.08)',
    marginBottom: 32,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: 20,
  },
  dateSelectButton: {
    width: '50%',
    backgroundColor: 'rgba(180, 180, 180, 0.08)',
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 16,
  },
  dateText: {
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
  },
  calendarContainer: {
    position: 'absolute',
    top: 280,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  addIncomeText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#0a83dc',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
  },
  containerButtonAdd: {
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default ModalComponent;