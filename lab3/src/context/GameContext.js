import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GameContext = createContext();
export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [stats, setStats] = useState({
    clicks: 0,
    doubleClicks: 0,
    longPresses: 0,
    pans: 0,
    swipesRight: 0,
    swipesLeft: 0,
    pinches: 0,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@dark_mode');
        if (savedTheme !== null) setIsDarkMode(JSON.parse(savedTheme));
        const savedScore = await AsyncStorage.getItem('@game_score');
        if (savedScore !== null) setScore(JSON.parse(savedScore));
        const savedStats = await AsyncStorage.getItem('@game_stats');
        if (savedStats !== null) setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const saveProgress = async () => {
        try {
          await AsyncStorage.setItem('@game_score', JSON.stringify(score));
          await AsyncStorage.setItem('@game_stats', JSON.stringify(stats));
        } catch (error) {
          console.error('Помилка збереження прогресу:', error);
        }
      };
      saveProgress();
    }
  }, [score, stats, isLoaded]);
  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('@dark_mode', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Помилка збереження теми:', error);
    }
  };

  const addTap = () => {
    setScore(prev => prev + 1);
    setStats(prev => ({ ...prev, clicks: prev.clicks + 1 }));
  };

  const addDoubleTap = () => {
    setScore(prev => prev + 2);
    setStats(prev => ({ ...prev, doubleClicks: prev.doubleClicks + 1 }));
  };

  const addLongPress = () => {
    setScore(prev => prev + 5);
    setStats(prev => ({ ...prev, longPresses: prev.longPresses + 1 }));
  };

  const addPan = () => {
    setStats(prev => ({ ...prev, pans: prev.pans + 1 }));
  };

  const addSwipeRight = () => {
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    setScore(prev => prev + randomPoints);
    setStats(prev => ({ ...prev, swipesRight: prev.swipesRight + 1 }));
  };

  const addSwipeLeft = () => {
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    setScore(prev => prev + randomPoints);
    setStats(prev => ({ ...prev, swipesLeft: prev.swipesLeft + 1 }));
  };

  const addPinch = () => {
    setScore(prev => prev + 3);
    setStats(prev => ({ ...prev, pinches: prev.pinches + 1 }));
  };

  const resetGame = () => {
    setScore(0);
    setStats({
      clicks: 0,
      doubleClicks: 0,
      longPresses: 0,
      pans: 0,
      swipesRight: 0,
      swipesLeft: 0,
      pinches: 0,
    });
  };

  if (!isLoaded) return null;
  return (
    <GameContext.Provider value={{ 
      score, stats, isDarkMode, 
      addTap, addDoubleTap, addLongPress, addPan, addSwipeRight, addSwipeLeft, addPinch,
      resetGame, toggleTheme 
    }}>
      {children}
    </GameContext.Provider>
  );
};