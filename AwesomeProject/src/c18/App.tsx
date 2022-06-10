import React from 'react';
import {SafeAreaView} from 'react-native';

import DrawerSample from './navigators/DrawerSample';

import {Styles} from './Styles';

export default function App() {
  return (
    <SafeAreaView style={Styles.safeView}>
      <DrawerSample />
    </SafeAreaView>
  );
}
