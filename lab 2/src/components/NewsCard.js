import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function NewsCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', marginHorizontal: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  pressed: { opacity: 0.75 },
  image: { width: '100%', height: 170, backgroundColor: '#dfe7f5' },
  content: { padding: 14 },
  title: { fontSize: 18, fontWeight: '700', color: '#102a43', marginBottom: 6 },
  description: { fontSize: 14, lineHeight: 20, color: '#52606d' },
});
