import React from 'react';
import {Image, View} from 'react-native';

import {Styles} from '../Styles';

function ImageRender({imageUri}: {imageUri: string}) {
  console.debug('render item');
  return (
    <View style={Styles.itemWrapper}>
      <Image style={Styles.img} source={{uri: imageUri}} />
    </View>
  );
}

export default React.memo(ImageRender);
