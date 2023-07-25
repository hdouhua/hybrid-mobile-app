import React, {useEffect} from 'react';
import {View, Text, TextInput, TextInputProps} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';

// ?
Animated.addWhitelistedNativeProps({text: true});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function AnimatedText(): React.ReactElement {
  const sharedValue = useSharedValue('');

  const animatedProps = useAnimatedProps(() => {
    return {text: sharedValue.value} as TextInputProps;
  }, [sharedValue]);

  useEffect(() => {
    console.debug('use Effect');
    const timerId = setInterval(() => {
      sharedValue.value = String(Date.now());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [sharedValue]);

  console.debug('render AnimatedText');
  return (
    <View>
      <Text>Animated Text</Text>
      <AnimatedTextInput
        editable={false}
        //value={shareValue.value}
        animatedProps={animatedProps}
      />
    </View>
  );
}
