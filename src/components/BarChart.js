import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupedBars = ({ incomes, expenses, dataChanged }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeData = await AsyncStorage.getItem('transactions');
        const parsedIncomeData = incomeData ? JSON.parse(incomeData) : [];
        const incomeTransactions = parsedIncomeData.map(transaction => ({
          ...transaction,
          isIncome: true
        }));

        const expenseData = await AsyncStorage.getItem('transactionsExpense');
        const parsedExpenseData = expenseData ? JSON.parse(expenseData) : [];
        const expenseTransactions = parsedExpenseData.map(transaction => ({
          ...transaction,
          isIncome: false
        }));

        const quarterlyIncomes = calculateQuarterlyIncomes(incomeTransactions);
        const quarterlyExpenses = calculateQuarterlyExpenses(expenseTransactions);
        const quarterData = createQuarterData(quarterlyIncomes, quarterlyExpenses);
        
        setBarData(quarterData);
      } catch (error) {
        console.error('Ошибка при загрузке данных из AsyncStorage:', error);
      }
    };

    fetchData();
  }, [incomes, expenses, dataChanged]);

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

  return (
    <View style={{
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: 12,
      marginBottom: 26,
      paddingHorizontal: 16,
      height: 310
    }}>
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={9}
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
  );
};

export default GroupedBars;
