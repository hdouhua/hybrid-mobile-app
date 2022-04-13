import React from 'react';
import {View, Image, Text} from 'react-native';

import DefaultImage from './DefaultImage';

import {Styles} from './Styles';

export default function Base64Image() {
  return (
    <View style={Styles.container}>
      <Text>I am an image from Base64 encode</Text>
      <Image
        style={Styles.img}
        source={{
          uri: DefaultImage,
        }}
      />
    </View>
  );
}
