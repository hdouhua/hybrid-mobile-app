import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

export default function Tap() {
  const [logs, setLogs] = useState<string[]>([]);
  const singleTap = Gesture.Tap().onStart(() => {
    console.debug('start to tap');
    // 回调函数执行在 UI 线程，不能在 UI 线程访问 JS线程的（异步的） setState
    // => 把 setState 放到 JS 线程去执行
    runOnJS(setLogs)(
      (lg => {
        console.debug(lg.length);
        return lg.concat('tapped');
      })(logs),
    );
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={singleTap}>
        <View style={styles.rectangle}>
          <Text style={styles.txt}>Tap</Text>
        </View>
      </GestureDetector>
      {logs.map((log, index) => (
        <Text key={index}>{log}</Text>
      ))}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  txt: {
    alignSelf: 'center',
    fontWeight: '800',
    color: 'white',
  },
});
