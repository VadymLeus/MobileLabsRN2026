// src/screens/ContactsScreen.js
import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { CONTACTS_DATA } from '../data/mockData';

export default function ContactsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
    </View>
  );

  return (
    <SectionList
      sections={CONTACTS_DATA}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: { fontSize: 18, fontWeight: 'bold', backgroundColor: '#f4f4f4', padding: 10 },
  item: { padding: 15, backgroundColor: '#fff' },
  name: { fontSize: 16 },
  role: { fontSize: 14, color: '#888' },
  separator: { height: 1, backgroundColor: '#eee' },
});