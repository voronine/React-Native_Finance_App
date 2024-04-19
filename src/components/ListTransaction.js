import React, { useEffect, useState } from 'react';
import { Image, Modal, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const List = ({ visible, onClose, currentPage }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const currency = '$';

  useEffect(() => {
    fetchDataFromStorage();
  }, []);

  useEffect(() => {
    fetchDataFromStorage();
  }, [visible]);

  const keyFetch = currentPage === 'income' ? 'transactions' : 'transactionsExpense';

  const fetchDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem(keyFetch);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const transactionsWithIds = parsedData?.map((transaction) => ({
          ...transaction,
          id: generateUniqueId(),
        }));
        
        setTransactions(getSortData(transactionsWithIds));

      } else {
        console.log('No data found for the key "transactions".');
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  const getSortData = (transactionsWithIds) => {
    transactionsWithIds.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    return transactionsWithIds;
  };

  const generateUniqueId = () => {
    return uuidv4();
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      await AsyncStorage.setItem(keyFetch, JSON.stringify(updatedTransactions));
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Ошибка удаления транзакции:', error);
    }
  };

  const onRefresh = () => {
    fetchDataFromStorage();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  };

  const title = currentPage === 'income' ? 'Доходы' : 'Расходы';
  const minPl = currentPage === 'income' ? '+' : '-';

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <ScrollView
        style={{ flex: 1, width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      >
        <TouchableOpacity style={styles.modalBackground} activeOpacity={1} >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close-circle" size={30} color="gray" />
            </TouchableOpacity>

            <View style={styles.titleView}>
              <Text style={styles.title}>{title}</Text>
            </View>

            <Text style={styles.secondTitle}>Транзакции</Text>

            {transactions?.map((transaction) => (
              <View key={transaction.id} style={styles.transactionsBlock}>
                <View style={styles.containerTransaction}>
                  <View style={styles.mapOut}>
                    
                    {currentPage === 'income' ?
                      (
                        < Image
                      style={styles.imageOut}
                      source={require('../img/in.png')}
                      resizeMode="contain"
                      />
                      ) : (
                        < Image
                        style={styles.imageOut}
                        source={require('../img/out.png')}
                        resizeMode="contain"
                        />
                    )}

                    <View style={styles.blockOut}>
                      <Text style={styles.outText}>{transaction.category}</Text>
                      <Text style={styles.outData}>{transaction.date}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.outCount}>{minPl}{transaction.amount}{currency}</Text>

                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTransaction(transaction.id)}>
              <Ionicons name="close" size={28} color="gray" />
            </TouchableOpacity>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 850,
  },
  modalContainer: {
    width: '95%',
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  transactionsBlock: {
    width: '100%',
    marginTop: 29,
    flexDirection: 'row',
    alignItems: 'center',
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
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  outData: {
    letterSpacing: 0.4,
    color: '#222222',
    opacity: 0.5,
    fontSize: 12,
  },
  outCount: {
    fontSize: 14,
    letterSpacing: 0.1,
    color: '#1D1F22',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  titleView: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,

  },
  secondTitle: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  containerTransaction: {
    width: '65%',
    justifyContent: 'space-between',
  }
});

export default List;