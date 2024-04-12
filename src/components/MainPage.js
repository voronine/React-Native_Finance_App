import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import { getTodayDate } from '../utils/randomDate';
import GroupedBars from './BarChart';
import MenuSquare from './MenuSquare';
import ModalComponent from './ModalComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalExpense from './ModalExpense';

const MainPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleExpense, setModalVisibleExpense] = useState(false);


  useEffect(() => {
    fetchDataFromAsyncStorage();
  }, []);

  const fetchDataFromAsyncStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('my_data_key');
      if (data !== null) {
        // setMyData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDataFromAsyncStorage().then(() => {
      setRefreshing(false);
    });
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

  let income = 1345;
  let arent = 345;
  let currency = '$';
  const dataToDay = getTodayDate();

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
            <MenuSquare currentPage={''} onAddIncome={openModal} onAddExpense={openModalExpense}/>
            <View style={styles.transactionsBlock}>
              <View style={styles.mapOut}>
                {/* Изображение и текст для "Аренда" */}
              </View>
              {/* Текст суммы для "Аренда" */}
            </View>
            <View style={styles.transactionsBlock}>
              <View style={styles.mapOut}>
                {/* Изображение и текст для "Ежедневная прибыль" */}
              </View>
              {/* Текст суммы для "Ежедневная прибыль" */}
            </View>
          </View>
        </View>
        <GroupedBars />
      </View>
      <ModalComponent visible={modalVisible} onClose={closeModal} />
      <ModalExpense visible={modalVisibleExpense} onClose={closeModalExpense} />
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
});

export default MainPage;