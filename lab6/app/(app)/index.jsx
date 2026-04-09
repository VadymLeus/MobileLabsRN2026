import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Modal, ScrollView } from 'react-native';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileInput = ({ icon, placeholder, value, onChangeText, keyboardType = 'default', isLast }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <View style={[styles.inputRow, isFocused && styles.inputRowFocused]}>
        <MaterialCommunityIcons 
          name={icon} 
          size={22} 
          color={isFocused ? '#007AFF' : '#8e8e93'} 
          style={styles.icon} 
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8e8e93"
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {value?.length > 0 && isFocused && (
          <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <MaterialCommunityIcons name="close-circle" size={18} color="#c6c6c8" />
          </TouchableOpacity>
        )}
      </View>
      {!isLast && <View style={styles.divider} />}
    </View>
  );
};

export default function Home() {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState({ name: '', age: '', city: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      } catch (error) {
        Alert.alert("Помилка", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, profileData, { merge: true });
      Alert.alert("Успіх", "Профіль оновлено!");
    } catch (error) {
      Alert.alert("Помилка збереження", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const executeDeletion = async () => {
    if (deletePassword.length < 6) return;
    setIsDeleting(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, deletePassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(auth.currentUser);
    } catch (error) {
      setIsDeleting(false);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        Alert.alert("Помилка", "Невірний пароль. Спробуйте ще раз.");
      } else {
        setDeleteModalVisible(false);
        Alert.alert("Помилка видалення", error.message);
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert("Помилка", "Новий пароль має містити мінімум 6 символів.");
      return;
    }
    setIsUpdatingPassword(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Успіх", "Пароль успішно змінено!");
      closePasswordModal();
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        Alert.alert("Помилка", "Невірний поточний пароль.");
      } else {
        closePasswordModal();
        Alert.alert("Помилка зміни пароля", error.message);
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setDeletePassword('');
    setShowDeletePassword(false);
  };

  const closePasswordModal = () => {
    setPasswordModalVisible(false);
    setOldPassword('');
    setShowOldPassword(false);
    setNewPassword('');
    setShowNewPassword(false);
  };

  const executeLogout = () => {
    setLogoutModalVisible(false);
    logout();
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const isConfirmDisabled = deletePassword.length < 6 || isDeleting;
  const isPasswordConfirmDisabled = oldPassword.length === 0 || newPassword.length < 6 || isUpdatingPassword;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ 
        title: 'Особистий кабінет',
        headerShadowVisible: false, 
        headerStyle: { backgroundColor: '#f2f2f7' } 
      }} />
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account" size={60} color="#007AFF" />
        </View>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>
      <Text style={styles.sectionTitle}>Персональні дані</Text>
      <View style={styles.card}>
        <ProfileInput
          icon="card-account-details-outline"
          placeholder="Ваше ім'я"
          value={profileData.name}
          onChangeText={(text) => setProfileData({ ...profileData, name: text })}
        />
        <ProfileInput
          icon="calendar-account-outline"
          placeholder="Ваш вік"
          keyboardType="numeric"
          value={profileData.age}
          onChangeText={(text) => setProfileData({ ...profileData, age: text })}
        />
        <ProfileInput
          icon="map-marker-outline"
          placeholder="Ваше місто"
          value={profileData.city}
          onChangeText={(text) => setProfileData({ ...profileData, city: text })}
          isLast={true}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile} disabled={isSaving}>
        {isSaving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Зберегти зміни</Text>}
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Керування</Text>
      <View style={[styles.card, { marginBottom: 40 }]}>
        <TouchableOpacity style={styles.actionRow} onPress={() => setPasswordModalVisible(true)}>
          <MaterialCommunityIcons name="lock-reset" size={22} color="#FF9500" />
          <Text style={styles.passwordText}>Змінити пароль</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.actionRow} onPress={() => setLogoutModalVisible(true)}>
          <MaterialCommunityIcons name="logout" size={22} color="#007AFF" />
          <Text style={styles.logoutText}>Вийти з системи</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.actionRow} onPress={() => setDeleteModalVisible(true)}>
          <MaterialCommunityIcons name="delete-outline" size={22} color="#FF3B30" />
          <Text style={styles.deleteText}>Видалити акаунт</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={isLogoutModalVisible} onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.iconContainerPrimary}>
              <MaterialCommunityIcons name="logout" size={36} color="#007AFF" />
            </View>
            <Text style={styles.modalTitle}>Вийти з системи?</Text>
            <Text style={styles.modalText}>Ви дійсно хочете завершити поточну сесію та вийти зі свого акаунта?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.confirmBtnPrimary]} onPress={executeLogout}>
                <Text style={styles.confirmBtnText}>Вийти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={isDeleteModalVisible} onRequestClose={closeDeleteModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.iconContainerDanger}>
              <MaterialCommunityIcons name="alert-circle" size={36} color="#FF3B30" />
            </View>
            <Text style={styles.modalTitle}>Видалити акаунт?</Text>
            <Text style={styles.modalText}>Ця дія є незворотною. Всі ваші дані профілю будуть назавжди видалені з бази.</Text>
            <Text style={styles.modalPrompt}>Для підтвердження введіть ваш поточний пароль:</Text>
            <View style={styles.modalInputContainer}>
              <TextInput
                style={styles.modalInputField}
                placeholder="Ваш пароль"
                placeholderTextColor="#8e8e93"
                value={deletePassword}
                onChangeText={setDeletePassword}
                secureTextEntry={!showDeletePassword}
              />
              <TouchableOpacity onPress={() => setShowDeletePassword(!showDeletePassword)} style={styles.modalIconButton}>
                <MaterialCommunityIcons name={showDeletePassword ? "eye-off-outline" : "eye-outline"} size={22} color="#8e8e93" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={closeDeleteModal} disabled={isDeleting}>
                <Text style={styles.cancelBtnText}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.confirmBtnDanger, isConfirmDisabled && styles.disabledBtnDanger]} 
                onPress={executeDeletion}
                disabled={isConfirmDisabled}
              >
                {isDeleting ? <ActivityIndicator color="#fff" size="small" /> : <Text style={[styles.confirmBtnText, isConfirmDisabled && styles.disabledText]}>Підтвердити</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={isPasswordModalVisible} onRequestClose={closePasswordModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.iconContainerWarning}>
              <MaterialCommunityIcons name="lock-reset" size={36} color="#FF9500" />
            </View>
            <Text style={styles.modalTitle}>Змінити пароль</Text>
            <Text style={styles.modalText}>Введіть поточний та новий пароль для вашого акаунту.</Text>
            <View style={[styles.modalInputContainer, { marginBottom: 12 }]}>
              <TextInput
                style={styles.modalInputField}
                placeholder="Поточний пароль"
                placeholderTextColor="#8e8e93"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={!showOldPassword}
              />
              <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={styles.modalIconButton}>
                <MaterialCommunityIcons name={showOldPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#8e8e93" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalInputContainer}>
              <TextInput
                style={styles.modalInputField}
                placeholder="Новий пароль"
                placeholderTextColor="#8e8e93"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.modalIconButton}>
                <MaterialCommunityIcons name={showNewPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#8e8e93" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={closePasswordModal} disabled={isUpdatingPassword}>
                <Text style={styles.cancelBtnText}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.confirmBtnWarning, isPasswordConfirmDisabled && styles.disabledBtnWarning]} 
                onPress={handleUpdatePassword}
                disabled={isPasswordConfirmDisabled}
              >
                {isUpdatingPassword ? <ActivityIndicator color="#fff" size="small" /> : <Text style={[styles.confirmBtnText, isPasswordConfirmDisabled && styles.disabledText]}>Зберегти</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#f2f2f7', paddingHorizontal: 16 },
  profileHeader: { alignItems: 'center', marginVertical: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#e5e5ea', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  emailText: { fontSize: 17, color: '#8e8e93', fontWeight: '500' },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#8e8e93', textTransform: 'uppercase', marginBottom: 8, marginLeft: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 24 },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, minHeight: 54, backgroundColor: '#fff' },
  inputRowFocused: { backgroundColor: '#fafafa' },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 17, color: '#333', paddingVertical: 0 },
  clearButton: { marginLeft: 8 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#c6c6c8', marginLeft: 50 },
  saveButton: { backgroundColor: '#34C759', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 30 },
  saveButtonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, minHeight: 54 },
  passwordText: { fontSize: 17, color: '#FF9500', marginLeft: 12 },
  logoutText: { fontSize: 17, color: '#007AFF', marginLeft: 12 },
  deleteText: { fontSize: 17, color: '#FF3B30', marginLeft: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContainer: { width: '100%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 },
  iconContainerPrimary: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(0, 122, 255, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  iconContainerDanger: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255, 59, 48, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  iconContainerWarning: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255, 149, 0, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10, textAlign: 'center' },
  modalText: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 20, lineHeight: 22 },
  modalPrompt: { fontSize: 14, color: '#444', alignSelf: 'flex-start', marginBottom: 8 },
  boldText: { fontWeight: 'bold', color: '#FF3B30' },
  modalInputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 24, backgroundColor: '#fafafa' },
  modalInputField: { flex: 1, padding: 12, fontSize: 16, color: '#333' },
  modalIconButton: { padding: 12 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 12 },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cancelBtn: { backgroundColor: '#f1f1f1' },
  cancelBtnText: { color: '#444', fontSize: 16, fontWeight: '600' },
  confirmBtnPrimary: { backgroundColor: '#007AFF' },
  confirmBtnDanger: { backgroundColor: '#FF3B30' },
  disabledBtnDanger: { backgroundColor: '#ffb3b0' },
  confirmBtnWarning: { backgroundColor: '#FF9500' },
  disabledBtnWarning: { backgroundColor: '#ffcb80' },
  confirmBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  disabledText: { color: '#fff', opacity: 0.8 }
});