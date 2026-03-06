import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  withSequence, 
  runOnJS 
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GameContext } from '../context/GameContext';

export default function GameScreen() {
  const { 
    score, isDarkMode, addTap, addDoubleTap, addLongPress, 
    addPan, addSwipeRight, addSwipeLeft, addPinch 
  } = useContext(GameContext);

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ],
  }));

  const singleTap = Gesture.Tap().onEnd(() => {
    runOnJS(addTap)();
    scale.value = withSequence(withTiming(0.85, { duration: 50 }), withSpring(1, { damping: 12, stiffness: 300 }));
  });

  const doubleTap = Gesture.Tap().numberOfTaps(2).maxDelay(200).onEnd(() => {
    runOnJS(addDoubleTap)();
    scale.value = withSequence(withTiming(1.2, { duration: 50 }), withSpring(1, { damping: 12, stiffness: 300 }));
  });

  const taps = Gesture.Exclusive(doubleTap, singleTap);

  const longPress = Gesture.LongPress().minDuration(3000)
    .onStart(() => { scale.value = withSpring(1.1); })
    .onEnd(() => {
      runOnJS(addLongPress)();
      scale.value = withSpring(1);
    });

  const swipeRight = Gesture.Fling().direction(Directions.RIGHT).onEnd(() => {
    runOnJS(addSwipeRight)();
    translateX.value = withSequence(withTiming(80, { duration: 100 }), withSpring(0, { damping: 15 }));
  });

  const swipeLeft = Gesture.Fling().direction(Directions.LEFT).onEnd(() => {
    runOnJS(addSwipeLeft)();
    translateX.value = withSequence(withTiming(-80, { duration: 100 }), withSpring(0, { damping: 15 }));
  });

  const swipes = Gesture.Exclusive(swipeRight, swipeLeft);

  const pan = Gesture.Pan().minDistance(20)
    .onChange((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onFinalize(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      runOnJS(addPan)();
    });

  const pinch = Gesture.Pinch()
    .onChange((e) => { scale.value = e.scale; })
    .onFinalize(() => {
      scale.value = withSpring(1);
      runOnJS(addPinch)();
    });

  const combinedGestures = Gesture.Simultaneous(Gesture.Race(taps, longPress, swipes), pan, pinch);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      
      <View style={[styles.scoreCard, isDarkMode && styles.cardDark]}>
        <Text style={[styles.scoreLabel, isDarkMode && styles.textDarkHint]}>SCORE</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <View style={styles.clickerContainer}>
        <GestureDetector gesture={combinedGestures}>
          <Animated.View style={[styles.clicker, isDarkMode && styles.clickerDark, animatedStyle]}>
            <MaterialCommunityIcons name="gesture-tap-button" size={36} color="white" />
            <Text style={styles.clickerText}>TAP ME</Text>
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={[styles.legendCard, isDarkMode && styles.cardDark]}>
        <LegendItem icon="gesture-tap" color="#29B6F6" text="Tap: +1 point" isDarkMode={isDarkMode} />
        <LegendItem icon="gesture-double-tap" color="#FFA726" text="Double-tap: +2 points" isDarkMode={isDarkMode} />
        <LegendItem icon="timer-sand" color="#AB47BC" text="Long-press (3s): +5 points" isDarkMode={isDarkMode} />
        <LegendItem icon="arrow-left-right" color="#EF5350" text="Swipe: +1-10 random points" isDarkMode={isDarkMode} />
        <LegendItem icon="resize" color="#66BB6A" text="Pinch: +3 points" isDarkMode={isDarkMode} />
      </View>

    </View>
  );
}

const LegendItem = ({ icon, color, text, isDarkMode }) => (
  <View style={styles.legendItem}>
    <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
      <MaterialCommunityIcons name={icon} size={20} color={color} />
    </View>
    <Text style={[styles.legendText, isDarkMode && styles.textDark]}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  scoreCard: {
    backgroundColor: 'white',
    width: 200,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1E1E1E',
  },
  scoreLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  textDarkHint: {
    color: '#AAAAAA',
  },
  scoreValue: {
    color: '#29B6F6',
    fontSize: 48,
    fontWeight: 'bold',
  },
  clickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  clicker: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#00A8FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#E1F5FE',
    shadowColor: '#00A8FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  clickerDark: {
    borderColor: '#00334d',
    shadowColor: '#005b82',
  },
  clickerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    letterSpacing: 1,
  },
  legendCard: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  legendText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '500',
  },
  textDark: {
    color: '#FFFFFF',
  }
});