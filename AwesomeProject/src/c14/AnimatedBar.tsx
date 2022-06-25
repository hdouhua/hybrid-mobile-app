import React from 'react';
import {View, Text, Button, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  withSpring,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const {width: WindowWidth} = Dimensions.get('window');

export default function AnimatedBar(): React.ReactElement {
  const randomWidth = useSharedValue(10);

  const style = useAnimatedStyle(() => {
    console.debug('animated');

    return {
      width: withTiming(randomWidth.value, {
        duration: 700,
        easing: Easing.out(Easing.exp),
      }),
      // width: withSpring(randomWidth.value),
    };
  });

  console.debug('render AnimatedBar');
  return (
    <View>
      <Text>Animated Bar</Text>
      <Animated.View
        style={[{height: 30, backgroundColor: 'dodgerblue'}, style]}
      />
      <Button
        title="Variant"
        onPress={() => {
          randomWidth.value = Math.random() * WindowWidth;
        }}
      />
    </View>
  );
}
