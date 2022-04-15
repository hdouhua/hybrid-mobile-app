import React from 'react';
import {SafeAreaView} from 'react-native';

import UncontrolledTextInput from './UncontrolledTextInput';
import ControlledTextInput from './ControlledTextInput';
import AutoFocusTextInput from './AutoFocusTextInput';
import AutoNextFocusTextInput from './AutoNextFocusTextInput';

export default function App() {
  return (
    <SafeAreaView style={{marginHorizontal: 30}}>
      <UncontrolledTextInput />
      <ControlledTextInput />
      <AutoFocusTextInput />
      <AutoNextFocusTextInput />
    </SafeAreaView>
  );
}
