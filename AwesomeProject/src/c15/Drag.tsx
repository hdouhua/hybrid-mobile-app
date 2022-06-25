import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export default function Drag() {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({x: 0, y: 0});

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value.x}, {translateY: offset.value.y}],
      backgroundColor: isPressed.value ? 'limegreen' : 'pink',
    };
  });
  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      console.debug('识别到手势');
      isPressed.value = true;
    })
    .onTouchesDown(() => console.debug('手指按下触摸到视图'))
    .onTouchesMove(() => console.debug('手指移动'))
    .onStart(() => console.debug('手指移动距离超过阈值'))
    .onUpdate(() => console.debug('手指移动参数更新'))
    .onChange(e => {
      console.debug('手指移动参数更新 -->>');
      offset.value = {
        x: e.changeX + offset.value.x,
        y: e.changeY + offset.value.y,
      };
    })
    .onTouchesUp(() => console.debug('手指离开屏幕'))
    .onEnd(() => console.debug('手指离开屏幕 -->>'))
    .onTouchesCancelled(() => console.debug('中断手势'))
    .onFinalize(() => {
      console.debug('手势结束');
      isPressed.value = false;
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={dragGesture}>
        <Animated.View style={[styles.ball, animatedStyles]}>
          <Text style={styles.txt}>Drag me</Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
  txt: {
    alignSelf: 'center',
    fontWeight: '800',
    color: 'gray',
  },
});
