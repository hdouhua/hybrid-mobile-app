import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

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

const Styles = StyleSheet.create({
  loadingLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  loadingLayerIndicator: {
    backgroundColor: 'lightgrey',
    padding: 20,
    borderRadius: 5,
  },
});
