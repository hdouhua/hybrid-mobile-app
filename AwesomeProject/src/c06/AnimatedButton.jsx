import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {Styles} from './Styles';

export default function AnimatedButton() {
  const handlePress = () => {
    console.debug('presse me');
  };

  return (
    <View>
      {/* 加入简单的动画效果的点按组件 */}
      <Pressable
        onPress={handlePress}
        style={({pressed}) => [
          Styles.basePressable,
          {opacity: pressed ? 0.5 : 1},
        ]}>
        <Text style={Styles.baseText}>animated button</Text>
      </Pressable>
    </View>
  );
}
