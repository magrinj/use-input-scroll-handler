import * as React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import useInputScrollHandler from 'react-native-use-input-scroll-handler';

import Input from './atoms/Input';

export default function App() {
  const { scrollHandler } = useInputScrollHandler();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} {...scrollHandler}>
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
        <Input placeholder="Test" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  footer: {
    height: 150,
    backgroundColor: 'red',
  },
});
