import { Stack } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';



export default function PartyMainScreen() {
  //샘플용 파티 모집글 데이터
  const sampleParty = [
  { id: "1", title: "글 제목", content: "글 내용", image: require("../assets/images/test_image.jpg") },
  { id: "2", title: "글 제목", content: "글 내용", image: require("../assets/images/test_image.jpg") },
  { id: "3", title: "글 제목", content: "글 내용", image: require("../assets/images/test_image.jpg") },
  { id: "4", title: "글 제목", content: "글 내용", image: require("../assets/images/test_image.jpg") },
  { id: "5", title: "글 제목", content: "글 내용", image: require("../assets/images/test_image.jpg") },
  { id: "6", title: "글 제목", content: "글 내용", image: require("../assets/images/test_image.jpg") },
];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*상단 헤더 커스터마이징*/}
        <Stack.Screen
          options={{
            title: '',
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
              >
                <Ionicons name="search" size={24} color="#000" />
              </TouchableOpacity>
            ),
            }}
        />

        {/*파티 모집 글 컴포넌트*/}
        <View style={styles.partyContainer}>
          {sampleParty.map((party) => (
          <View key = {party.id} style={styles.party}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{party.title}</Text>
              <Text style={styles.content}>{party.content}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={party.image} style={styles.bookImage} />
            </View>
          </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#ffffffff',
  },
  
  partyContainer: {
    flex: 1,
    justifyContent:"flex-start",
    alignItems:"center",
    margin: 30,
  },

  party: {
    flexDirection: 'row',
    alignItems:"center",
    width: '100%',
    maxWidth: 550,
    height: 150,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    marginBottom:60,
  },

  textContainer: {
    flex:1,
    justifyContent:"center",
    alignItems:"flex-start",
    width:'60%',
    paddingLeft: 30,
  },

  imageContainer: {
    flex:1,
    alignItems:"flex-end",
    width:'40%',
    paddingRight:20,
  },

  title: {
    fontSize:24,
    fontWeight:'bold',
  },

  content: {

  },

  bookImage: {
    height: 130,
    width: 110,
  },
});