import React from 'react';
import {View, Text} from 'react-native';

export default function TextTest() {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          borderWidth: 1,
          backgroundColor: 'pink',
        }}>
        <Text
          style={{
            fontSize: 18,
            includeFontPadding: false,
            textAlignVertical: 'center',
            color: 'gray',
          }}>
          Hello World!
        </Text>
      </View>
    </View>
  );
}
