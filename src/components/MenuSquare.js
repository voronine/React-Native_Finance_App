import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

let currency = '$';

const MenuSquare = ({currentPage, onAddIncome, openModalList, onAddExpense, budget}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{
          fontSize: 34,
          lineHeight: 48,
          color: '#283570',
          marginBottom: 4,
        }}>
          {budget !== null ? `${budget}${currency}` : 'Loading budget...'}
        </Text>
        <Text style={styles.budgetText}>Ваш бюджет</Text>
      </View>

      
      <View style={styles.squareButtons}>
        {currentPage !== 'income' && (
          <TouchableOpacity
            style={[styles.squareButton, styles.margin]}
            onPress={onAddExpense}
          >
            <Text style={styles.squareText}>
              Добавить расходы
            </Text>
          </TouchableOpacity>
        )}
        
        {currentPage !== 'expenses' && (
          <TouchableOpacity
            style={styles.squareButton}
            onPress={onAddIncome} 
          >
            <Text style={styles.squareText}>
              Добавить доходы</Text>
          </TouchableOpacity>
          )}
      </View>

       <View style={styles.transactions}>
        <Text style={styles.transactionsText}>Транзакции</Text>
          <TouchableOpacity onPress={openModalList}>
            <Text style={styles.squareText}>Все транзакции</Text>
          </TouchableOpacity>
       </View>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  budgetText: {
    fontSize: 16,
    color: '#282828',
  },
  squareButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 33,
  },
  squareButton: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  margin: {
    marginRight: 10,
  },
  squareText: {
    color: '#4183b3',
    fontSize: 14,
    fontWeight: '500',
  },
  transactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  transactionsText: {
    fontSize: 16,
  },
});

export default MenuSquare;