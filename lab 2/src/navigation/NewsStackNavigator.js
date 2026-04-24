import React from 'react';
import { Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function NewsStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1f4b99' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'Новини',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginRight: 16 }}
            >
              <MaterialIcons name="menu" size={28} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params?.news?.title ?? 'Деталі' })}
      />
    </Stack.Navigator>
  );
}
