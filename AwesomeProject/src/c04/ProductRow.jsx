import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function ProductRow({
  product,
  handleIncrement,
  handleDecrement,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}>
      <Text style={{flex: 1}}>{product.name}</Text>
      <Text style={{flex: 1}}>￥{product.price}</Text>
      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          title="+"
          hitSlop="10"
          onPress={() => handleIncrement(product)}
        />
        <Text>{product.count}</Text>
        <Button
          title="-"
          hitSlop="10"
          onPress={() => handleDecrement(product)}
        />
      </View>
    </View>
  );
}
