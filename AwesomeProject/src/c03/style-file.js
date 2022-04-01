import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function StyleFile() {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Hello React!</Text>
        <Text style={styles.text}>Hello 豆花!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderWidth: 1,
    backgroundColor: 'lime',
  },
  text: {
    fontSize: 18,
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: 'gray',
  },
});
