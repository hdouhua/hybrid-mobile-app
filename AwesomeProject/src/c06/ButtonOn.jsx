import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {Styles} from './Styles';

export default function ButtonOn() {
  const handlePress = () => {
    console.log('presse');
  };
  const handlePressIn = () => {
    console.log('presse in');
  };
  const handlePressOut = () => {
    console.log('presse out');
  };
  const handleLongPress = () => {
    console.log('long presse');
  };

  return (
    <View>
      <Pressable
        style={Styles.rect}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Text>press on/out</Text>
      </Pressable>
    </View>
  );
}
