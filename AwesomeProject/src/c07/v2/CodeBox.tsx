import React, {useRef, useState} from 'react';
import {View, TextInput, Alert, TouchableWithoutFeedback} from 'react-native';

import CodeBoxItem from './CodeBoxItem';
import {Styles} from '../Styles';

const CODE_LENGTH = 6;

export function CodeBox() {
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const codes = text.split('');
  const selectedIndex =
    codes.length < CODE_LENGTH ? codes.length : CODE_LENGTH - 1;

  const handlePress = () => {
    inputRef.current.focus();
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  const handleSubmit = () => {
    if (text.length >= CODE_LENGTH) {
      Alert.alert('Verification Code', text);
    }
  };
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

  console.debug('render CodeBox');
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={Styles.cv2_wrap}>
        <TextInput
          ref={inputRef}
          value=""
          style={[
            Styles.cv2_input,
            {
              left: selectedIndex * 40 + 22,
            },
          ]}
          blurOnSubmit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChange}
          onKeyPress={handleKeyPress}
          onSubmitEditing={handleSubmit}
        />
        {[...Array(CODE_LENGTH).keys()].map(index => {
          const code = codes[index] || '';
          const shadow = selectedIndex === index && focused;

          return (
            <CodeBoxItem
              code={code}
              shadow={shadow}
              index={index}
              key={index}
            />
          );
        })}
      </View>
    </TouchableWithoutFeedback>
  );
}
