import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Image } from 'react-native';
import GroupedBars from './BarChart';
import MenuSquare from './MenuSquare';
import ModalComponent from './ModalComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalExpense from './ModalExpense';
import ListAll from './ListAll';


const MainPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleExpense, setModalVisibleExpense] = useState(false);
  const [modalVisibleList, setModalVisibleList] = useState(false);
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
      const parsedIncomeData = incomeData ? JSON.parse(incomeData) : [];
      const incomeTransactions = parsedIncomeData.map(transaction => ({
        ...transaction,
        isIncome: true // Add property to indicate income
      }));
      setIncomes(incomeTransactions);
    } catch (error) {
      console.error('Error fetching income data from AsyncStorage:', error);
    }
  };

  const fetchDataExpense = async () => {
    try {
      const expenseData = await AsyncStorage.getItem('transactionsExpense');
      const parsedExpenseData = expenseData ? JSON.parse(expenseData) : [];
      const expenseTransactions = parsedExpenseData.map(transaction => ({
        ...transaction,
        isIncome: false
      }));
      setExpenses(expenseTransactions);
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

  const openModalList = () => {
    setModalVisibleList(true);
  };

  const closeModalList = () => {
    setModalVisibleList(false);
  };

  const allTransactions = [...incomes, ...expenses];

  const getLast2Transactions = () => {
    const reversedTransactions = allTransactions.slice().reverse();
    return reversedTransactions.slice(0, 2);
  };

  const last2Transactions = getLast2Transactions();
  const currency = '$';

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
            <MenuSquare
              currentPage={''}
              onAddIncome={openModal}
              onAddExpense={openModalExpense}
              budget={budget}
              openModalList={openModalList}
            />
            
            {last2Transactions.map((transaction, index) => (
              <View key={index} style={styles.transactionsBlock}>
                <View style={styles.mapOut}>
                  <Image
                    style={styles.imageOut}
                    source={transaction.isIncome ? require('../img/in.png') : require('../img/out.png')}
                    resizeMode='contain'
                  />

                  <View style={styles.blockOut}>
                    <Text style={styles.outText}>{transaction.category}</Text>
                    <Text style={styles.outData}>{transaction.date}</Text>
                  </View>
                </View>
                <Text style={transaction.isIncome ? styles.incomeText : styles.expenseText}>
                  {transaction.isIncome ? '+' : '-'}{transaction.amount}{currency}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <GroupedBars />
      </View>
      <ModalComponent visible={modalVisible} onClose={closeModal} />
      <ModalExpense visible={modalVisibleExpense} onClose={closeModalExpense} />
      <ListAll visible={modalVisibleList} allTransactions={allTransactions} onClose={closeModalList}/>
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
  imageOut: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  blockOut: {
    flexDirection: 'column',
  },
  outText: {
    fontSize: 14,
    fontWeight: '400',
  },
  outData: {
    fontSize: 12,
    color: '#999',
  },
  incomeText: {
    color: 'green',
  },
  expenseText: {
    color: 'red',
  },
});

export default MainPage;