import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NewsStackNavigator from './NewsStackNavigator';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#1f4b99' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Drawer.Screen
        name="NewsStack"
        component={NewsStackNavigator}
        options={{ title: 'Новини', headerShown: false }}
      />
      <Drawer.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Контакти' }} />
    </Drawer.Navigator>
  );
}
