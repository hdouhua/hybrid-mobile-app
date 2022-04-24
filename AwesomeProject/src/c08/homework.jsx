import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import {Styles} from './Styles';
import {ViewTypes, ITEM_HEIGHT} from './utils/constant';
import {fetchData} from './utils/util';
import ListItem from './components/ListItem';
import {LoadingIndicator as ListFooter} from './components/ListFooter';
import LoadingLayer from './components/Loading';

// // disalbe debug
// console.debug = () => {};
const BaseDataProvider = new DataProvider((r1, r2) => r1.id !== r2.id);

export default function RecyclerList() {
  const dataRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [dataProvider, setDataProvider] = useState(() => BaseDataProvider);
  let {width} = Dimensions.get('window');

  const layoutProvider = new LayoutProvider(
    index => {
      if (index % 3 === 0) {
        return ViewTypes.FULL;
      } else if (index % 3 === 1) {
        return ViewTypes.HALF_LEFT;
      } else {
        return ViewTypes.HALF_RIGHT;
      }
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.HALF_LEFT:
          dim.width = width / 2;
          dim.height = ITEM_HEIGHT;
          break;
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2;
          dim.height = ITEM_HEIGHT;
          break;
        case ViewTypes.FULL:
          dim.width = width;
          dim.height = 120;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );
  layoutProvider.shouldRefreshWithAnchoring = false; // to prevent list flickering
  const rowRenderer = (type, data) => {
    let style = null;
    switch (type) {
      case ViewTypes.HALF_LEFT:
        style = Styles.itemWrapperLeft;
        break;
      case ViewTypes.HALF_RIGHT:
        style = Styles.itemWrapperRight;
        break;
    }
    return <ListItem item={data} style={style} />;
  };
  const renderFooter = () => {
    console.debug('render footer ...');
    return <ListFooter loading={loading} noMore={noMoreData} />;
    // return <ListFooter onRefetch={handleRefetch} />;
  };

  const handleRefetch = async () => {
    if (!loading) {
      console.debug('fetching ...');
      //FIXME: setLoading() will cause re-render
      setLoading(true);

      let newData = await fetchData(dataProvider.getSize());
      if (newData) {
        dataRef.current = dataRef.current.concat(newData);
        setDataProvider(dp => dp.cloneWithRows(dataRef.current));
      } else {
        setNoMoreData(true);
      }

      setLoading(false);
      console.debug('finished');
    }
  };

  useEffect(() => {
    // ensure it is executed at the first time -- for development mode
    if (dataRef.current.length === 0) {
      handleRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.debug('render RecyclerListView');
  return dataProvider.getSize() > 0 ? (
    <RecyclerListView
      style={Styles.container}
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
      onEndReached={handleRefetch}
      onEndReachedThreshold={30}
      renderFooter={renderFooter}
      scrollViewProps={{
        refreshControl: (
          <RefreshControl
            title="Pull to refresh"
            refreshing={loading}
            onRefresh={handleRefetch}
          />
        ),
      }}
    />
  ) : (
    loading && <LoadingLayer />
  );
}
