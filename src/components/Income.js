import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import MenuSquare from './MenuSquare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponent from './ModalComponent';
import List from './ListTransaction';

const Income = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleList, setModalVisibleList] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
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
    calculateBudget();
  }, [incomes, expenses]);

  useEffect(() => {
    if (!modalVisible) {
      fetchDataIncome();
      fetchDataExpense();
      calculateBudget();
    }
  }, [modalVisible]);

  const onRefresh = () => {
    fetchDataIncome();
    fetchDataExpense();
    calculateBudget();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  };
  
  const currency = '$';

  const getLast4Transactions = () => {
    const reversedIncomes = [...incomes].reverse();
    return reversedIncomes.slice(0, 4);
  };

  const last4Transactions = getLast4Transactions();
  
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
              currentPage={'income'}
              onAddIncome={openModal}
              openModalList={openModalList}
              budget={budget}
            />

              {last4Transactions?.map((transaction, index) => (
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
                        <Text style={transaction.category}>+{transaction.amount}{currency}</Text>
                    </View>
                 ))}
          </View>
          
        <View style={styles.notation}>
          <Text style={styles.notationTitle}>Уведомление о доходах</Text>
          <Text>
            За последний месяц ваше кафе принесло доход на 7% больше, чем в прошлом!
          </Text>
          <Image
                style={styles.imageNotation}
                source={require('../img/notation.png')}
                resizeMode='contain'
              />
        </View>
      </View>
      </View>
      <ModalComponent visible={modalVisible} onClose={closeModal} />
      <List visible={modalVisibleList} onClose={closeModalList} currentPage={'income'} />
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
    marginTop: -70,
    alignSelf: 'flex-end',
    borderRadius: 15 
  },
  transactionsBlock: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapOut: {
    flexDirection: 'row',
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
    color: '#1D1F22',
  },
});

export default Income;