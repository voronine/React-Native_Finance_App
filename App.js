import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './src/components/MainPage';
import Menu from './src/components/Menu';
import Footer from './src/components/Footer';
import Income from './src/components/Income';
import Expenses from './src/components/Expenses';
import Category from './src/components/Category';
import { AppProvider } from './src/utils/AppProvider';
import UserProfileScreen from './src/components/UserScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <View style={styles.container}>
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
                    borderBottomWidth: 0,
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
            <Stack.Screen
              name="Profile"
              component={UserProfileScreen}
              options={{
                headerTitle: () => <Footer currentPage="Profile" />,
                headerShown: false,
                headerBackVisible: false,
                footerStyle: {
                  backgroundColor: '#f7f7f7',
                  headerTitleStyle: {
                    borderTopWidth: 0,
                    border: '0px solid fff',
                  },
                },
              }}
            />
          </Stack.Navigator>

          <Footer />

          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
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
