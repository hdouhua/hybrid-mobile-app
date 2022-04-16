import React, {useRef} from 'react';
import {View, TextInput, Text} from 'react-native';

import {Styles} from './Styles';

export default function AutoNextFocusTextInput() {
  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);

  return (
    <>
      <View style={Styles.newFormField} />
      <Text>提交是自动设置下一输入框为焦点</Text>
      <View style={Styles.formItem}>
        <Text>姓名</Text>
        <TextInput
          ref={ref1}
          style={Styles.input}
          onSubmitEditing={() => ref2.current?.focus()}
          textContentType="name"
          autoComplete="name"
          returnKeyType="next"
        />
      </View>
      <View style={Styles.formItem}>
        <Text>电话</Text>
        <TextInput
          ref={ref2}
          style={Styles.input}
          onSubmitEditing={() => ref3.current?.focus()}
          keyboardType="phone-pad"
          returnKeyType="done"
        />
      </View>
      <View style={Styles.formItem}>
        <Text>地址</Text>
        <TextInput ref={ref3} style={Styles.input} returnKeyType="done" />
      </View>
    </>
  );
}
