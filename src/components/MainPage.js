import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import GroupedBars from './BarChart';
import MenuSquare from './MenuSquare';
import ModalComponent from './ModalComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalExpense from './ModalExpense';

const MainPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleExpense, setModalVisibleExpense] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    fetchDataExpense();
    fetchDataIncome();
  }, []);

  const fetchDataIncome = async () => {
    try {
      const incomeData = await AsyncStorage.getItem('transactions');
      setIncomes(incomeData ? JSON.parse(incomeData) : []);
    } catch (error) {
      console.error('Error fetching income data from AsyncStorage:', error);
    }
  };

  const fetchDataExpense = async () => {
    try {
      const expenseData = await AsyncStorage.getItem('transactionsExpense');
      setExpenses(expenseData ? JSON.parse(expenseData) : []);
    } catch (error) {
      console.error('Error fetching expense data from AsyncStorage:', error);
    }
  };

  const calculateBudget = () => {
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setBudget(totalIncome - totalExpense);
  };

  useEffect(() => {
    calculateBudget();
  }, [incomes, expenses]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDataExpense();
    await fetchDataIncome();
    setRefreshing(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModalExpense = () => {
    setModalVisibleExpense(true);
  };

  const closeModalExpense = () => {
    setModalVisibleExpense(false);
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
      <View style={styles.main}>
        <View style={styles.bottomContainer}>
          <View style={styles.square}>
            <MenuSquare currentPage={''} onAddIncome={openModal} onAddExpense={openModalExpense} budget={budget} />
            <View style={styles.transactionsBlock}>
              <View style={styles.mapOut}>
                {/* Изображение и текст для "Аренда" */}
              </View>
              {/* Текст суммы для "Аренда" */}
            </View>
            <View style={styles.transactionsBlock}>
              <View style={styles.mapOut}>
                {/* Изображение и текст для "Ежедневная прибыль" */}
              </View>
              {/* Текст суммы для "Ежедневная прибыль" */}
            </View>
          </View>
        </View>
        <GroupedBars />
      </View>
      <ModalComponent visible={modalVisible} onClose={closeModal} />
      <ModalExpense visible={modalVisibleExpense} onClose={closeModalExpense} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 27,
  },
  bottomContainer: {
    width: '100%',
  },
  square: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 12,
    marginBottom: 26,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  transactionsBlock: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapOut: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MainPage;
