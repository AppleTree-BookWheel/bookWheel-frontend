import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Link } from "expo-router";

import Header from '../../components/Header';

export default function PartyMainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header/>
        <View style={styles.menuContainer}>
          <Link href="/party_joined" asChild>
            <TouchableOpacity>
              <View style={styles.menu}>
                <FontAwesome6 name="user-group" size={36} color="black" />
                <Text style={styles.menuText}>참여 중 파티</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <Link href="/party_find" asChild>
            <TouchableOpacity>
              <View style={styles.menu}>
                <Feather name="book-open" size={36} color="black" />
                <Text style={styles.menuText}>파티 찾기</Text>
              </View>
            </TouchableOpacity>
          </Link>
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
  menuContainer: {
    flex: 1,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    margin: 20,
  },
  menu: {
    flexDirection: 'row',
    alignItems:"center",
    width: '100%',
    height: 100,
    paddingLeft: 20, 
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
  },
  menuText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
});