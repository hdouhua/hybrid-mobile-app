import React from 'react';
import {View, Text} from 'react-native';
import {
  fetchWithNetworkError,
  fetchWithRejectionError,
} from '@shared/utils/dataUtil';
import {Styles} from './Styles';

export default function SimpleExample(): React.ReactElement {
  return (
    <View style={Styles.contentContainer}>
      <Text
        style={Styles.textButton}
        onPress={() => {
          fetchWithNetworkError().then((d: string[]) => {
            console.debug(d && d.length);
          });
        }}>
        throw a Promise unhandled error
      </Text>
      <Text
        style={Styles.textButton}
        onPress={() => {
          fetchWithRejectionError().then(() => {
            console.debug('calling fetchWithRejectionError');
          });
        }}>
        throw a Promise unhandled rejection error
      </Text>
    </View>
  );
}
