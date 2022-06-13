import React from 'react';
import {View, Text} from 'react-native';
import {mockNativeCrash} from '@shared/utils/monitoring';
import {Styles} from '../Styles';

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
          mockNativeCrash();
        }}>
        throw a Native error
      </Text>
    </View>
  );
}
