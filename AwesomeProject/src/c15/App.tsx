import React from 'react';
import {SafeAreaView} from 'react-native';
import Tap from './Tap';
import Drag from './Drag';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tap />
      <Drag />
    </SafeAreaView>
  );
}
