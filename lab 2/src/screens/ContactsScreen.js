import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { contactSections } from '../data/contacts';

export default function ContactsScreen() {
  return (
    <SectionList
      sections={contactSections}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.subText}>contact@example.com</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.container}
      stickySectionHeadersEnabled
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f4f7fb' },
  sectionHeader: { paddingVertical: 10, paddingHorizontal: 12, marginTop: 8, borderRadius: 12, overflow: 'hidden', backgroundColor: '#1f4b99', color: '#fff', fontSize: 17, fontWeight: '800' },
  item: { backgroundColor: '#fff', padding: 16, borderRadius: 14 },
  itemText: { fontSize: 16, fontWeight: '700', color: '#102a43' },
  subText: { marginTop: 4, color: '#7b8794' },
  separator: { height: 10 },
});
