import React, {useEffect, useRef, useState} from 'react';
import {RefreshControl} from 'react-native';
import {RecyclerListView, DataProvider} from 'recyclerlistview';

import {Styles} from './Styles';
import {fetchData} from '@shared/utils/dataUtil';
import LoadingLayer from '@shared/components/Loading';
import {getLayoutProvider} from './utils/layoutUtil';
import ListItem from './components/ListItem';
import {LoadingIndicator as ListFooter} from './components/ListFooter';

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
    return <ListItem item={data} viewType={type} />;
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
      if (newData && newData.length > 0) {
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
