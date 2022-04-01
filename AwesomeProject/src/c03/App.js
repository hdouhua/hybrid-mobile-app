import React from 'react';
import {SafeAreaView} from 'react-native';

import FlexColumn from './flex-column';
import FlexRow from './flex-row';
import TextTest from './text';
import StyleFile from './style-file';
import Homework from './homework';

export default function App() {
  return (
    <SafeAreaView style={{marginHorizontal: 30}}>
      <FlexColumn />
      <FlexRow />
      <TextTest />
      <StyleFile />
      <Homework />
    </SafeAreaView>
  );
}
