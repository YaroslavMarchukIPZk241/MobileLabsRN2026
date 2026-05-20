import { Link } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

function ProductCard({ item }) {
  return (
    <Link href={`/details/${item.id}`} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        <Image source={item.image} style={styles.image} />

        <View style={styles.cardContent}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price.toLocaleString('uk-UA')} грн</Text>
        </View>
      </Pressable>
    </Link>
  );
}

export default function CatalogScreen() {
  const { logout, user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Каталог товарів</Text>
          <Text style={styles.subtitle}>Користувач: {user?.name || 'Гість'}</Text>
        </View>

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Вийти</Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: '#111827',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#EF4444',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  list: {
    padding: 16,
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  image: {
    width: 116,
    height: 132,
    backgroundColor: '#E5E7EB',
  },
  cardContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  category: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#DBEAFE',
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '800',
  },
  name: {
    marginTop: 9,
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '900',
    color: '#16A34A',
  },
});