import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { products } from '../../../data/products';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((item) => item.id === String(id));

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundTitle}>Товар не знайдено</Text>
        <Text style={styles.notFoundText}>Перевірте ідентифікатор товару.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: product.name }} />

      <Image source={product.image} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toLocaleString('uk-UA')} грн</Text>

        <Text style={styles.sectionTitle}>Опис товару</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Динамічний маршрут:</Text>
          <Text style={styles.infoValue}>/details/{product.id}</Text>

          <Text style={styles.infoLabel}>Отриманий параметр id:</Text>
          <Text style={styles.infoValue}>{product.id}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
  },
  card: {
    marginTop: 16,
    padding: 18,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  category: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#DBEAFE',
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '800',
  },
  title: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
  },
  price: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '900',
    color: '#16A34A',
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  infoBox: {
    marginTop: 22,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoLabel: {
    marginTop: 4,
    color: '#6B7280',
    fontWeight: '700',
  },
  infoValue: {
    marginTop: 3,
    marginBottom: 8,
    color: '#111827',
    fontWeight: '900',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
  },
  notFoundText: {
    marginTop: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
});