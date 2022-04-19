/**
 * inspired by the blog:
 * https://www.codedaily.io/tutorials/Create-a-Segmented-Auto-Moving-SMS-Code-Verification-Input-in-React-Native
 */

import React, {useCallback} from 'react';
import {View, Text, Alert} from 'react-native';

import {CodeBox} from './CodeBox';
import {Styles} from '../Styles';

export default function CodeVerification() {
  const handleResend = useCallback(() => {
    Alert.alert('已请求新验证码！');
  }, []);

  console.log('rerender v2');
  return (
    <>
      <View style={Styles.newFormField} />
      <View style={Styles.cvContainer}>
        <Text style={Styles.cvHeader}>
          输入发送至 {'\n'}+86 ********645 的验证码
        </Text>

        <CodeBox />

        <Text style={Styles.cvNewCode} onPress={handleResend}>
          发送新验证码
        </Text>
      </View>
    </>
  );
}
