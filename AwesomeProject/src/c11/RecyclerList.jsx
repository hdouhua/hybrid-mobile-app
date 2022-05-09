import React, {useEffect, useRef, useState} from 'react';
import {RefreshControl} from 'react-native';
import {RecyclerListView, DataProvider} from 'recyclerlistview';

import {Styles} from './Styles';
import {fetchDogs} from './utils/dataUtil';
import {getLayoutProvider} from './utils/layoutUtil';
import ListImageItem from './components/ListImageItem';
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

  const layoutProvider = getLayoutProvider();
  const rowRenderer = (type, data) => {
    //return <ListItem item={data} viewType={type} />;
    return <ListImageItem imageUri={data} />;
  };
  const renderFooter = () => {
    console.debug('render footer ...');
    return <ListFooter loading={loading} noMore={noMoreData} />;
  };

  const handleRefetch = async () => {
    if (!loading) {
      console.debug('fetching ...');
      setLoading(true);

      let newData = await fetchDogs(dataProvider.getSize());
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
