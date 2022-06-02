import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 40;
const BIG_SIZE = 80;

export default function AnimatedScroll(): React.ReactElement {
  const transY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      transY.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  const style = useAnimatedStyle(() => {
    const size = isScrolling.value ? BIG_SIZE : SIZE;
    return {
      transform: [
        {
          translateY: transY.value,
        },
      ],
      width: withSpring(size),
      height: withSpring(size),
    };
  });

  const height = 200;

  console.debug('render AnimatedScroll');
  return (
    <View style={styles.container}>
      <View style={[styles.half, styles.boxContainer, {height}]}>
        <Animated.View style={[styles.box, style]} />
      </View>
      <View style={[styles.half, {height}]}>
        <Animated.ScrollView
          style={styles.scroll}
          onScroll={scrollHandler}
          scrollEventThrottle={1}>
          <View style={[styles.placeholder, {height}]} />
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  half: {
    flex: 1,
    overflow: 'hidden',
  },
  boxContainer: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  box: {
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  placeholder: {
    width: SIZE,
    backgroundColor: 'brown',
  },
});
