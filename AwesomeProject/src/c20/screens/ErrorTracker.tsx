import React from 'react';
import {View, Text, Button} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Styles} from '../Styles';

declare const global: {
  HermesInternal?: object;
};

export default function ErrorTrackerScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase>): React.ReactElement {
  return (
    <View style={Styles.contentContainer}>
      <Text style={Styles.text}>
        JS Engine: {global.HermesInternal == null ? 'native' : 'Hermes'}
      </Text>
      <Button
        title="Simple Error"
        onPress={() => navigation.navigate('SimpleError')}
      />
      <Button
        title="Promise Unhandled Error"
        onPress={() => navigation.navigate('PromiseError')}
      />
      <Button
        title="Component Render Error"
        onPress={() => navigation.navigate('RenderError')}
      />
    </View>
  );
}
