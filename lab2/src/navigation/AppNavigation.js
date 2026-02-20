// src/navigation/AppNavigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawer from './CustomDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Новини" component={NewsStack} />
      <Drawer.Screen name="Контакти" component={ContactsScreen} />
    </Drawer.Navigator>
  );
}