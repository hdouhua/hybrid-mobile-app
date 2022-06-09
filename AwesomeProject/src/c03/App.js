import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import FlexColumn from './flex-column';
import FlexRow from './flex-row';
import TextTest from './text';
import StyleFile from './style-file';
import Homework from './homework';

export default function App() {
  return (
    <SafeAreaView style={{marginHorizontal: 5}}>
      <ScrollView>
        <FlexColumn />
        <FlexRow />
        <TextTest />
        <StyleFile />
        <Homework />
      </ScrollView>
    </SafeAreaView>
  );
}
