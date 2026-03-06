import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GameContext } from '../context/GameContext';

export default function TasksScreen() {
  const { score, stats, isDarkMode } = useContext(GameContext);
  const challenges = [
    { id: 1, icon: 'fingerprint', color: '#FF7043', title: 'Tap 10 times', desc: 'Tap on the clicker object 10 times', current: stats.clicks, target: 10 },
    { id: 2, icon: 'gesture-double-tap', color: '#29B6F6', title: 'Double-tap 5 times', desc: 'Double-tap on the clicker 5 times', current: stats.doubleClicks, target: 5 },
    { id: 3, icon: 'chevron-down-circle', color: '#AB47BC', title: 'Long press 3 seconds', desc: 'Hold the clicker for 3 seconds', current: stats.longPresses, target: 1 },
    { id: 4, icon: 'cursor-move', color: '#66BB6A', title: 'Drag the object', desc: 'Drag the clicker around the screen', current: stats.pans, target: 1 },
    { id: 5, icon: 'gesture-swipe-right', color: '#FFA726', title: 'Swipe right', desc: 'Perform a quick swipe right gesture', current: stats.swipesRight, target: 1 },
    { id: 6, icon: 'gesture-swipe-left', color: '#42A5F5', title: 'Swipe left', desc: 'Perform a quick swipe left gesture', current: stats.swipesLeft, target: 1 },
    { id: 7, icon: 'resize', color: '#EC407A', title: 'Pinch to resize', desc: 'Use pinch gesture to resize the clicker', current: stats.pinches, target: 1 },
    { id: 8, icon: 'star-circle', color: '#FFCA28', title: 'Reach 100 points', desc: 'Accumulate a total of 100 points in the counter', current: score, target: 100 },
    { id: 9, icon: 'arrow-left-right', color: '#FF5722', title: 'Swipe Marathon', desc: 'Perform 20 swipes in any direction', current: stats.swipesLeft + stats.swipesRight, target: 20 },
    { id: 10, icon: 'timer-sand', color: '#8D6E63', title: 'The Patient One', desc: 'Perform 5 long-presses (3s each)', current: stats.longPresses, target: 5 }
  ];

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.containerDark]} contentContainerStyle={styles.scrollContent}>
      {challenges.map((item) => (
        <TaskCard key={item.id} item={item} isDarkMode={isDarkMode} />
      ))}
    </ScrollView>
  );
}

const TaskCard = ({ item, isDarkMode }) => {
  const isCompleted = item.current >= item.target;
  const progressPercent = Math.min((item.current / item.target) * 100, 100);
  const displayCurrent = Math.min(item.current, item.target);
  return (
    <View style={[styles.card, isDarkMode && styles.cardDark, isCompleted && (isDarkMode ? styles.cardCompletedDark : styles.cardCompleted)]}>
      <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
        <MaterialCommunityIcons name={item.icon} size={22} color={item.color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, isDarkMode && styles.textDark]}>{item.title}</Text>
        <Text style={[styles.desc, isDarkMode && styles.textDarkHint]}>{item.desc}</Text>
        
        <View style={styles.progressRow}>
          <View style={[styles.progressBarBg, isDarkMode && styles.progressBarBgDark]}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${progressPercent}%`, backgroundColor: item.color }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, isDarkMode && styles.textDarkHint]}>{displayCurrent}/{item.target}</Text>
        </View>
      </View>
      <View style={styles.checkboxContainer}>
        {isCompleted ? (
          <MaterialCommunityIcons name="check-circle" size={26} color="#4CAF50" />
        ) : (
          <MaterialCommunityIcons name="circle-outline" size={26} color={isDarkMode ? "#555" : "#CFD8DC"} />
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardDark: {
    backgroundColor: '#1E1E1E',
  },
  cardCompleted: {
    backgroundColor: '#F2FCF5', 
    borderColor: '#E8F5E9',
  },
  cardCompletedDark: {
    backgroundColor: '#1A2E20',
    borderColor: '#2E4C36',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  textDark: {
    color: '#FFFFFF',
  },
  desc: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
    lineHeight: 18,
  },
  textDarkHint: {
    color: '#AAAAAA',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginRight: 10,
  },
  progressBarBgDark: {
    backgroundColor: '#333333',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    width: 50,
    textAlign: 'right',
  },
  checkboxContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});