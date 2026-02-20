// src/navigation/AppNavigation.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawer from './CustomDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerToggleButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={styles.menuButton}
      activeOpacity={0.7}
    >
      <Text style={styles.menuIcon}>☰</Text>
    </TouchableOpacity>
  );
};

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ 
          title: 'Новини',
          headerLeft: () => <DrawerToggleButton />
        }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
      />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen 
        name="Новини" 
        component={NewsStack} 
        options={{ headerShown: false }}
      />
      <Drawer.Screen 
        name="Контакти" 
        component={ContactsScreen} 
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 10,
    marginRight: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 28,
    color: '#000',
    lineHeight: 30,
    marginTop: -2,
  }
});