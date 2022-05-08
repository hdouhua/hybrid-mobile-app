import React from 'react';
import {Pressable, Text} from 'react-native';

import {ViewTypes} from '../utils/constant';
import {Styles} from '../Styles';

function ListItem({item, viewType}) {
  console.debug('render item:', item.id);

  let style = null;
  switch (viewType) {
    case ViewTypes.HALF_LEFT:
      style = Styles.itemWrapperLeft;
      break;
    case ViewTypes.HALF_RIGHT:
      style = Styles.itemWrapperRight;
      break;
  }

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
