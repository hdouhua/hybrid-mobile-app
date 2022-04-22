import React from 'react';
import {Pressable, Text} from 'react-native';

import {Styles} from '../Styles';

function ListItem({item, style}) {
  console.debug('render item:', item.id);
  return (
    <Pressable
      style={[Styles.itemWrapper, style]}
      onLayout={() => {
        console.debug('layout:', item.id);
      }}>
      <Text>{item.title}</Text>
    </Pressable>
  );
}

export default React.memo(ListItem);
