import React from 'react';
import {Pressable, FlatList, Text} from 'react-native';

import {Styles} from './Styles';

const NUM_ITEMS = 1000;
const DATA = new Array(NUM_ITEMS).fill(0).map((_, index) => ({
  title: `Item ${index}`,
  id: index,
}));

const Item = ({title}) => {
  return (
    <Pressable style={Styles.itemWrapper}>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default function FastList() {
  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <FlatList
      debug={true}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={it => it.id}
    />
  );
}
