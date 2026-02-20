import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image 
        source={require('../../assets/logo-ztu.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>FirstMobileApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 120,
    height: 40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  }
});