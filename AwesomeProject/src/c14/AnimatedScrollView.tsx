import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 40;
const BIG_SIZE = 160;

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

  const animatedStyle = useAnimatedStyle(() => {
    const size = isScrolling.value ? BIG_SIZE : SIZE;
    return {
      // transform: [
      //   {
      //     translateY: transY.value,
      //   },
      // ],
      width: withSpring(size),
      height: withSpring(size),
    };
  }, [isScrolling]);

  const height = 200;

  console.debug('render AnimatedScroll');
  return (
    <View style={styles.container}>
      <View style={[styles.mainContainer, {height}]}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </View>
      <View style={[styles.scrollContainer, {height}]}>
        <Animated.ScrollView scrollEventThrottle={1} onScroll={scrollHandler}>
          <View style={[styles.bar, {height}]} />
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  mainContainer: {
    flex: 10,
    overflow: 'hidden',
    backgroundColor: 'lightblue',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  box: {
    alignSelf: 'center',
    backgroundColor: 'dodgerblue',
  },
  bar: {
    backgroundColor: 'brown',
  },
});
