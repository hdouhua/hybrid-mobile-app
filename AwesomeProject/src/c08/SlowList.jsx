import React from 'react';
import {ScrollView, Pressable, Text} from 'react-native';

import {Styles} from './Styles';

const NUM_ITEMS = 1000;
const DATA = new Array(NUM_ITEMS).fill(0).map((_, index) => ({
  title: `Item ${index}`,
  id: index,
}));

const Item = ({item}) => {
  return (
    <Pressable
      style={Styles.itemWrapper}
      onLayout={() => {
        console.log('layout:', item.id);
      }}>
      <Text>{item.title}</Text>
    </Pressable>
  );
};

export default function SlowList() {
  // 使用 ScrollView 组件一次性直接渲染 1000 个子视图，这里没有做任何懒加载优化。
  // 优化方案，比如按需渲染
  return (
    <ScrollView
      style={Styles.container}
      onScroll={e => {
        console.log(e.nativeEvent.layoutMeasurement);
      }}
      scrollEventThrottle={100}>
      {DATA.map(it => (
        <Item item={it} key={it.id} />
      ))}
    </ScrollView>
  );
}
