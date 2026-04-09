import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const { login, resetPassword } = useAuth();
  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Некоректний формат email-адреси.';
      case 'auth/user-disabled':
        return 'Цей акаунт було заблоковано.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Невірний email або пароль.';
      case 'auth/missing-password':
        return 'Будь ласка, введіть пароль.';
      default:
        return 'Сталася помилка при авторизації. Спробуйте ще раз.';
    }
  };

  const handleLogin = async () => {
    setErrorMessage(''); 
    if (!email.trim() || !password.trim()) {
      return setErrorMessage('Будь ласка, заповніть усі поля.');
    }
    try {
      await login(email, password);
    } catch (error) {
      setErrorMessage(getFriendlyErrorMessage(error.code));
    }
  };

  const handleResetPassword = async () => {
    setErrorMessage('');
    if (!email.trim()) {
      return setErrorMessage("Введіть ваш email у поле вище для відновлення.");
    }
    try {
      await resetPassword(email);
      setErrorMessage("✅ Лист для відновлення надіслано!");
    } catch (error) {
      setErrorMessage(getFriendlyErrorMessage(error.code));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід в акаунт</Text>
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
          placeholder="Пароль"
          placeholderTextColor="#8e8e93"
          value={password}
          onChangeText={(text) => { setPassword(text); setErrorMessage(''); }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
          <MaterialCommunityIcons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#8e8e93" />
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={[styles.errorText, errorMessage.includes('✅') && { color: '#34C759' }]}>
          {errorMessage}
        </Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Увійти</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResetPassword}>
        <Text style={styles.resetText}>Забули пароль?</Text>
      </TouchableOpacity>
      <Link href="/register" style={styles.link}>
        Немає акаунту? Зареєструватися
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginBottom: 15, backgroundColor: '#fff' },
  inputField: { flex: 1, padding: 15, fontSize: 16, color: '#333' },
  iconButton: { padding: 15 },
  errorText: { color: '#FF3B30', fontSize: 14, fontWeight: '500', textAlign: 'center', marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resetText: { color: '#FF3B30', textAlign: 'center', marginBottom: 20, fontSize: 15, fontWeight: '600' },
  link: { color: '#007AFF', textAlign: 'center', fontSize: 16 }
});