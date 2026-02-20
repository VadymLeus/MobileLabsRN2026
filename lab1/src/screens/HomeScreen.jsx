import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
const NEWS_DATA = [
  { id: '1', title: 'Зустрічі гарантів освітніх програм зі здобувачами освіти факультету педагогічних технологій' },
  { id: '2', title: 'Гостьова лекція від запрошеного спікера Юрія Левицького для студентів університету' },
  { id: '3', title: 'Міжнародне визнання науковців Житомирської політехніки' },
  { id: '4', title: 'Зустрічі здобувачів вищої освіти з гарантами освітніх програм спеціальності «Фінанси»' },
  { id: '5', title: '«Чи маю я право 2.0?» – ІІ Всеукраїнська науково-практична студентська конференція' },
  { id: '6', title: 'Візит Радниці–уповноваженої Президента України з питань Фонду Президента України' },
  { id: '7', title: 'Зустріч здобувачів спеціальності G9 (131) «Прикладна механіка» з гарантом освітньої програми' },
  { id: '8', title: 'Англійська без бар’єрів: ветерани та їхні родини опановують іноземну мову' },
  { id: '9', title: 'Студенти факультету ІКТ завершили навчання за програмою Erasmus+' },
];

export const HomeScreen = () => {
  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image 
        source={require('../../assets/background.png')} 
        style={styles.newsImage}
        resizeMode="cover"
      />
      
      <View style={styles.textContainer}>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <Text style={styles.newsDate}>06.02.2026</Text>
        
        <Text style={styles.newsText} numberOfLines={2}>
          Короткий опис новини, який розкриває суть події. Деталі можна дізнатися на сайті університету.
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Новини</Text>
      <FlatList
        data={NEWS_DATA}
        renderItem={renderNewsItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginTop: 15, 
    marginBottom: 15,
    color: '#333'
  },
  listContent: { 
    paddingHorizontal: 15, 
    paddingBottom: 20 
  },
  newsItem: { 
    flexDirection: 'row',
    backgroundColor: '#fff', 
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  newsTitle: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#222',
    marginBottom: 4,
  },
  newsDate: { 
    fontSize: 11, 
    color: '#999', 
    marginBottom: 4 
  },
  newsText: { 
    fontSize: 13,
    color: '#555',
    lineHeight: 18
  }
});