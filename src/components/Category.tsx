import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, RefreshControl, TouchableOpacity, Modal, TextInput, Button, Alert, TouchableOpacityComponent } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


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
    Alert.alert('Категория успешно удалена!');

  };

  const removeExpenseCategory = async (index: number) => {
    const newCategoryList = [...expenseCategories];
    newCategoryList.splice(index, 1);
    setExpenseCategories(newCategoryList);
    await saveExpenseCategories(newCategoryList);
    Alert.alert('Категория успешно удалена!');

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
              <Ionicons name="trash" size={20} color="#FF756E" />
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
              <Ionicons name="trash" size={20} color="#FF756E" />
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
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
        >
          <View style={styles.modalContainer}>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisibleIncome(false)}>
              <Ionicons name="close" size={30} color="gray" />
            </TouchableOpacity>

            <View style={styles.containerModalTitle}>
              <Text style={styles.modalTitle}>Новая категория доходов</Text>
            </View>

            <View style={styles.containerSecondTitle}>
              <Text style={styles.modalTitle}>Название категории</Text>
            </View>

            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Введите название категории"
                  value={newCategory}
                  onChangeText={(text) => setNewCategory(text)}
                  placeholderTextColor='rgba(34, 34, 34, 0.6)'

                />
                <View style={styles.containerButtonAdd}>
                  <TouchableOpacity style={styles.addButton} onPress={addIncomeCategory}>
                    <Text style={styles.addButtonText}>Добавить</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleExpense}
        onRequestClose={() => setModalVisibleExpense(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
        >
          <View style={styles.modalContainer}>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisibleExpense(false)}>
              <Ionicons name="close" size={30} color="gray" />
            </TouchableOpacity>

            <View style={styles.containerModalTitle}>
              <Text style={styles.modalTitle}>Новая категория расходов</Text>
            </View>

            <View style={styles.containerSecondTitle}>
              <Text style={styles.modalTitle}>Название категории</Text>
            </View>

            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Введите название категории"
                  value={newCategoryExp}
                  onChangeText={(text) => setNewCategoryExp(text)}
                  placeholderTextColor='rgba(34, 34, 34, 0.6)'

                />
                <View style={styles.containerButtonAdd}>
                  <TouchableOpacity style={styles.addButton} onPress={addExpenseCategory}>
                    <Text style={styles.addButtonText}>Добавить</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 48,
    width: 350,
    borderWidth: 1,
    borderColor: 'rgba(180, 180, 180, 0.08)',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(180, 180, 180, 0.08)',
    marginBottom: 32,
    color: 'black',
  },
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  containerModalTitle: {
    justifyContent: 'center',
    marginBottom: 20,
    paddingBottom: 48,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#0a83dc',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  containerButtonAdd: {
    width: 350,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  containerSecondTitle: {
  }
});

export default Categories;