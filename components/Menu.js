import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const Menu = ({ selected, navigation }) => {
  const pages = [
    { label: "Головна", icon: require("../assets/home.png") },
    { label: "Галерея", icon: require("../assets/galary.png") },
    { label: "Профіль", icon: require("../assets/avatar.png") },
  ];

  return (
    <View style={styles.menu}>
      {pages.map((page) => (
        <TouchableOpacity
          key={page.label}
          style={[styles.tab, selected === page.label && styles.activeTab]}
          onPress={() => navigation.navigate(page.label)}
        >
          <Image source={page.icon} style={styles.icon} />
          <Text style={[styles.tabText, selected === page.label && styles.activeText]}>
            {page.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  tabText: {
    fontSize: 12,
    color: "#777",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#0057b8",
  },
  activeText: {
    color: "#0057b8",
    fontWeight: "bold",
  },
});

export default Menu;
