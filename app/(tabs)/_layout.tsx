import { Ionicons } from '@expo/vector-icons'; // 이미 사용 중인 아이콘을 사용합니다.
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // 헤더는 각 페이지(index.tsx)에서 관리하므로 여긴 숨깁니다.
        tabBarActiveTintColor: '#E67E22', // '책바퀴' 로고의 주황색
        tabBarInactiveTintColor: '#888', // 비활성 탭 색상
        tabBarStyle: {
          backgroundColor: '#ffffff', // 탭 바 배경색
        },
      }}
    >
      {/* 1. 홈 탭 (index.tsx) */}
      <Tabs.Screen
        name="index" // app/(tabs)/index.tsx 파일을 가리킵니다.
        options={{
          title: '홈', // 탭 바에 표시될 이름
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      
      {/* 2. 친구 탭 (friend.tsx) */}
      <Tabs.Screen
        name="friend" // app/(tabs)/friend.tsx 파일을 가리킵니다.
        options={{
          title: '친구', // 탭 바에 표시될 이름
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
            {/* 3. 내 서재 탭 (library.tsx) - 새로 추가 */}
      <Tabs.Screen
        name="library" // app/(tabs)/library.tsx 파일을 가리킵니다.
        options={{
          title: '서재', // 탭 바에 표시될 이름
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
    
  );
}
