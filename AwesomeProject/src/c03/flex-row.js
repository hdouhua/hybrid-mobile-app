import React from 'react';
import {View, Text, Image} from 'react-native';

export default function FlexRow() {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{width: 100, height: 100, flex: 1}}
        source={{
          uri: 'https://hips.hearstapps.com/hmg-prod/images/domestic-cat-lies-in-a-basket-with-a-knitted-royalty-free-image-1592337336.jpg',
        }}
      />
      <Text>Hello World!</Text>
    </View>
  );
}
