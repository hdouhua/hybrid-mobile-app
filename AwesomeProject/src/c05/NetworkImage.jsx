import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';

import {Styles} from './Styles';
import DefaultImage from './DefaultImage';

export default function NetworkImage() {
  let imageUri = 'https://d2zp5xs5cp8zlg.cloudfront.net/image-30938-800.jpg';
  useEffect(() => {
    Image.prefetch(imageUri)
      .then(() => {
        console.debug('image loaded');
      })
      .catch(err => {
        console.error(err);
      });
  }, [imageUri]);

  return (
    <View style={Styles.container}>
      <Text>I am a network image (with cache)</Text>
      <Image
        style={Styles.img}
        source={{uri: imageUri, cache: 'only-if-cached'}}
        defaultSource={{uri: DefaultImage}}
      />
    </View>
  );
}
