import React from 'react';
import styled from 'styled-components/native';
import { useGame } from '../context/GameContext';
import { ThemeMode } from '../theme/theme';

export default function SettingsScreen() {
  const { themeMode, setThemeMode, resetGame, stats } = useGame();

  const selectTheme = (mode: ThemeMode) => {
    if (themeMode !== mode) setThemeMode(mode);
  };

  return (
    <Screen>
      <Card>
        <Title>Тема застосунку</Title>
        <Description>
          Застосунок підтримує світлу та темну тему. Зміна теми також виконує власне завдання у списку challenges.
        </Description>

        <ButtonRow>
          <ThemeButton active={themeMode === 'light'} onPress={() => selectTheme('light')}>
            <ButtonText active={themeMode === 'light'}>☀️ Світла</ButtonText>
          </ThemeButton>
          <ThemeButton active={themeMode === 'dark'} onPress={() => selectTheme('dark')}>
            <ButtonText active={themeMode === 'dark'}>🌙 Темна</ButtonText>
          </ThemeButton>
        </ButtonRow>
      </Card>

      <Card>
        <Title>Поточна статистика</Title>
        <StatText>Очки: {stats.score}</StatText>
        <StatText>Короткі натискання: {stats.taps}</StatText>
        <StatText>Подвійні натискання: {stats.doubleTaps}</StatText>
        <StatText>Довгі натискання: {stats.longPresses}</StatText>
        <StatText>Перетягування: {stats.drags}</StatText>
        <StatText>Свайпи вправо: {stats.swipeRight}</StatText>
        <StatText>Свайпи вліво: {stats.swipeLeft}</StatText>
        <StatText>Зміна розміру: {stats.pinches}</StatText>
      </Card>

      <DangerButton onPress={resetGame}>
        <DangerText>Скинути прогрес гри</DangerText>
      </DangerButton>
    </Screen>
  );
}

const Screen = styled.ScrollView.attrs({ contentContainerStyle: { padding: 16 } })`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Card = styled.View`
  padding: 18px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.card};
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  margin-bottom: 16px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 8px;
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
  line-height: 21px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 18px;
`;

const ThemeButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  align-items: center;
  background-color: ${({ theme, active }) => active ? theme.primary : theme.cardSoft};
`;

const ButtonText = styled.Text<{ active: boolean }>`
  color: ${({ theme, active }) => active ? '#FFFFFF' : theme.text};
  font-weight: 800;
`;

const StatText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  margin-bottom: 7px;
`;

const DangerButton = styled.TouchableOpacity`
  padding: 16px;
  border-radius: 16px;
  align-items: center;
  background-color: #ef4444;
  margin-bottom: 30px;
`;

const DangerText = styled.Text`
  color: white;
  font-weight: 900;
`;
