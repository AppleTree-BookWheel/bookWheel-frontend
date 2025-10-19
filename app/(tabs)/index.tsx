import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 추천 도서 목록을 위한 가짜 데이터
const similarBooks = [
  { id: '1', image: require('../../assets/images/test_image.jpg') },
  { id: '2', image: require('../../assets/images/test_image.jpg') },
  { id: '3', image: require('../../assets/images/test_image.jpg') },
  { id: '4', image: require('../../assets/images/test_image.jpg') },
  { id: '5', image: require('../../assets/images/test_image.jpg') },
];

// 함수 이름을 HomeScreen으로 변경하여 명확하게 함
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 헤더: 로고와 아이콘 */}
        <View style={styles.header}>
          <Text style={styles.logo}>책바퀴</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
            <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
            <Ionicons name="menu" size={28} color="black" />
          </View>
        </View>

        {/* 검색창 */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="검색어를 입력하세요"
          />
        </View>

        {/* 메인 배너 */}
        <ImageBackground 
          source={{ uri: 'https://placehold.co/400x300/A9CCE3/FFF?text=Hong+Gildong' }} 
          style={styles.mainBanner}
          imageStyle={{ borderRadius: 12 }}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerBadge}>오늘의 신작</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>바로 읽기</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* 유사한 책 섹션 */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>&lsquo;홍길동전&rsquo;과 유사한 책</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {similarBooks.map((book) => (
              <TouchableOpacity key={book.id} style={styles.bookItem}>
                <Image source={{ uri: book.image }} style={styles.bookImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E67E22',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 16,
  },
  mainBanner: {
    height: 250,
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  bannerContent: {
    alignItems: 'center',
  },
  bannerBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 10,
  },
  bannerButton: {
    backgroundColor: '#D2B48C',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  bannerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  similarSection: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bookItem: {
    marginRight: 15,
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});

