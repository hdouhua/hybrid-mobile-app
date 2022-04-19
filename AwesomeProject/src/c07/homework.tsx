import React, {useRef} from 'react';
import {View, TextInput, Text, Alert} from 'react-native';

import {Styles} from './Styles';

const CODE_LENGTH = 6;

export default function CodeVerification() {
  const codesRef = useRef(new Array(CODE_LENGTH).fill(null));
  const codeInputRef = useRef<TextInput[]>([null]);

  const _setFocus = (i: number) => {
    if (i >= 0 && i < CODE_LENGTH) {
      codeInputRef.current[i]?.focus();
    }
  };
  const _handleSubmit = (it: number) => {
    if (it < CODE_LENGTH - 1) {
      _setFocus(it + 1);
    } else {
      for (let index = 0; index < CODE_LENGTH; index++) {
        if (!codesRef.current[index]) {
          _setFocus(index);
          return;
        }
      }
      Alert.alert('Verification Code', codesRef.current.join(''));
    }
  };
  const handlers = (it: number) => ({
    handlerChange: function (c: string) {
      codesRef.current[it] = c;
      if (c) {
        _setFocus(it + 1);
      }
      if (it === CODE_LENGTH - 1) {
        // auto submit
        _handleSubmit(it);
      }
    },
    handleKeyPress: function (e) {
      if (e.nativeEvent.key === 'Backspace') {
        codesRef.current[it] = null;
        _setFocus(it - 1);
      }
    },
    handleSubmit: function () {
      _handleSubmit(it);
    },
  });
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

        <View style={Styles.cvInputContainer}>
          {[...Array(CODE_LENGTH).keys()].map(it => {
            const handler = handlers(it);
            return (
              <TextInput
                key={it}
                ref={el => (codeInputRef.current[it] = el)}
                style={Styles.cvInputItem}
                selectTextOnFocus={true}
                blurOnSubmit={false}
                keyboardType="number-pad"
                maxLength={1}
                onKeyPress={handler.handleKeyPress}
                onChangeText={handler.handlerChange}
                onSubmitEditing={handler.handleSubmit}
              />
            );
          })}
        </View>

        <Text style={Styles.cvNewCode} onPress={handleResend}>
          发送新验证码
        </Text>
      </View>
    </>
  );
}
