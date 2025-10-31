import { FontAwesome } from '@expo/vector-icons'; // 아이콘을 사용하기 위해 import
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* FontAwesome 아이콘 사용 */}
      <FontAwesome name="search" size={60} color="#3498db" />
      <Text style={styles.title}>탐색 화면</Text>
      <Text style={styles.subtitle}>이곳에서 새로운 책이나{'\n'}독서 친구를 찾아보세요!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20, // 아이콘과의 간격
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
  },
});
