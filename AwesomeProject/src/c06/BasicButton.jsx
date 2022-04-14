import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {Styles} from './Styles';

export default function BasicButton() {
  const handlePress = () => {
    console.log('presse');
  };

  return (
    <View>
      <Pressable onPress={handlePress} style={Styles.basePressable}>
        <Text style={Styles.baseText}>I'm a static button</Text>
      </Pressable>
    </View>
  );
}
