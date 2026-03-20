import React, { useContext, useState } from 'react';
import { Switch, Modal } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GameContext } from '../context/GameContext';

export default function SettingsScreen() {
  const { resetGame, isDarkMode, toggleTheme } = useContext(GameContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleConfirmReset = () => {
    resetGame();
    setModalVisible(false);
  };
  return (
    <Container isDarkMode={isDarkMode}>
      <SectionTitle isDarkMode={isDarkMode}>Вигляд</SectionTitle>
      <SettingCard isDarkMode={isDarkMode}>
        <SettingRow>
          <SettingIconText>
            <MaterialCommunityIcons 
              name={isDarkMode ? "weather-night" : "weather-sunny"} 
              size={24} 
              color={isDarkMode ? "#FFD54F" : "#FFA000"} 
            />
            <SettingLabel isDarkMode={isDarkMode}>Темна тема</SettingLabel>
          </SettingIconText>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#00A8FF" : "#f4f3f4"}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </SettingRow>
      </SettingCard>
      <SectionTitle isDarkMode={isDarkMode} style={{ marginTop: 30 }}>
        Управління даними
      </SectionTitle>
      <ResetButton onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="delete-restore" size={24} color="white" />
        <ResetButtonText>Скинути прогрес</ResetButtonText>
      </ResetButton>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalOverlay>
          <ModalCard isDarkMode={isDarkMode}>
            <ModalIconCircle>
              <MaterialCommunityIcons name="alert" size={36} color="#FF5252" />
            </ModalIconCircle>
            <ModalTitle isDarkMode={isDarkMode}>Скидання прогресу</ModalTitle>
            <ModalText isDarkMode={isDarkMode}>
              Ви впевнені, що хочете обнулити всі очки та досягнення? Цю дію неможливо скасувати.
            </ModalText>
            <ModalButtons>
              <ModalCancelButton isDarkMode={isDarkMode} onPress={() => setModalVisible(false)}>
                <ModalCancelText isDarkMode={isDarkMode}>Скасувати</ModalCancelText>
              </ModalCancelButton>
              <ModalConfirmButton onPress={handleConfirmReset}>
                <ModalConfirmText>Скинути</ModalConfirmText>
              </ModalConfirmButton>
            </ModalButtons>
          </ModalCard>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => (props.isDarkMode ? '#121212' : '#F5F7FA')};
  padding: 30px 20px 20px 20px;
`;

const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.isDarkMode ? '#AAAAAA' : '#888888')};
  text-transform: uppercase;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const SettingCard = styled.View`
  background-color: ${(props) => (props.isDarkMode ? '#1E1E1E' : '#FFFFFF')};
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  elevation: 2;
`;

const SettingRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SettingIconText = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SettingLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : '#333333')};
  margin-left: 12px;
`;

const ResetButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #FF5252;
  padding-vertical: 16px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(255, 82, 82, 0.3);
  elevation: 5;
`;

const ResetButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  letter-spacing: 0.5px;
`;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalCard = styled.View`
  background-color: ${(props) => (props.isDarkMode ? '#1E1E1E' : '#FFFFFF')};
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 340px;
  align-items: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  elevation: 10;
`;

const ModalIconCircle = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #FFEBEE;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : '#333333')};
  margin-bottom: 8px;
  text-align: center;
`;

const ModalText = styled.Text`
  font-size: 14px;
  color: ${(props) => (props.isDarkMode ? '#AAAAAA' : '#666666')};
  text-align: center;
  margin-bottom: 24px;
  line-height: 20px;
`;

const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ModalCancelButton = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 14px;
  border-radius: 12px;
  align-items: center;
  background-color: ${(props) => (props.isDarkMode ? '#333333' : '#F5F5F5')};
  margin-right: 10px;
`;

const ModalCancelText = styled.Text`
  color: ${(props) => (props.isDarkMode ? '#FFFFFF' : '#333333')};
  font-size: 15px;
  font-weight: 600;
`;

const ModalConfirmButton = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 14px;
  border-radius: 12px;
  align-items: center;
  background-color: #FF5252;
  margin-left: 10px;
`;

const ModalConfirmText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;