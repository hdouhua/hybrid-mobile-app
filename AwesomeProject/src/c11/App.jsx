import React from 'react';
import {SafeAreaView} from 'react-native';

import {Styles} from './Styles';

import RecyclerListV2 from './RecyclerList';

export default function App() {
  return (
    <SafeAreaView style={Styles.safeView}>
      <RecyclerListV2 />
    </SafeAreaView>
  );
}
