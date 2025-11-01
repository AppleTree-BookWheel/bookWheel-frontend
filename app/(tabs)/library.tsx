import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

// 내 서재에 표시할 임시 도서 데이터
const myBooks = [
  { id: '1', title: '홍길동전', image: require('../../assets/images/test_image.jpg') },
  { id: '2', title: '홍길동전', image: require('../../assets/images/test_image.jpg') },
  { id: '3', title: '홍길동전', image: require('../../assets/images/test_image.jpg') },
  { id: '4', title: '홍길동전', image: require('../../assets/images/test_image.jpg') },
  { id: '5', title: '홍길동전', image: require('../../assets/images/test_image.jpg') },
  { id: '6', title: '홍길동전', image: require('../../assets/images/test_image.jpg') },
];

// 정렬 옵션 목록
const sortOptions = [
  '최근 담은 순', '최근 본 순', 
  '책 제목 순', '저자명 순', 
  '최근 발행 순', '출판사 순'
];

export default function LibraryScreen() {
  const [modalVisible, setModalVisible] = useState(false); // 정렬 모달 표시 여부
  const [sortOption, setSortOption] = useState('최근 본 순'); // 현재 선택된 정렬 옵션

  // 책 그리드 아이템 렌더링
  const renderBookItem = ({ item }: { item: typeof myBooks[0] }) => (
    <TouchableOpacity style={styles.bookItem}>
      <Image source={item.image} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 홈 화면과 동일한 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logo}>책바퀴</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="notifications-outline" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="mail-outline" size={26} color="black" />
          </TouchableOpacity>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="person-outline" size={26} color="black" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* 2. 홈 화면과 동일한 검색창 */}
      <Link href="/search" asChild>
        <TouchableOpacity style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" />
          <Text style={styles.searchInputText}>검색어를 입력하세요</Text>
        </TouchableOpacity>
      </Link>

      {/* 3. '내 서재' 타이틀 및 정렬 버튼 */}
      <View style={styles.libraryHeader}>
        <Text style={styles.pageTitle}>내 서재</Text>
        <TouchableOpacity style={styles.sortButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="swap-vertical" size={16} color="#555" />
          <Text style={styles.sortButtonText}>{sortOption}</Text>
        </TouchableOpacity>
      </View>

      {/* 4. 책 목록 그리드 */}
      <FlatList
        data={myBooks}
        renderItem={renderBookItem}
        keyExtractor={item => item.id}
        numColumns={2} // 2열 그리드
        contentContainerStyle={styles.bookList}
      />

      {/* 5. 정렬 옵션 모달 (Bottom Sheet) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          {/* 모달 배경 (어둡게 처리) */}
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              {/* 모달 콘텐츠 */}
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>정렬</Text>
                
                {/* 정렬 옵션 버튼 그리드 */}
                <View style={styles.sortOptionsGrid}>
                  {sortOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.sortOptionButton,
                        sortOption === option && styles.sortOptionButtonActive
                      ]}
                      onPress={() => setSortOption(option)}
                    >
                      <Text style={[
                        styles.sortOptionText,
                        sortOption === option && styles.sortOptionTextActive
                      ]}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 닫기 / 적용하기 버튼 */}
                <View style={styles.modalActions}>
                  <TouchableOpacity style={[styles.modalButton, styles.closeButton]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>닫기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.applyButton]} 
                    onPress={() => {
                      // TODO: 정렬 로직 실제로 적용
                      setModalVisible(false); // 모달 닫기
                    }}
                  >
                    <Text style={styles.applyButtonText}>적용하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // --- 헤더 및 검색창 스타일 (index.tsx와 동일) ---
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
    marginLeft: 18,
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
    height: 40, 
  },
  searchInputText: { 
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#888', 
  },
  // --- '내 서재' 전용 스타일 ---
  libraryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  sortButtonText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#555',
  },
  // --- 책 그리드 스타일 ---
  bookList: {
    paddingHorizontal: 15, // 좌우 여백
  },
  bookItem: {
    flex: 1, // 각 아이템이 2열 중 1칸을 차지
    margin: 5,
    alignItems: 'center',
  },
  bookImage: {
    width: '100%',
    height: 220, // 책 표지 높이
    borderRadius: 8,
    backgroundColor: 'lightgrey',
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  // --- 정렬 모달 스타일 ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    justifyContent: 'flex-end', // 화면 하단에 위치
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30, // 하단 여백 추가
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sortOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 2열로 자동 줄바꿈
    justifyContent: 'space-between',
    width: '100%',
  },
  sortOptionButton: {
    width: '48%', // 2열 배치 (간격 포함)
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  sortOptionButtonActive: {
    backgroundColor: '#E67E22', // 활성 버튼 색상
    borderWidth: 2,
    borderColor: '#D35400',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
  },
  sortOptionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: '#A0A0A0',
    marginRight: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#E67E22',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

