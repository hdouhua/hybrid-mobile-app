import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {Styles} from './Styles';

// 加入简单的动画效果的点按组件
export default function AnimationButton() {
  const handlePress = () => {
    console.log('presse me');
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        style={({pressed}) => [
          Styles.basePressable,
          {opacity: pressed ? 0.5 : 1},
        ]}>
        <Text style={Styles.baseText}>press me</Text>
      </Pressable>
    </View>
  );
}
