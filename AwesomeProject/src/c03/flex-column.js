import React from 'react';
import {View} from 'react-native';

export default function FlexColumn() {
  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <View style={{height: 50, backgroundColor: 'powderblue'}} />
      <View style={{height: 50, backgroundColor: 'skyblue'}} />
      <View style={{height: 50, backgroundColor: 'steelblue'}} />
    </View>
  );
}
