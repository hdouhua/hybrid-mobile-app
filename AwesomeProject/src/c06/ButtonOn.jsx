import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {Styles} from './Styles';

export default function ButtonOn() {
  const handlePress = () => {
    console.debug('presse');
  };
  const handlePressIn = () => {
    console.debug('presse in');
  };
  const handlePressOut = () => {
    console.debug('presse out');
  };
  const handleLongPress = () => {
    console.debug('long presse');
  };

  return (
    <View>
      <Pressable
        style={Styles.rect}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Text>press in/out</Text>
      </Pressable>
    </View>
  );
}
