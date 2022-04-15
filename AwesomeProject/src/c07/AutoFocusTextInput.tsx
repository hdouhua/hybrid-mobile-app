import React, {useRef, useEffect, useState} from 'react';
import {View, TextInput, Text} from 'react-native';

import {Styles} from './Styles';

export default function AutoFocusTextInput() {
  const [text, setText] = useState('');
  const ref1 = useRef<TextInput>(null);

  // ref1 自动焦点
  useEffect(() => {
    ref1.current?.focus();
  }, []);

  return (
    <View style={Styles.formItem}>
      <Text>自动设置焦点</Text>
      <TextInput
        ref={ref1}
        value={text}
        style={Styles.input}
        onChangeText={setText}
      />
    </View>
  );
}
