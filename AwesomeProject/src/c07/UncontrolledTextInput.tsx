import React, {useRef} from 'react';
import {View, TextInput, Text} from 'react-native';

import {Styles} from './Styles';

export default function UncontrolledTextInput() {
  const textRef = useRef('');

  return (
    <>
      <View style={Styles.formItem}>
        <Text>非受控组件</Text>
        <TextInput
          style={Styles.input}
          onChangeText={text => {
            textRef.current = text;
            console.log(textRef.current);
          }}
        />
      </View>
      <Text style={Styles.txt}>{textRef.current}</Text>
    </>
  );
}
