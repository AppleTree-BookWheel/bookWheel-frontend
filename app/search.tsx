import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="검색어를 입력하세요"
            value={query}
            onChangeText={setQuery}
            autoFocus={true} // 페이지 진입 시 자동으로 키보드 올리기
            returnKeyType="search"
            // onEndEditing={() => console.log('Search:', query)}
          />
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
      </View>

      {/* 검색 결과 표시 영역 (지금은 비어있음) */}
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {query ? (
          <Text style={styles.resultText}>
            &lsquo;{query}&rsquo; 검색 중...
          </Text>
        ) : (
          <Text style={styles.resultText}>
            최근 검색어 또는 추천 검색어를 표시합니다.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    // iOS의 경우 SafeAreaView가 상단 여백을 처리하지만, Android는 아닐 수 있음
    marginTop: Platform.OS === "android" ? 20 : 0,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 15,
    padding: 5,
  },
  cancelButtonText: {
    color: "#E67E22",
    fontSize: 16,
    fontWeight: "500",
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    paddingTop: 40,
  },
  resultText: {
    fontSize: 16,
    color: "#888",
  },
});
