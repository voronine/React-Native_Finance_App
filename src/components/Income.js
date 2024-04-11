import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { getTodayDate } from '../utils/randomDate';
import MenuSquare from './MenuSquare';

const Income = () => {

  let income = 1345;
  let currency = '$';
  const dataToDay = getTodayDate();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // данные рефрешить которые приходят будем
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

          <MenuSquare currentPage={'income'}/>

          <View style={styles.transactionsBlock}>
            <View style={styles.mapOut}>
              <Image
                style={styles.imageOut}
                source={require('../img/in.png')}
                resizeMode='contain'
              />
              <View style={styles.blockOut}>
                <Text style={styles.outText}>Ежедневная прибыль</Text>
                <Text style={styles.outData}>{dataToDay}</Text>
              </View>
            </View>
            <Text style={styles.outCount}>+{income}{currency}</Text>
          </View>
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
    fontWeight: 500,
    fontSize: 20,
    letterSpacing: 0.15,
    marginBottom: 10,
  },
  notationText: {
    fontWeight: 400,
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
    fontFamily: 'Roboto_500Medium',
  },
  outCount: {
    fontSize: 14,
    letterSpacing: 0.1,
    fontFamily: 'Roboto_500Medium',
    color: '#1D1F22',
  },
});

export default Income;