import React from 'react';
import {View, Text} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import styles from '../styles';

export default function ExclusiveDemo() {
  const singleTap = Gesture.Tap().onStart(() => {
    console.debug('singleTap onStart');
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      console.debug('doubleTap onStart');
    });

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        Gesture.Exclusive(doubleTap, singleTap) - the second gesture will wait
        for the failure of the first one
      </Text>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <View style={styles.ball} />
      </GestureDetector>
    </View>
  );
}
