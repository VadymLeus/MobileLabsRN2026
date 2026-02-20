// src/screens/MainScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { INITIAL_NEWS } from '../data/mockData';

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(INITIAL_NEWS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setNews(INITIAL_NEWS);
      setIsRefreshing(false);
    }, 1500);
  };

  const loadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }).map((_, i) => ({
        id: `news-${news.length + i}`,
        title: `Новина #${news.length + i + 1} (Завантажено)`,
        description: `Додатковий опис для підвантаженої новини #${news.length + i + 1}.`,
        image: `https://picsum.photos/seed/${news.length + i}/200/200`,
      }));
      setNews([...news, ...newItems]);
      setIsLoadingMore(false);
    }, 1500);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<Text style={styles.headerText}>Останні новини</Text>}
      ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: { flexDirection: 'row', padding: 15, backgroundColor: '#fff' },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  textContainer: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  separator: { height: 1, backgroundColor: '#e0e0e0' },
  headerText: { fontSize: 22, fontWeight: 'bold', margin: 15, textAlign: 'center' },
});