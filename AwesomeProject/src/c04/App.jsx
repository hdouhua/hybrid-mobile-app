/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import ProductTable from './ProductTable';

export default function App() {
  return (
    <SafeAreaView style={{marginHorizontal: 30}}>
      <ProductTable />
    </SafeAreaView>
  );
}
