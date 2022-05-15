import React from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {Styles} from './Styles';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cat = require('../shared/res/cat_cute.jpeg');

export default function StaticImage() {
  //可以通过 Image.resolveAssetSource 方法来获取图片信息
  Alert.alert(JSON.stringify(Image.resolveAssetSource(cat)));

  return (
    <View style={Styles.container}>
      <Text>I am a static image</Text>
      <Image style={Styles.img} source={cat} />
    </View>
  );
}
