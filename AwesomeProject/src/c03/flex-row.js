import React from 'react';
import {View, Text, Image} from 'react-native';

export default function FlexRow() {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{width: 100, height: 100, flex: 1}}
        source={require('@asset/cat_03.jpg')}
      />
      <Text>Hello World!</Text>
    </View>
  );
}
