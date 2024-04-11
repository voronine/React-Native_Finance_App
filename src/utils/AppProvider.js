import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

// Компонент-поставщик контекста
export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('App ');

  useEffect(() => {
    const loadPage = async () => {
      try {
        const savedPage = await AsyncStorage.getItem('category');
        if (savedPage !== null) {
          setCurrentPage(savedPage);
        }
      } catch (error) {
        console.error('Error loading page:', error);
      }
    };

    loadPage();
  }, []);

  const updatePage = async (page) => {
    try {
      setCurrentPage(page);
      await AsyncStorage.setItem('currentPage', page);
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  return (
    <AppContext.Provider value={{ currentPage, updatePage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
