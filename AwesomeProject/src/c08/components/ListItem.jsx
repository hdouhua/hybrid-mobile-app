import React from 'react';
import {Pressable, Text} from 'react-native';

import {Styles} from '../Styles';

export default function ListItem({item, style}) {
  return (
    <Pressable
      style={[Styles.itemWrapper, style]}
      onLayout={() => {
        console.log('layout:', item.id);
      }}>
      <Text>{item.title}</Text>
    </Pressable>
  );
}
