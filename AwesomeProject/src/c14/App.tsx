import React from 'react';
import {SafeAreaView} from 'react-native';

import StatefulBar from './StatefulBar';
import AnimatedBar from './AnimatedBar';
import AnimatedText from './AnimatedText';
import AnimatedScroll from './AnimatedScrollView';

export default function App(): React.ReactElement {
  return (
    <SafeAreaView>
      <StatefulBar />
      <AnimatedBar />
      <AnimatedText />
      <AnimatedScroll />
    </SafeAreaView>
  );
}
