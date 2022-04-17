/**
 * inspired by the blog:
 * https://www.codedaily.io/tutorials/Create-a-Segmented-Auto-Moving-SMS-Code-Verification-Input-in-React-Native
 */

import React, {useCallback, useRef, useState} from 'react';
import {View, TextInput, Text, Alert, Pressable} from 'react-native';

import {Styles} from './Styles';

const CODE_LENGTH = 6;

export default function CodeVerificationV2() {
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const codes = text.split('');

  const handlePress = useCallback(() => {
    inputRef.current.focus();
  }, []);
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);
  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);
  const handleChange = value => {
    if (text.length >= CODE_LENGTH) {
      handleSubmit();
    } else {
      let newText = (text + value).slice(0, CODE_LENGTH);
      setText(newText);
    }
  };
  const handleKeyPress = e => {
    if (e.nativeEvent.key === 'Backspace') {
      let newText = text.slice(0, text.length - 1);
      setText(newText);
    }
  };
  const handleSubmit = () => {
    if (text.length >= CODE_LENGTH) {
      Alert.alert('Verification Code', text);
    }
  };
  const handleResend = () => {
    Alert.alert('已请求新验证码！');
  };

  return (
    <>
      <View style={Styles.newFormField} />
      <View style={Styles.cvContainer}>
        <Text style={Styles.cvHeader}>
          输入发送至 {'\n'}+86 ********645 的验证码
        </Text>

        <Pressable onPress={handlePress}>
          <View style={Styles.cv2_wrap}>
            <TextInput
              ref={inputRef}
              value=""
              style={Styles.cv2_input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={handleChange}
              onKeyPress={handleKeyPress}
              onSubmitEditing={handleSubmit}
            />
            {[...Array(CODE_LENGTH).keys()].map(index => {
              const selected = codes.length === index;
              const filled =
                codes.length === CODE_LENGTH && index === CODE_LENGTH - 1;
              return (
                <View style={Styles.cv2_display} key={index}>
                  <Text style={Styles.cv2_text}>{codes[index] || ''}</Text>
                  {(selected || filled) && focused && (
                    <View style={Styles.cv2_shadows} />
                  )}
                </View>
              );
            })}
          </View>
        </Pressable>

        <Text style={Styles.cvNewCode} onPress={handleResend}>
          发送新验证码
        </Text>
      </View>
    </>
  );
}
