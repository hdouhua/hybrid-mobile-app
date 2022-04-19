import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import UncontrolledTextInput from './UncontrolledTextInput';
import ControlledTextInput from './ControlledTextInput';
import AutoFocusTextInput from './AutoFocusTextInput';
import AutoNextFocusTextInput from './AutoNextFocusTextInput';
import CodeVerification from './homework';
import CodeVerificationV2 from './v2/CodeVerification';

export default function App() {
  return (
    <SafeAreaView style={{marginHorizontal: 30}}>
      <ScrollView>
        <UncontrolledTextInput />
        <ControlledTextInput />
        <AutoFocusTextInput />
        <AutoNextFocusTextInput />
        <CodeVerification />
        <CodeVerificationV2 />
      </ScrollView>
    </SafeAreaView>
  );
}
