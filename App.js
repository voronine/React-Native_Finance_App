import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MainPage from './src/components/MainPage';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/components/Menu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './src/components/Footer';
import Income from './src/components/Income';
import Expenses from './src/components/Expenses';
import Category from './src/components/Category';
import { AppProvider } from './src/utils/AppProvider';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <AppProvider>
      <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainPage}
            options={{
              headerTitle: () => <Menu currentPage="Home" />,
              headerShown: true,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: '#f7f7f7',
                headerTitleStyle: {
                  borderBottomWidth: 0,
                  border: '0px solid black',
                },
              },
            }}
          />
          <Stack.Screen
            name="Income"
            component={Income}
            options={{
              headerTitle: () => <Menu currentPage="Income" />,
              headerShown: true,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: '#f7f7f7',
                headerTitleStyle: {
                  borderBottomWidth: 0,
                  border: '0px solid black',

                },
              },
            }}
          />
          <Stack.Screen
            name="Expenses"
            component={Expenses}
            options={{
              headerTitle: () => <Menu currentPage="Expenses" />,
              headerShown: true,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: '#f7f7f7',
                headerTitleStyle: {
                  borderBottom: 0,
                  border: '0px solid black',

                },
              },
            }}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{
              headerTitle: () => <Menu currentPage="Category" />,
              headerShown: true,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: '#f7f7f7',
                headerTitleStyle: {
                  borderBottomWidth: 0,
                  border: '0px solid black',
                },
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <Footer />
      <StatusBar style="auto" />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderWidth: 0,
  },
});
