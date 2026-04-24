import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CustomDrawerContent(props) {
  const currentRoute = props.state.routeNames[props.state.index];
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.profile}>
     <Image source={require('../../assets/images/avatar.jpg')} style={styles.avatar} />
        <Text style={styles.name}>Марчук Ярослав</Text>
        <Text style={styles.group}>Група: ІПЗк-24-1</Text>
      </View>
      <DrawerItem
        label="Новини"
        focused={currentRoute === 'NewsStack'}
        icon={({ color, size }) => <MaterialIcons name="article" color={color} size={size} />}
        onPress={() => props.navigation.navigate('NewsStack')}
      />
      <DrawerItem
        label="Контакти"
        focused={currentRoute === 'Contacts'}
        icon={({ color, size }) => <MaterialIcons name="contacts" color={color} size={size} />}
        onPress={() => props.navigation.navigate('Contacts')}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profile: { padding: 20, marginBottom: 12, backgroundColor: '#1f4b99' },
  avatar: { width: 86, height: 86, borderRadius: 43, marginBottom: 12, borderWidth: 3, borderColor: '#fff' },
  name: { color: '#fff', fontSize: 18, fontWeight: '700' },
  group: { color: '#d9e8ff', marginTop: 4, fontSize: 14 },
});
