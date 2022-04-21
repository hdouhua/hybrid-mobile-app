import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {Styles} from '../Styles';

export default function Loading({color = 'black'}) {
  return (
    <View style={Styles.loading}>
      <ActivityIndicator
        size="large"
        color={color}
        style={Styles.loadingIndicator}
      />
    </View>
  );
}
