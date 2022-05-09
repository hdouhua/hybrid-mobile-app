/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView} from 'react-native';

import {Styles} from './Styles';

import SlowList from './SlowList';
import FastList from './FlatList';
import RecyclerList from './RecyclerList';
import RecyclerListV2 from './homework';

export default function App() {
  return (
    <SafeAreaView style={Styles.safeView}>
      {/* <SlowList /> */}
      {/* <FastList /> */}
      {/* <RecyclerList /> */}
      <RecyclerListV2 />
    </SafeAreaView>
  );
}
