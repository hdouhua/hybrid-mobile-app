import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import {Styles} from './Styles';
import {
  ViewTypes,
  ITEM_HEIGHT,
  FETCH_BATCH_SIZE,
  FETCH_DATA_SIZE,
} from './utils/constant';
import {generateArrayData} from './utils/util';
import {LoadingIndicator as ListFooter} from './components/ListFooter';
import ListItem from './components/ListItem';
import LoadingLayer from './components/Loading';

// // disalbe debug
// console.debug = () => {};
const BaseDataProvider = new DataProvider((r1, r2) => r1.id !== r2.id);

export default function RecyclerList() {
  const dataRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [dataProvider, setDataProvider] = useState(BaseDataProvider);
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
      await fetchData();
      console.debug('finished');
    }
  };
  async function fetchData() {
    //FIXME: setLoading() will cause re-render
    setLoading(true);
    await new Promise(resolve => {
      let waitingFor = 500 * Math.floor(((Math.random() * 100) % 10) + 1);
      setTimeout(() => {
        if (dataProvider.getSize() > FETCH_DATA_SIZE) {
          setNoMoreData(true);
        } else {
          let newData = generateArrayData(
            dataProvider.getSize(),
            FETCH_BATCH_SIZE,
          );
          dataRef.current = dataRef.current.concat(newData);
          setDataProvider(dp => dp.cloneWithRows(dataRef.current));
        }
        resolve();
      }, waitingFor);
    });
    setLoading(false);
  }

  useEffect(() => {
    if (dataRef.current.length === 0) {
      fetchData();
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
