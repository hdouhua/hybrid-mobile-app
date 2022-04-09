import React from 'react';
import {View, Text} from 'react-native';

export default function ProductRow({product = {name: '苹果', price: 1}}) {
  return (
    <View style={{flexDirection: 'row', marginTop: 5}}>
      <Text style={{flex: 1}}>{product.name}</Text>
      <Text style={{width: 50}}>￥{product.price}</Text>
    </View>
  );
}
