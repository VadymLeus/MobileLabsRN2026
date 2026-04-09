import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register } = useAuth();
  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Некоректний формат email-адреси.';
      case 'auth/email-already-in-use':
        return 'Акаунт з таким email вже існує.';
      case 'auth/weak-password':
        return 'Пароль надто слабкий. Введіть мінімум 6 символів.';
      case 'auth/missing-password':
        return 'Будь ласка, введіть пароль.';
      default:
        return 'Сталася помилка при реєстрації. Спробуйте ще раз.';
    }
  };

  const handleRegister = async () => {
    setErrorMessage('');
    
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      return setErrorMessage('Будь ласка, заповніть усі поля.');
    }
    
    if (password !== confirmPassword) {
      return setErrorMessage('Паролі не співпадають.');
    }

    try {
      await register(email, password, name);
    } catch (error) {
      setErrorMessage(getFriendlyErrorMessage(error.code));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Реєстрація</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Ваше ім'я"
            placeholderTextColor="#8e8e93"
            value={name}
            onChangeText={(text) => { setName(text); setErrorMessage(''); }}
            autoCapitalize="words"
          />
          {name.length > 0 && (
            <TouchableOpacity onPress={() => setName('')} style={styles.iconButton}>
              <MaterialCommunityIcons name="close-circle" size={20} color="#c6c6c8" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            placeholderTextColor="#8e8e93"
            value={email}
            onChangeText={(text) => { setEmail(text); setErrorMessage(''); }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {email.length > 0 && (
            <TouchableOpacity onPress={() => setEmail('')} style={styles.iconButton}>
              <MaterialCommunityIcons name="close-circle" size={20} color="#c6c6c8" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Пароль (мін. 6 символів)"
            placeholderTextColor="#8e8e93"
            value={password}
            onChangeText={(text) => { setPassword(text); setErrorMessage(''); }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
            <MaterialCommunityIcons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#8e8e93" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Підтвердіть пароль"
            placeholderTextColor="#8e8e93"
            value={confirmPassword}
            onChangeText={(text) => { setConfirmPassword(text); setErrorMessage(''); }}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconButton}>
            <MaterialCommunityIcons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#8e8e93" />
          </TouchableOpacity>
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Створити акаунт</Text>
        </TouchableOpacity>
        <Link href="/login" style={styles.link}>
          Вже є акаунт? Увійти
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center', backgroundColor: '#fff' },
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 25, textAlign: 'center', color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginBottom: 15, backgroundColor: '#fff' },
  inputField: { flex: 1, padding: 15, fontSize: 16, color: '#333' },
  iconButton: { padding: 15 },
  errorText: { color: '#FF3B30', fontSize: 14, fontWeight: '500', textAlign: 'center', marginBottom: 15 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { marginTop: 25, color: '#007AFF', textAlign: 'center', fontSize: 16 }
});