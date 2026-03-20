import React, { useContext } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  withSequence, 
  runOnJS 
} from 'react-native-reanimated';
import styled from 'styled-components/native';
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
    <Container isDarkMode={isDarkMode}>
      <ScoreCard isDarkMode={isDarkMode}>
        <ScoreLabel isDarkMode={isDarkMode}>SCORE</ScoreLabel>
        <ScoreValue>{score}</ScoreValue>
      </ScoreCard>
      <ClickerContainer>
        <GestureDetector gesture={combinedGestures}>
          <Clicker isDarkMode={isDarkMode} style={animatedStyle}>
            <MaterialCommunityIcons name="gesture-tap-button" size={36} color="white" />
            <ClickerText>TAP ME</ClickerText>
          </Clicker>
        </GestureDetector>
      </ClickerContainer>
      <LegendCard isDarkMode={isDarkMode}>
        <LegendItem icon="gesture-tap" color="#29B6F6" text="Tap: +1 point" isDarkMode={isDarkMode} />
        <LegendItem icon="gesture-double-tap" color="#FFA726" text="Double-tap: +2 points" isDarkMode={isDarkMode} />
        <LegendItem icon="timer-sand" color="#AB47BC" text="Long-press (3s): +5 points" isDarkMode={isDarkMode} />
        <LegendItem icon="arrow-left-right" color="#EF5350" text="Swipe: +1-10 random points" isDarkMode={isDarkMode} />
        <LegendItem icon="resize" color="#66BB6A" text="Pinch: +3 points" isDarkMode={isDarkMode} />
      </LegendCard>
    </Container>
  );
}

const LegendItem = ({ icon, color, text, isDarkMode }) => (
  <LegendItemContainer>
    <IconBox color={color}>
      <MaterialCommunityIcons name={icon} size={20} color={color} />
    </IconBox>
    <LegendText isDarkMode={isDarkMode}>{text}</LegendText>
  </LegendItemContainer>
);

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => (props.isDarkMode ? '#121212' : '#F5F7FA')};
  align-items: center;
  padding-top: 40px;
  padding-bottom: 20px;
`;

const ScoreCard = styled.View`
  background-color: ${(props) => (props.isDarkMode ? '#1E1E1E' : '#FFFFFF')};
  width: 200px;
  padding-vertical: 20px;
  border-radius: 16px;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  elevation: 3;
`;

const ScoreLabel = styled.Text`
  color: ${(props) => (props.isDarkMode ? '#AAAAAA' : '#888888')};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.5px;
  margin-bottom: 5px;
`;

const ScoreValue = styled.Text`
  color: #29B6F6;
  font-size: 48px;
  font-weight: bold;
`;

const ClickerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Clicker = styled(Animated.View)`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  background-color: #00A8FF;
  justify-content: center;
  align-items: center;
  border-width: 6px;
  border-color: ${(props) => (props.isDarkMode ? '#00334d' : '#E1F5FE')};
  box-shadow: 0px 10px 20px ${(props) => (props.isDarkMode ? 'rgba(0, 91, 130, 0.6)' : 'rgba(0, 168, 255, 0.4)')};
  elevation: 10;
`;

const ClickerText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-top: 8px;
  letter-spacing: 1px;
`;

const LegendCard = styled.View`
  background-color: ${(props) => (props.isDarkMode ? '#1E1E1E' : '#FFFFFF')};
  width: 90%;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  elevation: 3;
`;

const LegendItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const IconBox = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  background-color: ${(props) => `${props.color}15`};
`;

const LegendText = styled.Text`
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : '#555555')};
  font-size: 14px;
  font-weight: 500;
`;