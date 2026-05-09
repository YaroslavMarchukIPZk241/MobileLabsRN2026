import { Text, View, StyleSheet, Image, SafeAreaView, FlatList } from "react-native";

const newsData = [
  { id: "1", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" },
  { id: "2", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" },
  { id: "3", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" },
  { id: "4", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" },
  { id: "5", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" },
  { id: "6", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" },
  { id: "7", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" },
  { id: "8", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" },
  { id: "9", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" },
  { id: "10", title: "Заголовок новини", date: "Дата новини", text: "Короткий текст новини" }
];

export default function AssetMain() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Text style={styles.header}>Новини</Text>
      <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 30 }}
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image style={styles.newsImage} source={require("../assets/img.png")} />
            <View style={styles.newsTextContainer}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  newsItem: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  newsImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  newsDate: {
    fontSize: 12,
    color: "gray",
  },
  newsText: {
    fontSize: 12,
  },
});
