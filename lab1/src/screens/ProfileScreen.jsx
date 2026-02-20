import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const handleRegister = () => {
    Alert.alert("Успіх", "Дані форми відправлено (імітація)");
  };

  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Реєстрація</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder=""
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder=""
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder=""
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Прізвище</Text>
        <TextInput
          style={styles.input}
          value={surname}
          onChangeText={setSurname}
          placeholder=""
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ім'я</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder=""
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});