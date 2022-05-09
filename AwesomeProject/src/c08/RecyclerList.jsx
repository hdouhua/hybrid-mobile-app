/**
 * refer to the sampel code of recyclerlistview
 * https://github.com/Flipkart/recyclerlistview/tree/master/docs/guides/samplecode
 */

import React from 'react';
import {Dimensions} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import {Styles} from './Styles';
import {DATA, ITEM_HEIGHT} from './utils/constant';
import ListItem from './components/ListItem';

export default function RecyclerList() {
  let {width} = Dimensions.get('window');

  const dataProvider = new DataProvider((r1, r2) => {
    return r1.id !== r2.id;
  }).cloneWithRows(DATA);

  const layoutProvider = new LayoutProvider(
    () => 'nothing',
    (_, dim) => {
      dim.width = width;
      dim.height = ITEM_HEIGHT;
    },
  );

  const rowRenderer = (_, data) => <ListItem item={data} />;

  return (
    <RecyclerListView
      style={Styles.container}
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
    />
  );
}
