import React from 'react';
import {View, Text, Button} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Styles as styles} from '../Styles';

export function Page({
  route,
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Page [{route.name}]</Text>
      <Button
        title="Goto [Next] Page"
        onPress={() => {
          navigation.push('Page');
        }}
      />
      <Button
        title="Open a Dialog"
        onPress={() => {
          navigation.push('MyDialog', {
            title: 'testing title',
            content: 'this is dialog testing content.',
          });
        }}
      />
    </View>
  );
}
