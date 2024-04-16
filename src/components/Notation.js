import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Notation = ({ incomes, expenses, currentPage }) => {
  // Функция для фильтрации транзакций по месяцу
  function filterTransactionsByMonth(transactions, targetDate) {
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    return transactions?.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === targetYear &&
        transactionDate.getMonth() === targetMonth
      );
    });
  }

  // Функция для вычисления суммы транзакций
  function calculateTotalAmount(transactions) {
    return transactions?.reduce((total, transaction) => total + transaction.amount, 0);
  }

  // Получаем текущую дату
  const currentDate = new Date();

  // Фильтруем доходы за текущий и предыдущий месяцы
  const currentMonthIncomes = filterTransactionsByMonth(incomes, currentDate);
  const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  const previousMonthIncomes = filterTransactionsByMonth(incomes, previousMonthDate);

  // Фильтруем расходы за текущий и предыдущий месяцы
  const currentMonthExpenses = filterTransactionsByMonth(expenses, currentDate);
  const previousMonthExpenses = filterTransactionsByMonth(expenses, previousMonthDate);

  // Вычисляем суммы доходов и расходов за текущий и предыдущий месяцы
  const currentMonthIncomeTotal = calculateTotalAmount(currentMonthIncomes);
  const previousMonthIncomeTotal = calculateTotalAmount(previousMonthIncomes);
  const currentMonthExpenseTotal = calculateTotalAmount(currentMonthExpenses);
  const previousMonthExpenseTotal = calculateTotalAmount(previousMonthExpenses);

  // Вычисляем процентное изменение доходов и расходов
  let incomeChangePercentage = 0;
  let expenseChangePercentage = 0;

  if (previousMonthIncomeTotal > 0) {
    incomeChangePercentage = ((currentMonthIncomeTotal - previousMonthIncomeTotal) / previousMonthIncomeTotal) * 100;
  }

  if (previousMonthExpenseTotal > 0) {
    expenseChangePercentage = ((currentMonthExpenseTotal - previousMonthExpenseTotal) / previousMonthExpenseTotal) * 100;
  }

  // Формируем текст уведомления о доходах
  const incomeNotificationText = previousMonthIncomeTotal > 0
    ? (incomeChangePercentage > 0
        ? `За последний месяц ваше кафе принесло доход на ${Math.abs(incomeChangePercentage.toFixed(2))}% больше, чем в прошлом!`
        : (incomeChangePercentage < 0
            ? `За последний месяц ваше кафе принесло доход на ${Math.abs(incomeChangePercentage.toFixed(2))}% меньше, чем в прошлом.`
            : `За последний месяц ваше кафе принесло доход примерно на том же уровне, что и в прошлом.`))
    : `Нет данных за предыдущие периоды для доходов.`;

  // Формируем текст уведомления о расходах
  const expenseNotificationText = previousMonthExpenseTotal > 0
    ? (expenseChangePercentage > 0
        ? `За последний месяц ваши расходы увеличились на ${Math.abs(expenseChangePercentage.toFixed(2))}%!`
        : (expenseChangePercentage < 0
            ? `За последний месяц ваши расходы снизились на ${Math.abs(expenseChangePercentage.toFixed(2))}%!`
            : `Ваши расходы за последний месяц остались примерно на том же уровне.`))
    : `Нет данных за предыдущие периоды для расходов.`;

  return (
    <View style={styles.notation}>
      {currentPage === 'incomes' ? (
        <>
          <Text style={styles.notationTitle}>Уведомление о доходах</Text>
          <Text>{incomeNotificationText}</Text>
          <Image
            style={styles.imageNotation}
            source={require('../img/notation.png')}
            resizeMode='contain'
          />
        </>
      ) : (
        <>
          <Text style={styles.notationTitle}>Уведомление о расходах</Text>
          <Text>{expenseNotificationText}</Text>
          <Image
            style={styles.imageNotation}
            source={require('../img/expensive.png')}
            resizeMode='contain'
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notation: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 12,
    marginBottom: 26,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  notationTitle: {
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: 0.15,
    marginBottom: 10,
  },
  imageNotation: {
    marginTop: -50,
    marginBottom: -8,
    marginRight: -20,
    alignSelf: 'flex-end',
    borderRadius: 15 
  },
});

export default Notation;