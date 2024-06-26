import React, { useEffect, useState } from 'react';
import { Image, Modal, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const ListAll = ({ visible, onClose, allTransactions }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const currency = '$';

  useEffect(() => {
    fetchDataFromStorage();
  }, [visible]);

  const fetchDataFromStorage = async () => {
    const transactionsWithIds = allTransactions?.map((transaction) => ({
      ...transaction,
      id: generateUniqueId(),
    }));

    // Sort transactions by date in descending order (latest first)
    transactionsWithIds.sort((a, b) => new Date(b.date) - new Date(a.date));

    setTransactions(transactionsWithIds);
  };

  const generateUniqueId = () => {
    return uuidv4();
  };

  const onRefresh = () => {
    fetchDataFromStorage();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  };

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
              <Ionicons name="close" size={35} color="gray" />
            </TouchableOpacity>

            <View style={styles.titleView}>
              <Text style={styles.title}>Все транзакции</Text>
            </View>

            <Text style={styles.secondTitle}>Транзакции</Text>

            {transactions.map((transaction, index) => (
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
    height: "100%",
  },
  modalContainer: {
    width: '95%',
    height:3000,
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
  },
  incomeText: {
    color: 'green',
  },
  expenseText: {
    color: 'red',
  },
});

export default ListAll;