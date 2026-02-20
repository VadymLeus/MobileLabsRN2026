// src/screens/DetailsScreen.js
import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { generateNewsItem } from '../data/mockData';

export default function DetailsScreen({ route }) {
  const { item } = route.params;
  
  // Отримуємо об'єкт навігації через хук, як вказано в документації
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: item.title });
  }, [navigation, item.title]);

  const openAnotherNews = () => {
    // Генеруємо нову випадкову новину
    const randomItem = generateNewsItem();
    // Використовуємо PUSH: додає новий екран "Details" у стек, 
    // навіть якщо ми вже знаходимося на екрані "Details"
    navigation.push('Details', { item: randomItem });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.buttonContainer}>
        {/* 1. PUSH: Нашарування екранів */}
        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={openAnotherNews}>
          <Text style={styles.primaryButtonText}>Читати схожу новину (Push)</Text>
        </TouchableOpacity>

        {/* 2. GO BACK: Повернення на один крок назад */}
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Повернутися (Go Back)</Text>
        </TouchableOpacity>

        {/* 3. POP TO TOP: Скидання всього стеку до головного екрану */}
        <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={() => navigation.popToTop()}>
          <Text style={styles.dangerButtonText}>На головну (Pop To Top)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 16, color: '#444', textAlign: 'justify', marginBottom: 30 },
  
  buttonContainer: { width: '100%', gap: 10 },
  button: { padding: 15, borderRadius: 8, alignItems: 'center' },
  
  primaryButton: { backgroundColor: '#007bff' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  
  secondaryButton: { backgroundColor: '#e2e6ea', borderWidth: 1, borderColor: '#dae0e5' },
  secondaryButtonText: { color: '#383d41', fontSize: 16, fontWeight: 'bold' },
  
  dangerButton: { backgroundColor: '#dc3545' },
  dangerButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});