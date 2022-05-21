import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function NoData() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.txt}>No Data</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
