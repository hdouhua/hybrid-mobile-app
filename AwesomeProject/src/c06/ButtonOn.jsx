import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {Styles} from './Styles';

export default function ButtonOn() {
  const handlePressIn = () => {
    console.log('presse in');
  };
  const handlePressOut = () => {
    console.log('presse out');
  };

  return (
    <View>
      <Pressable
        style={Styles.rect}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Text>press on/out</Text>
      </Pressable>
    </View>
  );
}
