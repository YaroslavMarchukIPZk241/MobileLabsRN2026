import { View, Image, StyleSheet, FlatList } from "react-native";

const images = [
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png")
];

export default function PhotoGalery() {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item} style={styles.image} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    width: 150,
    height: 100,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
