import React from 'react';
import {SafeAreaView} from 'react-native';

import {Styles} from './Styles';
import BasicButton from './BasicButton';
import AnimationButton from './AnimationButton';
import ButtonOn from './ButtonOn';

export default function () {
  return (
    <SafeAreaView style={Styles.safeView}>
      <BasicButton />
      <AnimationButton />
      <ButtonOn />
    </SafeAreaView>
  );
}
