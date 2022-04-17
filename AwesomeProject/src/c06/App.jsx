import React from 'react';
import {SafeAreaView} from 'react-native';

import {Styles} from './Styles';
import BasicButton from './BasicButton';
import AnimatedButton from './AnimatedButton';
import ButtonOn from './ButtonOn';

export default function () {
  return (
    <SafeAreaView style={Styles.safeView}>
      <BasicButton />
      <AnimatedButton />
      <ButtonOn />
    </SafeAreaView>
  );
}
