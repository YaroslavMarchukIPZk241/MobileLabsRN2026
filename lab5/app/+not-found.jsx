import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>Екран не знайдено</Text>
      <Text style={styles.description}>Такого маршруту в застосунку не існує.</Text>
      <Link href="/" style={styles.link}>Повернутися на головну</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  code: {
    fontSize: 58,
    fontWeight: '900',
    color: '#2563EB',
  },
  title: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  link: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
