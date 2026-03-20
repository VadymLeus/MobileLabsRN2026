import React, { useContext } from 'react';
import styled from 'styled-components/native';
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
    <Container isDarkMode={isDarkMode}>
      {challenges.map((item) => (
        <TaskCard key={item.id} item={item} isDarkMode={isDarkMode} />
      ))}
    </Container>
  );
}

const TaskCard = ({ item, isDarkMode }) => {
  const isCompleted = item.current >= item.target;
  const progressPercent = Math.min((item.current / item.target) * 100, 100);
  const displayCurrent = Math.min(item.current, item.target);
  return (
    <Card isDarkMode={isDarkMode} isCompleted={isCompleted}>
      <IconBox color={item.color}>
        <MaterialCommunityIcons name={item.icon} size={22} color={item.color} />
      </IconBox>
      <TextContainer>
        <TaskTitle isDarkMode={isDarkMode}>{item.title}</TaskTitle>
        <TaskDesc isDarkMode={isDarkMode}>{item.desc}</TaskDesc>
        <ProgressRow>
          <ProgressBarBg isDarkMode={isDarkMode}>
            <ProgressBarFill widthPercent={progressPercent} fillColor={item.color} />
          </ProgressBarBg>
          <ProgressText isDarkMode={isDarkMode}>{displayCurrent}/{item.target}</ProgressText>
        </ProgressRow>
      </TextContainer>
      <CheckboxContainer>
        {isCompleted ? (
          <MaterialCommunityIcons name="check-circle" size={26} color="#4CAF50" />
        ) : (
          <MaterialCommunityIcons name="circle-outline" size={26} color={isDarkMode ? "#555" : "#CFD8DC"} />
        )}
      </CheckboxContainer>
    </Card>
  );
};

const Container = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 16, paddingBottom: 40 }
})`
  flex: 1;
  background-color: ${(props) => (props.isDarkMode ? '#121212' : '#F5F7FA')};
`;

const Card = styled.View`
  flex-direction: row;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  align-items: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.03);
  elevation: 2;
  border-width: 1px;
  background-color: ${(props) => {
    if (props.isCompleted) return props.isDarkMode ? '#1A2E20' : '#F2FCF5';
    return props.isDarkMode ? '#1E1E1E' : '#FFFFFF';
  }};
  
  border-color: ${(props) => {
    if (props.isCompleted) return props.isDarkMode ? '#2E4C36' : '#E8F5E9';
    return 'transparent';
  }};
`;

const IconBox = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  background-color: ${(props) => `${props.color}15`};
`;

const TextContainer = styled.View`
  flex: 1;
`;

const TaskTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : '#333333')};
`;

const TaskDesc = styled.Text`
  font-size: 13px;
  margin-bottom: 10px;
  line-height: 18px;
  color: ${(props) => (props.isDarkMode ? '#AAAAAA' : '#888888')};
`;

const ProgressRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProgressBarBg = styled.View`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  margin-right: 10px;
  background-color: ${(props) => (props.isDarkMode ? '#333333' : '#E0E0E0')};
`;

const ProgressBarFill = styled.View`
  height: 100%;
  border-radius: 2px;
  width: ${(props) => props.widthPercent}%;
  background-color: ${(props) => props.fillColor};
`;

const ProgressText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  width: 50px;
  text-align: right;
  color: ${(props) => (props.isDarkMode ? '#AAAAAA' : '#999999')};
`;

const CheckboxContainer = styled.View`
  margin-left: 10px;
  justify-content: center;
  align-items: center;
`;