import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadAuthStatus = async () => {
      try {
        const savedStatus = await AsyncStorage.getItem('isAuthenticated');
        if (savedStatus === 'true') {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthStatus();
  }, []);

  const login = async (email, password) => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem('isAuthenticated', 'true');
    router.replace('/(app)');
  };

  const register = async (email, password, name) => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem('isAuthenticated', 'true');
    router.replace('/(app)');
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}