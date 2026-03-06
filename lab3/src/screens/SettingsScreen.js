import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GameContext } from '../context/GameContext';

export default function SettingsScreen() {
  const { resetGame, isDarkMode, toggleTheme } = useContext(GameContext);
  const handleFinalReset = () => {
    Alert.alert(
      "Остаточне підтвердження",
      "Ви абсолютно впевнені? Цю дію НЕМОЖЛИВО скасувати.",
      [
        { text: "Ні, я передумав", style: "cancel" },
        { text: "Так, видалити все", style: "destructive", onPress: resetGame }
      ]
    );
  };

  const handleFirstReset = () => {
    Alert.alert(
      "Скидання прогресу",
      "Ви хочете обнулити всі очки та досягнення?",
      [
        { text: "Скасувати", style: "cancel" },
        { text: "Скинути", style: "destructive", onPress: handleFinalReset }
      ]
    );
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.sectionTitle, isDarkMode && styles.textDarkHint]}>Вигляд</Text>
      <View style={[styles.settingCard, isDarkMode && styles.cardDark]}>
        <View style={styles.settingRow}>
          <View style={styles.settingIconText}>
            <MaterialCommunityIcons 
              name={isDarkMode ? "weather-night" : "weather-sunny"} 
              size={24} 
              color={isDarkMode ? "#FFD54F" : "#FFA000"} 
            />
            <Text style={[styles.settingLabel, isDarkMode && styles.textDark]}>
              Темна тема
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#00A8FF" : "#f4f3f4"}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, isDarkMode && styles.textDarkHint, { marginTop: 30 }]}>
        Управління даними
      </Text>
      
      <TouchableOpacity style={styles.resetButton} onPress={handleFirstReset}>
        <MaterialCommunityIcons name="delete-restore" size={24} color="white" />
        <Text style={styles.resetButtonText}>Скинути прогрес</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    paddingTop: 30,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 10,
    marginLeft: 5,
  },
  settingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#1E1E1E',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 12,
  },
  textDark: {
    color: '#FFFFFF',
  },
  textDarkHint: {
    color: '#AAAAAA',
  },
  resetButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5252',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  hintText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 15,
    paddingHorizontal: 10,
    lineHeight: 18,
  }
});