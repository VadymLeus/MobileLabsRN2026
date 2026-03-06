import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import GameScreen from './src/screens/GameScreen';
import TasksScreen from './src/screens/TasksScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { GameProvider, GameContext } from './src/context/GameContext';

const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  const { isDarkMode } = useContext(GameContext);
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: [styles.tabBar, isDarkMode && styles.tabBarDark],
          tabBarItemStyle: styles.tabBarItem,
          headerStyle: [styles.header, isDarkMode && styles.headerDark],
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: ({ children }) => (
            <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>{children}</Text>
          ),
          
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Game') iconName = focused ? 'game-controller' : 'game-controller-outline';
            else if (route.name === 'Tasks') iconName = focused ? 'list' : 'list-outline';
            else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
            return (
              <View style={[styles.iconContainer, focused && (isDarkMode ? styles.activeIconContainerDark : styles.activeIconContainer)]}>
                <Ionicons 
                  name={iconName} 
                  size={24} 
                  color={focused ? '#00A8FF' : (isDarkMode ? '#666' : '#999')} 
                />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Game" component={GameScreen} options={{ title: 'Gesture Clicker' }} />
        <Tab.Screen name="Tasks" component={TasksScreen} options={{ title: 'Challenges' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <MainNavigator />
      </GameProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    height: 85,
    borderTopWidth: 0,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    paddingBottom: 15,
    paddingTop: 10,
  },
  tabBarDark: {
    backgroundColor: '#1E1E1E',
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  activeIconContainer: {
    backgroundColor: '#E1F5FE',
  },
  activeIconContainerDark: {
    backgroundColor: '#00334d',
  },
  header: {
    backgroundColor: '#F5F7FA',
    elevation: 0,
    height: 100,
  },
  headerDark: {
    backgroundColor: '#121212',
  },
  headerTitle: {
    fontWeight: '600',
    color: '#333',
    fontSize: 22,
  },
  textDark: {
    color: '#ffffff',
  }
});