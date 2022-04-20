import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, RefreshControl, View, Text, Pressable} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import {Styles} from './Styles';
import {ViewTypes, ITEM_HEIGHT} from './Constants';
import ListItem from './ListItem';
import Loading from './Loading';

const BATCH_SIZE = 30;
const BaseDataProvider = new DataProvider((r1, r2) => {
  return r1.id !== r2.id;
});

export default function RecyclerList() {
  const dataRef = useRef([]);
  const [loading, setLoading] = useState(true);
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
    return (
      <View style={Styles.footerWrapper}>
        <Pressable style={Styles.footerBtn} onPress={handleRefreshAndLoadMore}>
          <Text style={Styles.footerTxt}>Load More...</Text>
        </Pressable>
      </View>
    );
  };

  const handleRefreshAndLoadMore = async () => {
    if (!loading) {
      console.log('fetching ...');
      await fetchData();
      console.log('finished');
    }
  };
  async function fetchData() {
    //FIXME: setLoading() will cause re-render
    setLoading(true);
    let waitingFor = 500 * Math.floor(((Math.random() * 100) % 10) + 1);
    await new Promise(resolve => {
      setTimeout(() => {
        let count = dataProvider.getSize();
        let newData = new Array(BATCH_SIZE).fill(0).map((_, index) => ({
          title: `Item ${index + count}`,
          id: index + count,
        }));
        dataRef.current = dataRef.current.concat(newData);
        setDataProvider(dataProvider.cloneWithRows(dataRef.current));
        resolve();
      }, waitingFor);
    });
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('render RecyclerListView');

  return (
    <>
      {dataProvider.getSize() > 0 ? (
        <RecyclerListView
          style={Styles.container}
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderFooter={renderFooter}
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={loading}
                onRefresh={handleRefreshAndLoadMore}
              />
            ),
          }}
        />
      ) : null}
      {loading && <Loading />}
    </>
  );
}
