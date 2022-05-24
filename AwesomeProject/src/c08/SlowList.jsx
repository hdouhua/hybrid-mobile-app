import React from 'react';
import {ScrollView} from 'react-native';

import {Styles} from './Styles';
import {DATA} from './utils/constant';
import ListItem from './components/ListItem';

export default function SlowList() {
  // 使用 ScrollView 组件一次性直接渲染 1000 个子视图，这里没有做任何懒加载优化。
  return (
    <ScrollView
      style={Styles.container}
      onScroll={e => {
        console.debug(e.nativeEvent.layoutMeasurement);
      }}
      scrollEventThrottle={100}>
      {DATA.map(it => (
        <ListItem item={it} key={it.id} />
      ))}
    </ScrollView>
  );
}
