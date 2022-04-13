import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';

import {Styles} from './Styles';

export default function NetworkImage() {
  let imageUri = 'https://d2zp5xs5cp8zlg.cloudfront.net/image-30938-800.jpg';
  useEffect(() => {
    Image.prefetch(imageUri, () => {
      console.log('image loaded');
    });
  }, [imageUri]);

  return (
    <View style={Styles.container}>
      <Text>I am a network image (with cache)</Text>
      <Image
        style={Styles.img}
        source={{uri: imageUri, cache: 'only-if-cached'}}
      />
    </View>
  );
}
