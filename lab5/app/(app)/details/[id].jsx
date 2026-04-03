import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { products } from '../../../data/products';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === id);
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(app)');
    }
  };

  const CustomBackButton = () => (
    <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
      <MaterialCommunityIcons name="arrow-left" size={28} color="#007AFF" />
    </TouchableOpacity>
  );
  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ 
          title: 'Помилка',
          headerLeft: () => <CustomBackButton />,
          headerTitleAlign: 'left'
        }} />
        <Text style={styles.errorEmoji}>😕</Text>
        <Text style={styles.errorText}>На жаль, такого товару не існує.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(app)')}>
          <Text style={styles.backButtonText}>Повернутися до каталогу</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ 
        title: product.name,
        headerLeft: () => <CustomBackButton />,
        headerTitleAlign: 'left'
      }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price} грн</Text>
        <Text style={styles.descriptionTitle}>Опис:</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButton: {
    marginLeft: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 2 : 0, 
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    backgroundColor: '#f9f9f9',
  },
  details: {
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});