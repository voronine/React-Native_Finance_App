import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, RefreshControl, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Category {
  name: string;
}

const Categories = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [modalVisibleIncome, setModalVisibleIncome] = useState<boolean>(false);
  const [modalVisibleExpense, setModalVisibleExpense] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newCategoryExp, setNewCategoryExp] = useState<string>('');

  const loadCategories = async () => {
    try {
      const jsonIncome = await AsyncStorage.getItem('incomeCategories');
      const jsonExpense = await AsyncStorage.getItem('expenseCategories');

      const loadedIncomeCategories = jsonIncome ? JSON.parse(jsonIncome) : [];
      const loadedExpenseCategories = jsonExpense ? JSON.parse(jsonExpense) : [];

      setIncomeCategories(loadedIncomeCategories);
      setExpenseCategories(loadedExpenseCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [refreshing]);

  const saveIncomeCategories = async (categories: Category[]) => {
    try {
      await AsyncStorage.setItem('incomeCategories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving income categories to AsyncStorage:', error);
    }
  };

  const saveExpenseCategories = async (categories: Category[]) => {
    try {
      await AsyncStorage.setItem('expenseCategories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving expense categories to AsyncStorage:', error);
    }
  };

  const addIncomeCategory = async () => {
    if (newCategory.trim() !== '') {
      const newCat: Category = { name: newCategory };
      const updatedIncomeCategories = [...incomeCategories, newCat];
      setIncomeCategories(updatedIncomeCategories);
      setNewCategory('');
      setModalVisibleIncome(false);
      await saveIncomeCategories(updatedIncomeCategories);
    }
  };

  const addExpenseCategory = async () => {
    if (newCategoryExp.trim() !== '') {
      const newExpCat: Category = { name: newCategoryExp };
      const updatedExpenseCategories = [...expenseCategories, newExpCat];
      setExpenseCategories(updatedExpenseCategories);
      setNewCategoryExp('');
      setModalVisibleExpense(false);
      await saveExpenseCategories(updatedExpenseCategories);
    }
  };

  const removeIncomeCategory = async (index: number) => {
    const newCategoryList = [...incomeCategories];
    newCategoryList.splice(index, 1);
    setIncomeCategories(newCategoryList);
    await saveIncomeCategories(newCategoryList);
  };

  const removeExpenseCategory = async (index: number) => {
    const newCategoryList = [...expenseCategories];
    newCategoryList.splice(index, 1);
    setExpenseCategories(newCategoryList);
    await saveExpenseCategories(newCategoryList);
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#9Bd35A', '#689F38']}
        />
      }
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Категория доходов</Text>
        {incomeCategories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <Text>{category.name}</Text>
            <TouchableOpacity
              onPress={() => removeIncomeCategory(index)}
              style={styles.deleteButton}
            >
              <Image
                source={require('../img/delete.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisibleIncome(true)}
        >
          <Text style={styles.addButtonText}>Добавить новую категорию доходов</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Категории расходов</Text>
        {expenseCategories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <Text>{category.name}</Text>
            <TouchableOpacity
              onPress={() => removeExpenseCategory(index)}
              style={styles.deleteButton}
            >
              <Image
                source={require('../img/delete.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisibleExpense(true)}
        >
          <Text style={styles.addButtonText}>Добавить новую категорию расходов</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleIncome}
        onRequestClose={() => setModalVisibleIncome(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Введите название категории"
              value={newCategory}
              onChangeText={(text) => setNewCategory(text)}
            />
            <Button title="Добавить" onPress={addIncomeCategory} />
            <Button title="Отмена" onPress={() => setModalVisibleIncome(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleExpense}
        onRequestClose={() => setModalVisibleExpense(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Введите название категории"
              value={newCategoryExp}
              onChangeText={(text) => setNewCategoryExp(text)}
            />
            <Button title="Добавить" onPress={addExpenseCategory} />
            <Button title="Отмена" onPress={() => setModalVisibleExpense(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 20,
  },
});

export default Categories;