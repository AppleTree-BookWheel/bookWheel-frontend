import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
// --- 2. Link 컴포넌트 import ---
import { Link } from 'expo-router';


export default function Header() {
  return (
    <>
        {/* 헤더: 로고와 아이콘 */}
        <View style={styles.header}>
          <Text style={styles.logo}>책바퀴</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
            <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
            {/* --- 3. 로그인 페이지로 이동하는 링크(버튼) 추가 --- */}
            {/* '/login'은 app/login.tsx 파일을 가리킵니다. */}
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Ionicons name="log-out-outline" size={28} color="black" />
              </TouchableOpacity>
            </Link>
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
    </>
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
    // --- 4. 로그아웃 아이콘과의 간격을 위해 오른쪽 마진 추가 ---
    marginRight: 16,
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
});