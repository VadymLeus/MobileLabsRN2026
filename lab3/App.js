import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons, Feather } from '@expo/vector-icons';
import GameScreen from './src/screens/GameScreen';
import TasksScreen from './src/screens/TasksScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { GameProvider } from './src/context/GameContext';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarShowLabel: false,
              tabBarStyle: styles.tabBar,
              tabBarItemStyle: styles.tabBarItem,
              headerStyle: styles.header,
              headerTitleAlign: 'left',
              headerShadowVisible: false,
              headerTitle: ({ children }) => (
                <Text style={styles.headerTitle}>{children}</Text>
              ),
              
              headerLeft: () => (
                <TouchableOpacity style={styles.headerIconLeft}>
                  <Feather name="menu" size={28} color="#333" />
                </TouchableOpacity>
              ),
              
              headerRight: () => (
                <TouchableOpacity style={styles.headerIconRight}>
                  <Feather name="search" size={24} color="#666" />
                </TouchableOpacity>
              ),
              
              tabBarIcon: ({ focused }) => {
                let iconName;
                if (route.name === 'Game') iconName = focused ? 'game-controller' : 'game-controller-outline';
                else if (route.name === 'Tasks') iconName = focused ? 'list' : 'list-outline';
                else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
                return (
                  <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                    <Ionicons 
                      name={iconName} 
                      size={24} 
                      color={focused ? '#00A8FF' : '#999'} 
                    />
                  </View>
                );
              },
            })}
          >
            <Tab.Screen 
              name="Game" 
              component={GameScreen} 
              options={{ title: 'Gesture Clicker' }} 
            />
            <Tab.Screen 
              name="Tasks" 
              component={TasksScreen} 
              options={{ title: 'Challenges' }} 
            />
            <Tab.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{ title: 'Settings' }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GameProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    height: 70,
    borderTopWidth: 0,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  activeIconContainer: {
    backgroundColor: '#E1F5FE',
  },
  header: {
    backgroundColor: '#F5F7FA',
    elevation: 0,
    height: 100,
  },
  headerTitle: {
    fontWeight: '400', 
    color: '#333',
    fontSize: 22,
    marginLeft: -15,
  },
  headerIconLeft: {
    marginLeft: 20,
    marginRight: 10,
  },
  headerIconRight: {
    marginRight: 20,
  }
});