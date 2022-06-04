import React from 'react';
import {View, Text} from 'react-native';
import * as Sentry from '@sentry/react-native';
import {Styles} from './Styles';

export default function SimpleExample(): React.ReactElement {
  return (
    <View style={Styles.contentContainer}>
      <Text
        style={Styles.textButton}
        onPress={() => {
          throw new Error('My first Sentry error!');
        }}>
        throw an Error
      </Text>
      <Text
        style={Styles.textButton}
        onPress={() => {
          Sentry.nativeCrash();
        }}>
        throw a Native error
      </Text>
    </View>
  );
}
