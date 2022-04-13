import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import StaticImage from './StaticImage';
import NetworkImage from './NetworkImage';
import Base64Image from './Base64Image';

export default function App() {
  return (
    <SafeAreaView style={{marginHorizontal: 30}}>
      <ScrollView>
        <StaticImage />
        <NetworkImage />
        <Base64Image />
      </ScrollView>
    </SafeAreaView>
  );
}
