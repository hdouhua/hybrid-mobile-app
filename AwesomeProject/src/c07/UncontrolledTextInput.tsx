import React, {useRef} from 'react';
import {View, TextInput, Text, Alert} from 'react-native';

import {Styles} from './Styles';

export default function UncontrolledTextInput() {
  const textRef = useRef('');
  const readInput = () => {
    Alert.alert(textRef.current.length > 0 ? textRef.current : 'nothing input');
  };

  return (
    <>
      <View style={Styles.newFormField} />
      <View style={Styles.formItem}>
        <Text>非受控组件</Text>
        <TextInput
          style={Styles.input}
          onChangeText={text => {
            textRef.current = text;
          }}
        />
      </View>
      <Text style={Styles.txt} onPress={readInput}>
        点击读取输入
      </Text>
    </>
  );
}
