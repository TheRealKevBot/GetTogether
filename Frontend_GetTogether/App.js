import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import Main from './pages/Main'

export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.app}>
        <Main />    
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'black',
    width: "100%",
    height: "100%",
  },
});
