import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {Styles} from '../Styles';

// by inspect the size of small indicator is 20 * 20,  the large one is 36 * 36
export default function Loading({color = 'black'}) {
  return (
    <View style={Styles.loadingLayer}>
      <ActivityIndicator
        size="large"
        color={color}
        style={Styles.loadingLayerIndicator}
      />
    </View>
  );
}
