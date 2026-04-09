import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Menu from "./Menu";
import { useNavigation } from "@react-navigation/native";

const Header = ({ activeTitle }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Image source={require("../assets/ztu.png")} style={styles.logo} />
        <Text style={styles.title}>FirstMobileApp</Text>
      </View>
      <Menu selected={activeTitle} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight + 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
