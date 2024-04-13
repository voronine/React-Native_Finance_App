import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import MenuSquare from './MenuSquare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalExpense from './ModalExpense';
import List from './ListTransaction';

const Expenses = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleList, setModalVisibleList] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModalList = () => {
    setModalVisibleList(true);
  };

  const closeModalList = () => {
    setModalVisibleList(false);
  };

  let currency = '$';

  useEffect(() => {
    calculateBudget();
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
    if (!modalVisible) {
      fetchDataIncome();
      fetchDataExpense();
    }
  }, [modalVisible]);

  useEffect(() => {
    calculateBudget();
  }, [incomes, expenses]);

  const onRefresh = () => {
    fetchDataIncome();
    fetchDataExpense();
    calculateBudget();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
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

            <MenuSquare
              currentPage={'expenses'}
              onAddExpense={openModal}
              openModalList={openModalList}
              budget={budget}
            />

            {expenses?.map((transaction, index) => (
                 <View key={index} style={styles.transactionsBlock}>
                        <View style={styles.mapOut}>
                          <Image
                            style={styles.imageOut}
                            source={require('../img/in.png')}
                            resizeMode='contain'
                          />
                          <View style={styles.blockOut}>
                            <Text style={styles.outText}>{transaction.category}</Text>
                            <Text style={styles.outData}>{transaction.date}</Text>
                          </View>
                        </View>
                        <Text style={transaction.category}>-{transaction.amount}{currency}</Text>
                    </View>
              ))}
          </View>
          
          <View style={styles.notation}>
            <Text style={styles.notationTitle}>Уведомление о расходах</Text>
            <Text>
              За последний месяц ваши расходы снизились на 5%!
            </Text>
            <Image
                  style={styles.imageNotation}
                  source={require('../img/expensive.png')}
                  resizeMode='contain'
                />
          </View>
        </View>
      </View>
      <ModalExpense visible={modalVisible} onClose={closeModal} />
      <List visible={modalVisibleList} onClose={closeModalList} currentPage={'expenses'} />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: '100%',
  },
  main: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 40,
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
  },
  mapOut: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageOut: {
    height: 32,
    width: 32,
  },
  blockOut: {
    paddingLeft: 8,
  },
  outText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: 0.25,
  },
  outData: {
    letterSpacing: 0.4,
    color: '#222222',
    opacity: 0.34,
    fontSize: 12,
    // fontFamily: 'Roboto_500Medium',
  },
  outCount: {
    fontSize: 14,
    letterSpacing: 0.1,
    // fontFamily: 'Roboto_500Medium',
  },
  notation: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 12,
    marginBottom: 26,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom:  16,
  },
  notationTitle: {
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: 0.15,
    marginBottom: 10,
  },
  notationText: {
    fontWeight: '400',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  imageNotation: {
    marginTop: -50,
    marginBottom: -8,
    marginRight: -20,
    alignSelf: 'flex-end',
    borderRadius: 15 
  },
});

export default Expenses;