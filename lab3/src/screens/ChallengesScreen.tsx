import React from 'react';
import styled from 'styled-components/native';
import { useGame } from '../context/GameContext';

type Challenge = {
  id: string;
  icon: string;
  title: string;
  description: string;
  progressText: string;
  done: boolean;
};

export default function ChallengesScreen() {
  const { stats } = useGame();

  const challenges: Challenge[] = [
    {
      id: 'tap10',
      icon: '👆',
      title: 'Tap 10 times',
      description: 'Натиснути на обʼєкт 10 разів',
      progressText: `${Math.min(stats.taps, 10)}/10`,
      done: stats.taps >= 10
    },
    {
      id: 'double5',
      icon: '✨',
      title: 'Double-tap 5 times',
      description: 'Виконати 5 подвійних кліків',
      progressText: `${Math.min(stats.doubleTaps, 5)}/5`,
      done: stats.doubleTaps >= 5
    },
    {
      id: 'long3',
      icon: '🕒',
      title: 'Long press 3 seconds',
      description: 'Утримати обʼєкт 3 секунди',
      progressText: stats.longPresses > 0 ? '1/1' : '0/1',
      done: stats.longPresses > 0
    },
    {
      id: 'drag',
      icon: '🟢',
      title: 'Drag the object',
      description: 'Перемістити обʼєкт по екрану',
      progressText: stats.drags > 0 ? '1/1' : '0/1',
      done: stats.drags > 0
    },
    {
      id: 'swipeRight',
      icon: '➡️',
      title: 'Swipe right',
      description: 'Зробити швидкий свайп вправо',
      progressText: stats.swipeRight > 0 ? '1/1' : '0/1',
      done: stats.swipeRight > 0
    },
    {
      id: 'swipeLeft',
      icon: '⬅️',
      title: 'Swipe left',
      description: 'Зробити швидкий свайп вліво',
      progressText: stats.swipeLeft > 0 ? '1/1' : '0/1',
      done: stats.swipeLeft > 0
    },
    {
      id: 'pinch',
      icon: '🤏',
      title: 'Pinch to resize',
      description: 'Збільшити або зменшити розмір обʼєкта',
      progressText: stats.pinches > 0 ? '1/1' : '0/1',
      done: stats.pinches > 0
    },
    {
      id: 'score100',
      icon: '🏆',
      title: 'Reach 100 points',
      description: 'Набрати 100 очок у лічильнику',
      progressText: `${Math.min(stats.score, 100)}/100`,
      done: stats.score >= 100
    },
    {
      id: 'customTheme',
      icon: '🌙',
      title: 'Custom: change theme',
      description: 'Власне завдання: змінити тему застосунку в налаштуваннях',
      progressText: stats.themeChanges > 0 ? '1/1' : '0/1',
      done: stats.themeChanges > 0
    }
  ];

  const completed = challenges.filter((challenge) => challenge.done).length;

  return (
    <Screen>
      <ProgressCard>
        <ProgressTitle>Виконано завдань</ProgressTitle>
        <ProgressValue>{completed}/{challenges.length}</ProgressValue>
        <ProgressBar><ProgressFill style={{ width: `${(completed / challenges.length) * 100}%` }} /></ProgressBar>
      </ProgressCard>

      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} done={challenge.done}>
          <IconBox>{challenge.icon}</IconBox>
          <ChallengeContent>
            <ChallengeTitle>{challenge.title}</ChallengeTitle>
            <ChallengeDescription>{challenge.description}</ChallengeDescription>
          </ChallengeContent>
          <StatusBox done={challenge.done}>
            <StatusText done={challenge.done}>{challenge.done ? '✓' : challenge.progressText}</StatusText>
          </StatusBox>
        </ChallengeCard>
      ))}
    </Screen>
  );
}

const Screen = styled.ScrollView.attrs({ contentContainerStyle: { padding: 16 } })`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ProgressCard = styled.View`
  padding: 18px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.card};
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  margin-bottom: 16px;
`;

const ProgressTitle = styled.Text`
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
`;

const ProgressValue = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: 900;
  font-size: 26px;
  margin-vertical: 8px;
`;

const ProgressBar = styled.View`
  height: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.border};
  overflow: hidden;
`;

const ProgressFill = styled.View`
  height: 10px;
  background-color: ${({ theme }) => theme.success};
`;

const ChallengeCard = styled.View<{ done: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 14px;
  margin-bottom: 12px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.card};
  border-width: 1px;
  border-color: ${({ theme, done }) => done ? theme.success : theme.border};
`;

const IconBox = styled.Text`
  width: 36px;
  font-size: 20px;
`;

const ChallengeContent = styled.View`
  flex: 1;
`;

const ChallengeTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: 800;
`;

const ChallengeDescription = styled.Text`
  color: ${({ theme }) => theme.muted};
  font-size: 12px;
  margin-top: 3px;
`;

const StatusBox = styled.View<{ done: boolean }>`
  min-width: 42px;
  height: 32px;
  padding-horizontal: 8px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, done }) => done ? theme.success : theme.cardSoft};
`;

const StatusText = styled.Text<{ done: boolean }>`
  color: ${({ theme, done }) => done ? '#FFFFFF' : theme.primary};
  font-weight: 900;
`;
