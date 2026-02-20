import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from './src/screens/HomeScreen';
import { GalleryScreen } from './src/screens/GalleryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { Header } from './src/components/Header';
import { Footer } from './src/components/Footer';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <Header />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
              tabBarIcon: ({ focused, color }) => {
                let iconName;
                if (route.name === 'Головна') iconName = focused ? 'home' : 'home-outline';
                else if (route.name === 'Фотогалерея') iconName = focused ? 'images' : 'images-outline';
                else if (route.name === 'Профіль') iconName = focused ? 'person' : 'person-outline';
                return <Ionicons name={iconName} size={24} color={color} />;
              },
              tabBarShowIcon: true,
              tabBarIndicatorStyle: { backgroundColor: '#005b96' },
              tabBarActiveTintColor: '#005b96',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Головна" component={HomeScreen} />
            <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <Footer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', 
  }
});