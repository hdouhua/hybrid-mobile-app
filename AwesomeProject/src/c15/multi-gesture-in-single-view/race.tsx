import React from 'react';
import {View, Text} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import styles from '../styles';

export default function RaceDemo() {
  const pan = Gesture.Pan()
    .onStart(() => {
      console.debug('pan onStart');
    })
    .onUpdate(() => {
      console.debug('pan onUpdate');
    })
    .onEnd(() => {
      console.debug('pan onEnd');
    });
  const longPress = Gesture.LongPress()
    .onStart(() => {
      console.debug('longPress onStart');
    })
    .onEnd(() => {
      console.debug('longPress onEnd');
    });

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        Gesture.Race(pan, longPress) - the first gesture that meets its
        activation criteria will activate
      </Text>
      <GestureDetector gesture={Gesture.Race(pan, longPress)}>
        <View style={styles.rectangle} />
      </GestureDetector>
    </View>
  );
}
