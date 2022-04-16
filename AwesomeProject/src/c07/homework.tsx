import React, {useEffect, useRef} from 'react';
import {View, TextInput, Text, Alert} from 'react-native';

import {Styles} from './Styles';

const CODE_LENGTH = 6;

export default function CodeVerification() {
  const [text, setText] = React.useState('');
  const codeInputRef = useRef<TextInput[]>([null]);
  const codeInputList = [...Array(CODE_LENGTH).keys()];

  const handleChange = (it: number) => (c: string) => {
    let t = [...text];
    if (c) {
      t[it] = c;
      setText(t.join(''));
      // set next focus
      if (it < CODE_LENGTH - 1) {
        codeInputRef.current[it + 1]?.focus();
      }
    }
  };
  const handleSubmit = (it: number) => () => {
    if (it < CODE_LENGTH - 1) {
      codeInputRef.current[it + 1]?.focus();
    } else {
      Alert.alert(text);
    }
  };
  const sendNewCode = () => {
    Alert.alert('已发送！');
  };

  useEffect(() => {
    codeInputRef.current[0].focus();
  }, []);

  return (
    <>
      <View style={Styles.newFormField} />
      <View style={Styles.vcContainer}>
        <Text style={Styles.vcHeader}>
          输入发送至 {'\n'}+86 ********645 的验证码
        </Text>

        <View style={Styles.vcInputContainer}>
          {codeInputList.map(it => {
            return (
              <TextInput
                key={it}
                ref={el => (codeInputRef.current[it] = el)}
                style={Styles.vcInputItem}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={handleChange(it)}
                onSubmitEditing={handleSubmit(it)}
              />
            );
          })}
        </View>

        <Text style={Styles.vcNewCode} onPress={sendNewCode}>
          发送新验证码
        </Text>
      </View>
    </>
  );
}
