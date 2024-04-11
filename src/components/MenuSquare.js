import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const MenuSquare = ({currentPage, onAddExpenses}) => {
  let budget = 42305;
  let currency = '$';

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.budget}>{budget}{currency}</Text>
        <Text style={styles.budgetText}>Ваш бюджет</Text>
      </View>

      
      <View style={styles.squareButtons}>
        {currentPage !== 'income' && (
          <TouchableOpacity
            style={[styles.squareButton, styles.margin]}
            onPress={onAddExpenses}
          >
            <Text style={styles.squareText}>Добавить расходы</Text>
          </TouchableOpacity>
        )}
        
        {currentPage !== 'expenses' && (
        <TouchableOpacity style={styles.squareButton}>
           <Text style={styles.squareText}>Добавить доходы</Text>
          </TouchableOpacity>
          )}
      </View>

       <View style={styles.transactions}>
        <Text style={styles.transactionsText}>Транзакции</Text>
          <TouchableOpacity>
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
  budget: {
    fontSize: 34,
    lineHeight: 48,
    color: '#283570',
    marginBottom: 4,
    fontFamily: 'Roboto_500Medium',
  },
  budgetText: {
    fontSize: 16,
    color: '#282828',
    fontFamily: 'Roboto_500Medium',
  },
  squareButtons: {
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
    fontFamily: 'Roboto_500Medium',
    color: '#4183b3',
    fontSize: 16,
  },
  transactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  transactionsText: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default MenuSquare;