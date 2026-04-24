import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <DrawerNavigator />
    </NavigationContainer>
  );
}
