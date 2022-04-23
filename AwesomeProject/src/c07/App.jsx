import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import UncontrolledTextInput from './UncontrolledTextInput';
import ControlledTextInput from './ControlledTextInput';
import AutoFocusTextInput from './AutoFocusTextInput';
import AutoNextFocusTextInput from './AutoNextFocusTextInput';
import CodeVerification from './homework';
import CodeVerificationV2 from './v2/CodeVerification';
import CodeVerificationV3 from './v3/CodeVerification';

import {Styles} from './Styles';

export default function App() {
  return (
    <SafeAreaView style={Styles.safeView}>
      <ScrollView>
        <CodeVerificationV3 />
        <CodeVerificationV2 />
        <CodeVerification />
        <UncontrolledTextInput />
        <ControlledTextInput />
        <AutoFocusTextInput />
        <AutoNextFocusTextInput />
      </ScrollView>
    </SafeAreaView>
  );
}
