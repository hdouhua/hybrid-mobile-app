import React from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AppNavigation from './navigators';
import styles from './styles';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={styles.safeArea}>
        <AppNavigation />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
