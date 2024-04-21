import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Image } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
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

  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateBudget();
  }, [incomes, expenses]);

  const fetchData = async () => {
    try {
      const incomeData = await AsyncStorage.getItem('transactions');
      const parsedIncomeData = incomeData ? JSON.parse(incomeData) : [];
      const incomeTransactions = parsedIncomeData.map(transaction => ({
        ...transaction,
        isIncome: true
      }));

      setIncomes(incomeTransactions);

      const expenseData = await AsyncStorage.getItem('transactionsExpense');
      const parsedExpenseData = expenseData ? JSON.parse(expenseData) : [];
      const expenseTransactions = parsedExpenseData.map(transaction => ({
        ...transaction,
        isIncome: false
      }));
      
      setExpenses(expenseTransactions);

      const quarterlyIncomes = calculateQuarterlyIncomes(incomeTransactions);
      const quarterlyExpenses = calculateQuarterlyExpenses(expenseTransactions);
      const quarterData = createQuarterData(quarterlyIncomes, quarterlyExpenses);

      setBarData(quarterData);

    } catch (error) {
      console.error('Error fetching income data from AsyncStorage:', error);
    }
  };

  const calculateBudget = () => {
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setBudget(totalIncome - totalExpense);
  };

  function calculateQuarterlyExpenses(expenses) {
    const today = new Date();
    const currentQuarter = Math.floor(today.getMonth() / 3);
    const quarterlyExpenses = [0, 0, 0, 0];

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const expenseQuarter = Math.floor(expenseDate.getMonth() / 3);
      if (expenseDate.getFullYear() === today.getFullYear() && expenseQuarter <= currentQuarter) {
        quarterlyExpenses[expenseQuarter] += expense.amount;
      }
    });

    return quarterlyExpenses;
  }

  function calculateQuarterlyIncomes(incomes) {
    const today = new Date();
    const currentQuarter = Math.floor(today.getMonth() / 3);
    const quarterlyIncomes = [0, 0, 0, 0];

    incomes.forEach(income => {
      const incomeDate = new Date(income.date);
      const incomeQuarter = Math.floor(incomeDate.getMonth() / 3);
      if (incomeDate.getFullYear() === today.getFullYear() && incomeQuarter <= currentQuarter) {
        quarterlyIncomes[incomeQuarter] += income.amount;
      }
    });

    return quarterlyIncomes;
  }

  function createQuarterData(incomesBar, expensesBar) {
    const quarterData = [];

    ['Qtr 1', 'Qtr 2', 'Qtr 3', 'Qtr 4'].forEach((label, index) => {
      quarterData.push({
        value: incomesBar[index],
        label,
        spacing: 2,
        labelWidth: 33,
        labelTextStyle: { color: 'gray' },
        frontColor: '#243B86'
      });
      quarterData.push({
        value: expensesBar[index],
        frontColor: '#009FFD'
      });
    });

    return quarterData;
  }

  const renderTitle = () => (
    <View>
      <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
        Месячный график
      </Text>
      <Text style={{ marginTop: 10, color: '#1D1F22', fontSize: 12, fontWeight: '400', opacity: 0.7, marginBottom: 10 }}>
        Отслеживайте ваши доходы и расходы
      </Text>
    </View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(); 
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

  const last2Transactions = useMemo(() => {
    const allTransactions = [...incomes, ...expenses];
    return allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  }, [incomes, expenses]);;

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
        <View style={styles.square}>

        <View style={{
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: 12,
      marginBottom: 26,
      paddingHorizontal: 16,
      height: 290
    }}>
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={9}
        height={165}
        spacing={35}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: '#1D1F22' }}
        noOfSections={10}
        maxValue={9000}
        initialSpacing={25}
        stepValue={1000}
        stepHeight={18}
        showReferenceLine1
        referenceLine1Position={2000}
        referenceLine1Config={{ color: 'gray', dashWidth: 2, dashGap: 3 }}
        showReferenceLine2
        referenceLine2Position={4000}
        referenceLine2Config={{ color: 'gray', dashWidth: 2, dashGap: 3 }}
        showReferenceLine3
        referenceLine3Position={6000}
        referenceLine3Config={{ color: 'gray', dashWidth: 2, dashGap: 3 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: '#243B86', marginRight: 8, marginLeft: 50, marginTop: 15, }} />
          <Text style={{ width: 60, height: 16, color: 'lightgray', marginTop: 15, }}>
            Доходы
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: '#009FFD', marginRight: 8, marginTop: 15, }} />
          <Text style={{ width: 60, height: 16, color: 'lightgray', marginTop: 15, }}>
            Расходы
          </Text>
        </View>
      </View>
    </View>

        </View>
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
    backgroundColor: '#f7f7f7',
    borderWidth: 0,
  },
  bottomContainer: {
    width: '100%',
  },
  main: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  square: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
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