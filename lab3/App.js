import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import GameScreen from './src/screens/GameScreen';
import TasksScreen from './src/screens/TasksScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'ClickaGames') iconName = focused ? 'game-controller' : 'game-controller-outline';
              else if (route.name === 'Taskus') iconName = focused ? 'list' : 'list-outline';
              else if (route.name === 'Settingarus') iconName = focused ? 'settings' : 'settings-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: 'gray',
            headerShown: true,
          })}
        >
          <Tab.Screen name="Гра" component={GameScreen} />
          <Tab.Screen name="Завдання" component={TasksScreen} />
          <Tab.Screen name="Налаштування" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}