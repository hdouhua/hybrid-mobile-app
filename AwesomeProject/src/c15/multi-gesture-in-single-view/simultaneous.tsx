import React from 'react';
import {View, Text} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import styles from '../styles';

export default function SimultaneousDemo() {
  const pinch = Gesture.Pinch()
    .onStart(() => {
      console.debug('Pinch onStart');
    })
    .onUpdate(() => {
      console.debug('Pinch onUpdate');
    })
    .onEnd(() => {
      console.debug('Pinch onEnd');
    });
  const rotate = Gesture.Rotation()
    .onStart(() => {
      console.debug('Rotation onStart');
    })
    .onUpdate(() => {
      console.debug('Rotation onUpdate');
    })
    .onEnd(() => {
      console.debug('Rotation onEnd');
    });

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        Gesture.Simultaneous(pinch, rotation) - both gestures can activate and
        process touches at the same time
      </Text>
      <GestureDetector gesture={Gesture.Simultaneous(pinch, rotate)}>
        <View style={styles.roundRect} />
      </GestureDetector>
    </View>
  );
}
