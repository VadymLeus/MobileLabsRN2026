import React from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
const GALLERY_ITEMS = Array.from({ length: 10 }, (_, index) => ({ id: index.toString() }));

export const GalleryScreen = () => {
  
  const renderItem = () => (
    <View style={styles.photoPlaceholder} />
  );

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={GALLERY_ITEMS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screenContainer: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  listContent: { 
    padding: 10, 
    paddingTop: 20 
  },
  row: {
    justifyContent: 'space-between',
  },
  photoPlaceholder: {
    width: (width - 40) / 2, 
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});