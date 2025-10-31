import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// --- 1. Link 컴포넌트 import ---
import { Link } from "expo-router";

// 추천 도서 목록을 위한 로컬 이미지 데이터
const similarBooks = [
  { id: "1", image: require("../../assets/images/test_image.jpg") },
  { id: "2", image: require("../../assets/images/test_image.jpg") },
  { id: "3", image: require("../../assets/images/test_image.jpg") },
  { id: "4", image: require("../../assets/images/test_image.jpg") },
  { id: "5", image: require("../../assets/images/test_image.jpg") },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 헤더: 로고와 아이콘 */}
        <View style={styles.header}>
          <Text style={styles.logo}>책바퀴</Text>
          <View style={styles.headerIcons}>
            {/* 1. Bell Icon (종) */}
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="notifications-outline" size={26} color="black" />
            </TouchableOpacity>
            
            {/* 2. Mail Icon (편지) */}
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="mail-outline" size={26} color="black" />
            </TouchableOpacity>

            {/* 3. Person Icon (사람) - 임시로 /login 링크 유지 */}
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.icon}>
                <Ionicons name="person-outline" size={26} color="black" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* --- 2. 검색창 수정 --- */}
        {/* Link로 감싸서 '/search' (app/search.tsx) 페이지로 이동시킵니다. */}
        <Link href="../search" asChild>
          <TouchableOpacity style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" />
            {/* TextInput을 Text로 변경하여 '가짜' 검색창으로 만듭니다. */}
            <Text style={styles.searchInputText}>검색어를 입력하세요</Text>
          </TouchableOpacity>
        </Link>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- 3. 스타일 수정 ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E67E22",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
  searchContainer: {
    // 이제 TouchableOpacity가 이 스타일을 사용
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    height: 40, // 높이를 명시적으로 지정
  },
  // TextInput 스타일 대신 Text 스타일로 변경
  searchInputText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#888", // placeholder와 비슷하게 보이도록 색상 변경
  },
  mainBanner: {
    height: 500,
    justifyContent: "flex-end",
    marginBottom: 30,
    marginHorizontal: 20,
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 12,
    padding: 20,
  },
  bannerContent: {
    alignItems: "center",
  },
  bannerBadge: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 10,
  },
  bannerButton: {
    backgroundColor: "#D2B48C",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  bannerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  similarSection: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  bookItem: {
    marginRight: 15,
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: "lightgrey",
  },
});
