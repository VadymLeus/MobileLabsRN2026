import React, { createContext, useState } from 'react';

export const GameContext = createContext();
export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({
    clicks: 0,
    doubleClicks: 0,
    longPresses: 0,
    pans: 0,
    swipesRight: 0,
    swipesLeft: 0,
    pinches: 0,
  });

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

  return (
    <GameContext.Provider value={{ 
      score, stats, 
      addTap, addDoubleTap, addLongPress, addPan, addSwipeRight, addSwipeLeft, addPinch 
    }}>
      {children}
    </GameContext.Provider>
  );
};