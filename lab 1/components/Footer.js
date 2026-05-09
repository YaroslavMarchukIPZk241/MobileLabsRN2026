import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Марчук Ярослав Володимирович 2026 ІПЗк-24-1 </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'gray',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});

export default Footer;