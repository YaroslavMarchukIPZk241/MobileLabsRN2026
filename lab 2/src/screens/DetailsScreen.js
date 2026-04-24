import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({ route }) {
  const { news } = route.params;
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={news.image} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.id}>ID: {news.id}</Text>
        <Text style={styles.description}>{news.description}</Text>
        <Text style={styles.description}>
          хочемо зазначити що цей текст може мінятись в прямому ефірі, це не стосується того що в політехніку приїхали естонські гості , редакція просто хизується цим текстом
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7fb' },
  content: { padding: 16 },
  image: { width: '100%', height: 230, borderRadius: 18, marginBottom: 16, backgroundColor: '#dfe7f5' },
  card: { backgroundColor: '#fff', padding: 18, borderRadius: 18, elevation: 2 },
  title: { fontSize: 24, fontWeight: '800', color: '#102a43', marginBottom: 8 },
  id: { color: '#1f4b99', fontWeight: '700', marginBottom: 14 },
  description: { color: '#52606d', fontSize: 16, lineHeight: 24, marginBottom: 12 },
});
