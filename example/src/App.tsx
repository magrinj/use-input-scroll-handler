import * as React from 'react';

import { StyleSheet, ScrollView, View, TextInput } from 'react-native';
import useInputScrollHandler from 'react-native-use-input-scroll-handler';

export default function App() {
  const { scrollHandler } = useInputScrollHandler();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} {...scrollHandler}>
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
        <TextInput placeholder="Test" />
      </ScrollView>
      <View style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
