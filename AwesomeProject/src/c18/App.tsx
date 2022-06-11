import React from 'react';
import {SafeAreaView} from 'react-native';

import AppNavigator from './navigators/Application';
import {Styles} from './Styles';

export default function App() {
  return (
    <SafeAreaView style={Styles.safeView}>
      <AppNavigator />
    </SafeAreaView>
  );
}
