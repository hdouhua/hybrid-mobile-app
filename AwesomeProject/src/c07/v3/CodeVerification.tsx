import React, {useRef} from 'react';
import {View, TextInput, Text, Alert} from 'react-native';

import {Styles} from '../Styles';

const CODE_LENGTH = 6;

export default function CodeVerification() {
  const codesRef = useRef('');

  const handleResend = () => {
    Alert.alert('已请求新验证码！');
  };
  const handleChange = (c: string) => {
    codesRef.current = c;
  };
  const handleSubmit = () => {
    if (codesRef.current.length === CODE_LENGTH) {
      Alert.alert('Verification Code', codesRef.current);
    }
  };

  console.debug('render v3');
  return (
    <>
      <View style={Styles.cvContainer}>
        <Text style={Styles.cvHeader}>
          输入发送至 {'\n'}+86 ********645 的验证码
        </Text>

        <View style={Styles.cv3_container}>
          <TextInput
            style={Styles.cv3_input}
            selectTextOnFocus={false}
            blurOnSubmit={false}
            onChangeText={handleChange}
            onSubmitEditing={handleSubmit}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
          />
          <View style={Styles.cv3_lineContainer}>
            {[...Array(CODE_LENGTH).keys()].map(index => (
              <View style={Styles.cv3_lineItem} key={index} />
            ))}
          </View>
        </View>

        <Text style={Styles.cvNewCode} onPress={handleResend}>
          发送新验证码
        </Text>
      </View>
    </>
  );
}
