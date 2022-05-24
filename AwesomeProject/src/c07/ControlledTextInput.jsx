import React from 'react';
import {View, TextInput, Text} from 'react-native';

import {Styles} from './Styles';

export default function ControlledTextInput() {
  const [text, setText] = React.useState('');

  return (
    <>
      <View style={Styles.formItem}>
        <Text>常规受控组件</Text>
        <TextInput value={text} style={Styles.input} onChangeText={setText} />
      </View>
      <View style={Styles.formItem}>
        <Text>模拟延迟输入</Text>
        <TextInput
          value={text}
          style={Styles.input}
          onChangeText={input => {
            const time = Date.now();
            //eslint-disable-next-line no-empty
            while (Date.now() - time <= 1000) {}
            setText(input);
          }}
        />
      </View>
      <Text style={Styles.txt}>输入：{text}</Text>
    </>
  );
}
