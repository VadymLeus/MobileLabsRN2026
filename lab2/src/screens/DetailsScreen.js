// src/screens/DetailsScreen.js
import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({ title: item.title });
  }, [navigation, item.title]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  image: { width: 200, height: 200, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#444', textAlign: 'center' },
});