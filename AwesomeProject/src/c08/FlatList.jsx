import React from 'react';
import {FlatList} from 'react-native';

import {Styles} from './Styles';
import {DATA, ITEM_HEIGHT} from './utils/constant';
import ListItem from './components/ListItem';

export default function FastList() {
  const renderItem = ({item}) => <ListItem item={item} />;
  const getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <FlatList
      style={Styles.container}
      debug={true}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={it => it.id}
      getItemLayout={getItemLayout}
    />
  );
}
