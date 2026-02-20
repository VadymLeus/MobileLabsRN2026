import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Леус Вадим Олександрович, група ІПЗ-22-3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  }
});