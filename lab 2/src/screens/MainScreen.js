import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import NewsCard from '../components/NewsCard';
import { createNews, getNewsImage } from '../data/news';

export default function MainScreen({ navigation }) {
  const [items, setItems] = useState(createNews(1, 20));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const nextRefreshCount = refreshCount + 1;
      const updatedNews = {
        id: `updated-${Date.now()}`,
        title: `Оновлена новина ${nextRefreshCount}`,
        description: `Ця новина додана після Pull-to-Refresh. Час оновлення: ${new Date().toLocaleTimeString()}.`,
        image: getNewsImage(nextRefreshCount),
      };

      setItems([updatedNews, ...createNews(1, 19)]);
      setRefreshCount(nextRefreshCount);
      setRefreshing(false);
    }, 1200);
  }, [refreshCount]);

  const loadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setItems(prev => [...prev, ...createNews(prev.length + 1, 10)]);
      setLoadingMore(false);
    }, 900);
  };

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <NewsCard
          item={item}
          onPress={() => navigation.navigate('Details', { news: item })}
        />
      )}
      contentContainerStyle={styles.list}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      initialNumToRender={8}
      maxToRenderPerBatch={6}
      windowSize={7}
      ListHeaderComponent={<Text style={styles.header}>Останні новини</Text>}
      ListFooterComponent={
        <View style={styles.footer}>
          {loadingMore ? <ActivityIndicator size="small" /> : <Text style={styles.footerText}>Прокрутіть нижче для підвантаження</Text>}
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 18, backgroundColor: '#f4f7fb' },
  header: { marginHorizontal: 16, marginBottom: 16, fontSize: 28, fontWeight: '800', color: '#102a43' },
  footer: { height: 64, alignItems: 'center', justifyContent: 'center' },
  footerText: { color: '#7b8794' },
  separator: { height: 14 },
});
