import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { GameProvider, useGame } from './src/context/GameContext';
import HomeScreen from './src/screens/HomeScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { darkTheme, lightTheme } from './src/theme/theme';

export type RootTabParamList = {
  Home: undefined;
  Challenges: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function AppNavigator() {
  const { themeMode } = useGame();
  const appTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  const navigationTheme = {
    ...(themeMode === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(themeMode === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: appTheme.background,
      card: appTheme.card,
      text: appTheme.text,
      primary: appTheme.primary,
      border: appTheme.border
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer theme={navigationTheme}>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
            tabBarActiveTintColor: appTheme.primary,
            tabBarInactiveTintColor: appTheme.muted,
            headerTitleAlign: 'center'
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Gesture Clicker', tabBarLabel: 'Гра', tabBarIcon: () => <Text>▶️</Text> }}
          />
          <Tab.Screen
            name="Challenges"
            component={ChallengesScreen}
            options={{ title: 'Завдання', tabBarLabel: 'Завдання', tabBarIcon: () => <Text>▦</Text> }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Налаштування', tabBarLabel: 'Налаштування', tabBarIcon: () => <Text>⚙️</Text> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </GestureHandlerRootView>
  );
}
