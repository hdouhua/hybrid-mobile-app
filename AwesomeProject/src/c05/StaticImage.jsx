import React from 'react';
import {View, Text, Image} from 'react-native';
import {Styles} from './Styles';

const cat = require('../res/cat_cute.jpeg');

export default function StaticImage() {
  //可以通过 Image.resolveAssetSource 方法来获取图片信息
  // alert(JSON.stringify(Image.resolveAssetSource(cat)));

  return (
    <View style={Styles.container}>
      <Text>I am a static image</Text>
      <Image style={Styles.img} source={cat} />
    </View>
  );
}