// src/screens/MainScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { INITIAL_NEWS } from '../data/mockData';

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(INITIAL_NEWS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const flatListRef = useRef(null);
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const refreshedItems = Array.from({ length: 15 }).map(() => {
        const randomNum = Math.floor(Math.random() * 10000);
        return {
          id: Math.random().toString(36).substring(2, 11),
          title: `Новина #${randomNum}`,
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
          image: `https://picsum.photos/seed/${randomNum}/200/200`,
        };
      });
      setNews(refreshedItems);
      setIsRefreshing(false);
    }, 1500);
  };

  const loadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }).map(() => {
        const randomNum = Math.floor(Math.random() * 10000);
        return {
          id: Math.random().toString(36).substring(2, 11),
          title: `Новина #${randomNum}`,
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
          image: `https://picsum.photos/seed/${randomNum}/200/200`,
        };
      });
      setNews([...news, ...newItems]);
      setIsLoadingMore(false);
    }, 1500);
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
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
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
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
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={<Text style={styles.headerText}>Останні новини</Text>}
        ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#0000ff" style={styles.loader} /> : null}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {showScrollTop && (
        <TouchableOpacity style={styles.fab} onPress={scrollToTop}>
          <Text style={styles.fabIcon}>↑</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  itemContainer: { flexDirection: 'row', padding: 15, backgroundColor: '#fff' },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  textContainer: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  separator: { height: 1, backgroundColor: '#e0e0e0' },
  headerText: { fontSize: 22, fontWeight: 'bold', margin: 15, textAlign: 'center' },
  loader: { marginVertical: 20 },
  
  fab: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    backgroundColor: '#007bff',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  fabIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  }
});