import React from 'react';
import {SafeAreaView} from 'react-native';

import {Styles} from './Styles';

import SlowList from './SlowList';
import FastList from './FlatList';

export default function App() {
  return (
    <SafeAreaView style={Styles.safeView}>
      {/* <SlowList /> */}
      <FastList />
    </SafeAreaView>
  );
}
